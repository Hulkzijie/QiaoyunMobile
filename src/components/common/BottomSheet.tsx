import React, {useEffect,useCallback,useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  SharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {dismissKeyboard} from '../../utils/keyboard';


interface GestureValues {
  panY: number;
  pdy: number;
  dy: number;
}
// 定义组件属性接口
interface BottomSheetProps {
  // 底部弹窗的内容
  content: React.ReactNode;
  // 控制弹窗是否隐藏
  hide: boolean;
  // 关闭弹窗的回调函数
  onClose?: () => void;
  // 底部内边距的覆盖值
  paddingBottomOverride?: number;
  // 点击背景是否自动关闭弹窗
  hideOnBackgroundPress?: boolean;
  //
  shell?: boolean;
  dragContent?: boolean;
}
// 动画持续时间
const ANIMATION_DURATION = 450;
const TIMING_OPTIONS = { duration: ANIMATION_DURATION };
const hide = (
  translateY: SharedValue<number>,
  bgOpacity: SharedValue<number>,
  windowHeight: number,
  onClose?: () => void
) => {
  dismissKeyboard();
  
  if (typeof onClose === 'function') {
    onClose();
  }
  
  // 使用setTimeout代替动画回调，因为动画回调可能不工作
  setTimeout(() => {
    hideBottomSheet();
  }, ANIMATION_DURATION + 50); 
  
  translateY.value = withTiming(windowHeight, TIMING_OPTIONS);
  bgOpacity.value = withTiming(0, TIMING_OPTIONS);
};

const show = (
  translateY: SharedValue<number>,
  bgOpacity: SharedValue<number>
) => {
  translateY.value = withTiming(0, TIMING_OPTIONS);
  bgOpacity.value = withTiming(1, TIMING_OPTIONS);
};
export const BottomSheet: React.FC<BottomSheetProps> = ({
  content,
  hide,
  onClose,
  paddingBottomOverride = 0,
  hideOnBackgroundPress = true,
  dragContent = true,
}) => {

  // 获取屏幕宽度
  const {height: windowHeight} = useWindowDimensions();
    // 创建共享值用于动画
  const translateY = useSharedValue(windowHeight);
  const opacity = useSharedValue(0);
  console.log('windowHeight', windowHeight);
  const gestureValues = useRef<GestureValues>({
    panY: 0,
    pdy: 0,
    dy: 0
  });
  
  const sheetGesture = useCallback(() => {
    return Gesture.Pan()
      .onStart(() => {
        gestureValues.current.panY = translateY.value;
      })
      .onUpdate((event) => {
        console.log('event', event);
        const tY = event.translationY;
        gestureValues.current.dy = tY - gestureValues.current.pdy;
        gestureValues.current.pdy = tY;
        
        if (tY > 0) {
          // translateY.value = tY + gestureValues.current.panY;
        }
      })
      .onEnd(() => {
        if (gestureValues.current.dy < 0) {
          // show(translateY, opacity);
        } else {
          // hide(translateY, opacity, windowHeight, onClose);
        }
      });
  }, [windowHeight, onClose, translateY, opacity]);
  const gesture = React.useMemo(() => sheetGesture(), [sheetGesture]);

  // 监听 hide 属性变化，控制显示和隐藏
  useEffect(() => {
    if (hide) {
      // 隐藏动画
      translateY.value = withTiming(windowHeight, {
        duration: ANIMATION_DURATION,
      });
      opacity.value = withTiming(0, {
        duration: ANIMATION_DURATION,
      });
    } else {
      // 显示动画
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
      });
      opacity.value = withTiming(0.5, {
        duration: ANIMATION_DURATION,
      });
    }
  }, [hide, translateY, opacity, windowHeight]);

  // 创建背景动画样式
  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // 创建底部弹窗动画样式
  const bottomSheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  // 处理背景点击事件
  const handleBackgroundPress = () => {
    if (hideOnBackgroundPress && onClose) {
      onClose();
    }
  };

  // 如果 hide 为 true 且动画已完成，不渲染任何内容
  if (hide && translateY.value === windowHeight) {
    return null;
  } 


  return (
    <View style={styles.container}>
      {/* 背景遮罩 */}
      <Pressable
        onPress={() => hideOnBackgroundPress && handleBackgroundPress()}
        style={{flex: 1}}>
        <Animated.View style={[styles.background, backgroundAnimatedStyle]} />
      </Pressable>
      {/* 底部弹窗内容 */}
      {dragContent ? (
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              styles.bottomSheet,
              bottomSheetAnimatedStyle,
              {paddingBottom: paddingBottomOverride},
            ]}>
            {/* 顶部拖动条 */}
            <View style={styles.dragHandle} />

            {/* 内容区域 */}
            <View style={styles.content}>{content}</View>
          </Animated.View>
        </GestureDetector>
      ) : (
        <Animated.View
          style={[
            styles.bottomSheet,
            bottomSheetAnimatedStyle,
            {paddingBottom: paddingBottomOverride},
          ]}>
          {/* 顶部拖动条 */}
          <View style={styles.dragHandle} />

          {/* 内容区域 */}
          <View style={styles.content}>{content}</View>
        </Animated.View>
      )}
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  content: {
    padding: 16,
  },
});

export default BottomSheet;
