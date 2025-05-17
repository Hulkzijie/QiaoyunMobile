import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, ThemeProvider } from '@rneui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 创建主屏幕组件
const HomeScreen = ({ navigation }: { navigation: any }) => {
  // 主屏幕内容
  console.log('-navigation-',navigation);
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>欢迎使用乔云DApp</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>
          连接您的钱包开始使用区块链功能
        </Text>
        <Button
          title="连接钱包"
          buttonStyle={styles.button}
          onPress={() => console.log('连接钱包')}
        />
        <Button
          title="前往详情页"
          buttonStyle={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('Details')}
        />
      </Card>
    </View>
  );
};

// 创建详情页组件
const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>详情页面</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>
          这是一个详情页面示例
        </Text>
      </Card>
    </View>
  );
};

// 创建导航堆栈
const Stack = createNativeStackNavigator();

// 主应用组件
const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: '乔云DApp' }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{ title: '详情' }}
          />
        </Stack.Navigator>
         <Text>1111</Text>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2089dc',
    borderRadius: 6,
    marginTop: 15,
  },
});

export default App;