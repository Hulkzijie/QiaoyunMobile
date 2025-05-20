import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useTheme as useRNETheme} from '@rneui/themed';
// 移除不存在的导入
// import { colors } from '../../quo/foundations/colors';
// import { dismissKeyboard } from '../../utils/re-frame';

const DURATION = 450;
const TIMING_OPTIONS = {duration: DURATION};
const BOTTOM_MARGIN = 8;

interface BottomSheetProps {
  content: React.ReactNode;
  selectedItem?: any;
  paddingBottomOverride?: number;
  borderRadius?: number;
  onClose?: () => void;
  shell?: boolean;
  gradientCover?: boolean;
  customizationColor?: string;
  hideHandle?: boolean;
  blurRadius?: number;
  hideOnBackgroundPress?: boolean;
  dragContent?: boolean;
  hide?: boolean;
  insets?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  content,
  selectedItem,
  paddingBottomOverride,
  borderRadius = 12,
  onClose,
  shell = false,
  gradientCover = false,
  customizationColor,
  hideHandle = false,
  blurRadius,
  hideOnBackgroundPress = true,
  dragContent = true,
  hide = false,
  insets
}) => {
  const { theme } = useRNETheme();
  const isDarkMode = theme.mode === 'dark';
  const { height: windowHeight } = Dimensions.get('window');
  const [sheetHeight, setSheetHeight] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(windowHeight);
  const translateY = useSharedValue(windowHeight);
  const bgOpacity = useSharedValue(0);
  const gestureValues = useRef({ panY: 0, pdy: 0, dy: 0 }).current;

  const handleSheetHeight = useCallback(e => {
    const height = e.nativeEvent.layout.height;
    setSheetHeight(height);
  }, []);

  const handleLayoutHeight = useCallback(e => {
    const height = e.nativeEvent.layout.height;
    setLayoutHeight(height);
  }, []);

  // 将 hide 函数重命名为 hideSheet
  const hideSheet = useCallback(() => {
   //  dismissKeyboard();
    if (onClose) {
      onClose();
    }
    // 使用timeout模拟动画回调，增加50ms作为安全边际
    setTimeout(() => {
      // 这里应该dispatch一个事件，但在React中我们可以使用回调或状态管理
    }, DURATION + 50);
    
    translateY.value = withTiming(windowHeight, TIMING_OPTIONS);
    bgOpacity.value = withTiming(0, TIMING_OPTIONS);
  }, [translateY, bgOpacity, windowHeight, onClose]);

  const show = useCallback(() => {
    translateY.value = withTiming(0, TIMING_OPTIONS);
    bgOpacity.value = withTiming(1, TIMING_OPTIONS);
  }, [translateY, bgOpacity]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      gestureValues.panY = translateY.value;
    })
    .onUpdate((e) => {
      const tY = e.translationY;
      gestureValues.dy = tY - gestureValues.pdy;
      gestureValues.pdy = tY;
      
      if (tY > 0) {
        translateY.value = tY + gestureValues.panY;
      }
    })
    .onEnd(() => {
      if (gestureValues.dy < 0) {
        show();
      } else {
        hideSheet(); // 使用重命名后的函数
      }
    });

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  useEffect(() => {
    if (hide) {
      translateY.value = windowHeight;
      bgOpacity.value = 0;
    } else {
      show();
    }
  }, [hide, show, translateY, bgOpacity, windowHeight]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={hideOnBackgroundPress ? hideSheet : undefined} // 使用重命名后的函数
      >
        <Animated.View
          style={[styles.background(theme), backgroundAnimatedStyle]}
        />
      </TouchableOpacity>

      <Animated.View
        style={[styles.sheetContainer(theme, borderRadius), sheetAnimatedStyle]}
        onLayout={handleLayoutHeight}>
        {!hideHandle && (
          <View style={styles.handleContainer}>
            <View style={styles.handle(theme)} />
          </View>
        )}

        <GestureDetector gesture={dragContent ? panGesture : null}>
          <View
            style={styles.contentContainer(
              paddingBottomOverride,
              insets?.bottom,
            )}
            onLayout={handleSheetHeight}>
            {content}
          </View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  background: theme => ({
    backgroundColor: theme.colors.black + 'B3', // 70% opacity
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
  sheetContainer: (theme, borderRadius) => ({
    backgroundColor:
      theme.mode === 'dark' ? theme.colors.grey5 : theme.colors.white,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    overflow: 'hidden',
    maxHeight: '90%',
  }),
  handleContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: theme => ({
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor:
      theme.mode === 'dark'
        ? theme.colors.white + '1A' // 10% opacity
        : theme.colors.black + '0D', // 5% opacity
  }),
  contentContainer: (paddingBottomOverride, bottomInset) => ({
    paddingBottom: paddingBottomOverride || (bottomInset || 0) + BOTTOM_MARGIN,
  }),
});

export default BottomSheet;
