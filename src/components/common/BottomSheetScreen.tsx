import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@rneui/themed';

const DRAG_THRESHOLD = 200;

// 定义颜色对象
const colors = {
  neutral100: '#000000',
  white: '#FFFFFF',
  neutral95: '#121212',
};

interface BottomSheetScreenProps {
  children: React.ReactNode;
  onClose?: () => void;
  showHandle?: boolean;
  disableClosing?: boolean;
  disableDrag?: boolean;
  customBackgroundColor?: string;
}

export const BottomSheetScreen: React.FC<BottomSheetScreenProps> = ({
  children,
  onClose,
  showHandle = true,
  disableClosing = false,
  disableDrag = false,
  customBackgroundColor,
}) => {
  const {theme} = useTheme();
  console.log('BottomSheetScreen----theme', theme);
  const insets = useSafeAreaInsets();
  const {height: windowHeight} = Dimensions.get('window');
  const translateY = useSharedValue(windowHeight);
  const opacity = useSharedValue(0);
  const scrollEnabled = useRef(false);
  const currScroll = useRef(0);
  const [animating, setAnimating] = useState(false);
  //关闭弹窗
  const close = useCallback(() => {
    if (disableClosing) return;

    setAnimating(true);
    translateY.value = withTiming(windowHeight, {duration: 300});
    opacity.value = withTiming(0, {duration: 300}, () => {
      runOnJS(setAnimating)(false);
      if (onClose) runOnJS(onClose)();
    });
  }, [disableClosing, translateY, opacity, windowHeight, onClose]);
  // 重置打开弹窗
  const resetOpenSheet = useCallback(() => {
    setAnimating(true);
    translateY.value = withTiming(0, {duration: 300});
    opacity.value = withTiming(1, {duration: 300}, () => {
      runOnJS(setAnimating)(false);
    });
  }, [translateY, opacity]);
  // 拖拽关闭弹窗
  const dragGesture = Gesture.Pan()
    .onStart(e => {
      setAnimating(true);
      if (e.velocityY < 0) {
        scrollEnabled.current = true;
      }
    })
    .onUpdate(e => {
      const translation = e.translationY;

      // 只在向下拖动时响应
      if (translation > 0) {
        // 添加阻尼效果，使拖动感觉更自然
        const dampenedTranslation = Math.min(translation * 0.8, windowHeight);
        translateY.value = dampenedTranslation;

        // 计算不透明度，确保不会小于0
        const progress = Math.min(Math.abs(translation / DRAG_THRESHOLD), 5);
        opacity.value = Math.max(1 - progress / 5, 0);
      }
    })
    .onEnd(e => {
      if (e.translationY > DRAG_THRESHOLD) {
        close();
      } else {
        resetOpenSheet();
      }
    })
    .onFinalize(() => {
      scrollEnabled.current = false;
      currScroll.current = 0;
    });
  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));
  useEffect(() => {
    // 打开底部弹窗
    translateY.value = withTiming(0, {duration: 300});
    opacity.value = withTiming(1, {duration: 300});

    return () => {
      // 组件卸载时确保动画值重置，防止内存泄漏
      translateY.value = windowHeight;
      opacity.value = 0;
    };
  }, [translateY, opacity, windowHeight]);
  // 使用 useMemo 优化样式计算
  const containerStyle = useMemo(
    () => [
      styles.container, { paddingTop: insets.top },
      customBackgroundColor ? {backgroundColor: customBackgroundColor} : null,
    ],
    [insets.top, customBackgroundColor],
  );

  const mainViewStyle = useMemo(
    () => [styles.mainView, sheetAnimatedStyle],
    [ sheetAnimatedStyle],
  );
//   const handleStyle = useMemo(() => styles.handle(theme.mode), [theme.mode]);
  return (
    <View
      style={containerStyle}
      accessible={true}
      accessibilityRole="dialog"
      accessibilityLabel="底部弹出窗口">
      <Animated.View style={[styles.background, backgroundAnimatedStyle]} />
      <GestureDetector gesture={disableDrag ? null : dragGesture}>
        <Animated.View style={mainViewStyle}>
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          )}

          {children}
        </Animated.View>
      </GestureDetector>
      {!disableClosing && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="关闭底部窗口">
          <View style={styles.closeIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: colors.neutral100 + 'B3', // 70% opacity
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  //   mainView: theme => ({
  //     backgroundColor: theme === 'light' ? colors.white : colors.neutral95,
  //     borderTopLeftRadius: 20,
  //     borderTopRightRadius: 20,
  //     flex: 1,
  //     overflow: 'hidden',
  //     paddingTop: 20,
  //   }),
  mainView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    overflow: 'hidden',
    paddingTop: 20,
  },
  handleContainer: {
    left: 0,
    right: 0,
    top: 0,
    height: 20,
    zIndex: 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    width: 32,
    height: 4,
    borderRadius: 100,
    backgroundColor: colors.neutral100 + '0D', // 5% opacity
  },
  //   handle: theme => ({
  //     width: 32,
  //     height: 4,
  //     borderRadius: 100,
  //     backgroundColor:
  //       theme === 'light' ? colors.neutral100 + '0D' : colors.white + '1A', // 5% or 10% opacity
  //   }),
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 3,
    padding: 8,
  },
  closeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default BottomSheetScreen;
