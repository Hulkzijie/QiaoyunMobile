import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
/**
 * 隐藏键盘函数
 * 可以直接调用此函数来隐藏当前显示的键盘
 */
export const dismissKeyboard = () => {
  Keyboard.dismiss();
};

/**
 * 键盘消失视图组件
 * 用于包裹需要在点击空白区域时隐藏键盘的内容
 * @param props.children - 子组件
 * @param props.style - 应用于视图的样式
 */
export const DismissKeyboardView: React.FC<{
  children: React.ReactNode;
  style?: any;
}> = ({ children, style }) => {
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

/**
 * 键盘监听钩子
 * 用于监听键盘显示和隐藏事件
 * @param onShow - 键盘显示时的回调函数
 * @param onHide - 键盘隐藏时的回调函数
 */
export const useKeyboardListener = (
  onShow?: (keyboardHeight: number) => void,
  onHide?: () => void
) => {
  React.useEffect(() => {
    // 监听键盘显示事件
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        // 获取键盘高度
        const keyboardHeight = event.endCoordinates.height;
        if (onShow) {
          onShow(keyboardHeight);
        }
      }
    );

    // 监听键盘隐藏事件
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (onHide) {
          onHide();
        }
      }
    );

    // 组件卸载时移除监听器
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [onShow, onHide]);
};

export default {
  dismissKeyboard,
  DismissKeyboardView,
  useKeyboardListener,
};