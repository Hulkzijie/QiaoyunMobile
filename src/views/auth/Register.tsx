import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>注册</Text>
        <Input
          placeholder="请输入用户名"
          leftIcon={{ type: 'ionicon', name: 'person-outline' }}
          containerStyle={styles.inputContainer}
        />
        <Input
          placeholder="请输入密码"
          leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
          secureTextEntry
          containerStyle={styles.inputContainer}
        />
        <Input
          placeholder="请确认密码"
          leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
          secureTextEntry
          containerStyle={styles.inputContainer}
        />
        <Button
          title="注册"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
        <Button
          title="返回登录"
          type="clear"
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginHorizontal: 50,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#1b8d74',
    borderRadius: 8,
    padding: 12,
  },
});

export default RegisterScreen; 