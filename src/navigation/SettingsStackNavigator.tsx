import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

// 临时的设置页面组件
const SettingsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text h4>设置</Text>
    </View>
  );
};

export const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
}); 