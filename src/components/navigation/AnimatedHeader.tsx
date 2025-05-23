import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  Button,
  Text,
  Card,
  ThemeProvider,
  Icon,
  createTheme,
} from '@rneui/themed';
interface AnimatedHeaderProps {
  title: string;
  scrollY: Animated.SharedValue<number>;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  threshold?: number;
}
const colors = {
  white: '#ffffff',
  black: '#000000',
};
export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  title,
  scrollY,
  onBackPress,
  rightContent,
  threshold = 50,
}) => {
  const Colors = {
    primary: '#007AFF',
  };
  const theme = createTheme({
    lightColors: Colors,
    darkColors: Colors,
    mode: 'light' | 'dark',
    components: {
      componentName: (props, theme) => ({
        // Props
      }),
    },
  });
  const headerStyle = useAnimatedStyle(() => {
    const opacity = scrollY.value > threshold ? 1 : 0;
    return {
      opacity: withTiming(opacity, { duration: 200 }),
    };
  });

  return (
    <Animated.View style={[styles.container, headerStyle]}>
      <View style={styles.content}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon
              name="arrow-left"
              size={20}
              color={theme.mode === 'dark' ? colors.white : colors.black}
            />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.title,
            { color: theme.mode === 'dark' ? colors.white : colors.black },
          ]}
        >
          {title}
        </Text>

        {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});