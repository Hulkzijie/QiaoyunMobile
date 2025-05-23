import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';


import { Avatar } from '../Avatar';
import { colors } from '../../theme/colors';
import {
  Button,
  Text,
  Card,
  ThemeProvider,
  Icon,
  createTheme,
} from '@rneui/themed';
interface TopNavProps {
  avatarOnPress?: () => void;
  scanOnPress?: () => void;
  activityCenterOnPress?: () => void;
  rightSectionContent?: React.ReactNode;
  blur?: boolean;
  customizationColor?: string;
  avatarProps?: {
    image?: string;
    name?: string;
  };
  notificationCount?: number;
  notification?: 'mention' | 'seen' | 'notification';
  containerStyle?: any;
}

export const TopNav: React.FC<TopNavProps> = ({
  avatarOnPress,
  scanOnPress,
  activityCenterOnPress,
  rightSectionContent,
  blur = false,
  customizationColor,
  avatarProps,
  notificationCount,
  notification,
  containerStyle,
}) => {
  const theme = createTheme();

  return (
    <View style={[styles.container, blur && styles.blurContainer, containerStyle]}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={avatarOnPress} style={styles.avatarButton}>
          <Avatar {...avatarProps} size={32} />
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        {scanOnPress && (
          <TouchableOpacity onPress={scanOnPress} style={styles.iconButton}>
            <Icon name="scan" size={24} color={theme.mode === 'dark' ? colors.white : colors.black} />
          </TouchableOpacity>
        )}

        {activityCenterOnPress && (
          <TouchableOpacity onPress={activityCenterOnPress} style={styles.iconButton}>
            <Icon
              name="notification"
              size={24}
              color={theme.mode === 'dark' ? colors.white : colors.black}
            />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {rightSectionContent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 16,
  },
  blurContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarButton: {
    padding: 4,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.red,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});