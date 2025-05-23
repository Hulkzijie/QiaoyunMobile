import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import {
    Button,
    Text,
    Card,
    ThemeProvider,
    Icon,
    createTheme,
  } from '@rneui/themed';

interface PageNavProps {
  type?: 'title' | 'no-title' | 'dropdown';
  title?: string;
  textAlign?: 'left' | 'center';
  iconName?: string;
  background?: 'blur' | 'photo' | 'white';
  rightSide?: Array<{
    iconName: string;
    onPress: () => void;
    accessibilityLabel?: string;
  }>;
  onPress?: () => void;
  accessibilityLabel?: string;
  centerOpacity?: number;
  blur?: boolean;
}

export const PageNav: React.FC<PageNavProps> = ({
  type = 'no-title',
  title,
  textAlign = 'center',
  iconName,
  background = 'white',
  rightSide,
  onPress,
  accessibilityLabel,
  centerOpacity,
  blur = false,
}) => {
  const theme = createTheme();
  const colors = {
    white: '#ffffff',
    black: '#000000',
    neutral100: '#F4F4F4',
    neutral200: '#E5E5E5',
    neutral300: '#D4D4D4',
    neutral400: '#A2A2A2',
    neutral500: '#737373',
    neutral600: '#525252',
    neutral700: '#404040',
    neutral800: '#262626',
    neutral900: '#171717',
    primary100: '#D1E9FF',
    primary200: '#A5D8FF',
    primary300: '#74C0FC',
    primary400: '#53B1FD',
    primary500: '#0091FF',
    primary600: '#007AFF',
  }
  const getBackgroundStyle = () => {
    if (blur) {
      return styles.blurBackground;
    }
    return {
      backgroundColor: theme.mode === 'dark' ? colors.neutral100 : colors.white,
    };
  };

  return (
    <View style={[styles.container, getBackgroundStyle()]}>
      {iconName && (
        <TouchableOpacity
          onPress={onPress}
          accessibilityLabel={accessibilityLabel}
          style={styles.leftButton}
        >
          <Icon name={iconName} size={20} color={theme.mode === 'dark' ? colors.white : colors.black} />
        </TouchableOpacity>
      )}

      {type === 'title' && title && (
        <View style={[styles.titleContainer, { alignItems:'center' }]}>
          <Text
            style={[
              styles.title,
              { opacity: centerOpacity ?? 1 },
              { color: theme.mode === 'dark' ? colors.white : colors.black },
            ]}
          >
            {title}
          </Text>
        </View>
      )}

      {rightSide && (
        <View style={styles.rightContainer}>
          {rightSide.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              accessibilityLabel={item.accessibilityLabel}
              style={styles.rightButton}
            >
              <Icon
                name={item.iconName}
                size={20}
                color={theme.mode === 'dark' ? colors.white : colors.black}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
  },
  blurBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  leftButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButton: {
    padding: 8,
    marginLeft: 8,
  },
});