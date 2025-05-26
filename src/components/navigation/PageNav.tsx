import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {
  Button,
  Text,
  Card,
  ThemeProvider,
  Icon,
  useTheme,
} from '@rneui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageNavProps {
  type?: 'title' | 'no-title' | 'dropdown';
  title?: string;
  textAlign?: 'flex-start' | 'center';
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
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const getBackgroundStyle = () => {
    if (blur) {
      return styles.blurBackground;
    }
    return {
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey5 : theme.colors.white,
    };
  };

  return (
    <View style={[styles.container, getBackgroundStyle(), { paddingTop: insets.top }]}>
      {iconName && (
        <TouchableOpacity
          onPress={onPress}
          accessibilityLabel={accessibilityLabel}
          style={styles.leftButton}
        >
          <Icon
            name={iconName}
            size={20}
            color={theme.mode === 'dark' ? theme.colors.white : theme.colors.black}
          />
        </TouchableOpacity>
      )}

      {type === 'title' && title && (
        <View style={[styles.titleContainer, { alignItems: textAlign }]}>
          <Text
            style={[
              styles.title,
              { opacity: centerOpacity ?? 1 },
              { color: theme.mode === 'dark' ? theme.colors.white : theme.colors.black },
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
                color={theme.mode === 'dark' ? theme.colors.white : theme.colors.black}
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
    minHeight: 44,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  blurBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  leftButton: {
    padding: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    minWidth: 44,
    alignItems: 'center',
  },
});