import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

// 定义组件属性接口
interface SimpleBottomSheetProps {
  // 底部弹窗的内容
  children: React.ReactNode;
  // 关闭弹窗的回调函数
  onClose?: () => void;
  // 是否显示顶部拖动条
  showHandle?: boolean;
  // 背景颜色
  backgroundColor?: string;
}

// 动画持续时间
const ANIMATION_DURATION = 300;
// 拖动阈值，超过此值将关闭弹窗
const DRAG_THRESHOLD = 200;

export const SimpleBottomSheet: React.FC<SimpleBottomSheetProps> = ({
  children,
  onClose,
  showHandle = true,
  backgroundColor = '#FFFFFF',
}) => {
  // 获取屏幕高度
  const {height: screenHeight} = Dimensions.get('window');
  
  // 创建共享值用于动画
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  
  // 打开底部弹窗
  useEffect(() => {
    // 显示动画
    translateY.value = withTiming(0, {
      duration: ANIMATION_DURATION,
    });
    opacity.value = withTiming(0.5, {
      duration: ANIMATION_DURATION,
    });
    
    return () => {
      // 组件卸载时重置动画值
      translateY.value = screenHeight;
      opacity.value = 0;
    };
  }, [translateY, opacity, screenHeight]);
  
  // 关闭弹窗
  const close = () => {
    translateY.value = withTiming(screenHeight, {
      duration: ANIMATION_DURATION,
    });
    opacity.value = withTiming(0, {
      duration: ANIMATION_DURATION,
    });
    
    // 动画结束后调用关闭回调
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, ANIMATION_DURATION);
  };
  
  // 拖拽手势
  const dragGesture = Gesture.Pan()
    .onUpdate((event) => {
      // 只处理向下拖动
      if (event.translationY > 0) {
        translateY.value = event.translationY;
        
        // 根据拖动距离计算背景透明度
        const progress = Math.min(event.translationY / DRAG_THRESHOLD, 1);
        opacity.value = 0.5 * (1 - progress);
      }
    })
    .onEnd((event) => {
      if (event.translationY > DRAG_THRESHOLD) {
        // 如果拖动距离超过阈值，关闭弹窗
        close();
      } else {
        // 否则恢复原位
        translateY.value = withTiming(0, {
          duration: ANIMATION_DURATION,
        });
        opacity.value = withTiming(0.5, {
          duration: ANIMATION_DURATION,
        });
      }
    });
  
  // 背景动画样式
  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  
  // 底部弹窗动画样式
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));
  
  return (
    <View style={styles.container}>
      {/* 背景遮罩 */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={close}
      >
        <Animated.View style={[styles.backdrop, backgroundAnimatedStyle]} />
      </TouchableOpacity>
      
      {/* 底部弹窗 */}
      <GestureDetector gesture={dragGesture}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {backgroundColor},
            sheetAnimatedStyle,
          ]}
        >
          {/* 拖动条 */}
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          )}
          
          {/* 关闭按钮 */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={close}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          {/* 内容区域 */}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handleContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#DDDDDD',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 16,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666666',
  },
  content: {
    marginTop: 10,
  },
});

export default SimpleBottomSheet;