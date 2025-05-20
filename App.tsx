import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import 'react-native-reanimated';
// 导入 BottomSheet 组件
import { BottomSheet } from './src/components/common/BottomSheet';
// 导入 Counter 组件
import Counter from './src/components/Counter';

// 创建主屏幕组件
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  // 添加状态来控制 BottomSheet 的显示
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  // 底部弹窗内容
  const bottomSheetContent = (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
        钱包连接选项
      </Text>
      <Button
        title="连接 MetaMask"
        buttonStyle={[styles.button, { marginBottom: 10 }]}
        onPress={() => {
          console.log('连接 MetaMask');
          setShowBottomSheet(false);
        }}
      />
      <Button
        title="连接 WalletConnect"
        buttonStyle={[styles.button, { marginBottom: 10 }]}
        onPress={() => {
          console.log('连接 WalletConnect');
          setShowBottomSheet(false);
        }}
      />
      <Button
        title="取消"
        buttonStyle={[styles.button, { backgroundColor: '#ccc' }]}
        onPress={() => setShowBottomSheet(false)}
      />
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>欢迎使用乔云DApp</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>连接您的钱包开始使用区块链功能</Text>
        <Button
          title="连接钱包"
          buttonStyle={styles.button}
          onPress={() => {
            console.log('连接钱包111');
            setShowBottomSheet(true);
          }}
        />
        <Button
          title="前往详情页 (Tab)"
          buttonStyle={[styles.button, { marginTop: 10 }]}
          onPress={() => {
            console.log('正在导航到详情页...');
            navigation.navigate('MainTabs', { screen: 'DetailsTab' });
          }}
          />
        <Button
          title="打开设置页面 (Stack)"
          buttonStyle={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('SettingsStack')}
        />
        <Button
          title="测试按钮 (Stack)"
          buttonStyle={[styles.button, { marginTop: 10 }]}
          onPress={() => console.log('测试按钮被点击')}
        />
      </Card>

    
      <Card>
        <Card.Title>Redux 计数器示例</Card.Title>
        <Card.Divider />
    
      </Card>

      {/* <BottomSheet
        content={bottomSheetContent}
        hide={!showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        paddingBottomOverride={insets.bottom}
        hideOnBackgroundPress={true}
      /> */}
    </View>
  );
};

// 创建详情页组件
const DetailsScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>详情页面</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>这是一个详情页面示例</Text>
      </Card>
    </View>
  );
};

// 创建设置页面组件
const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>设置页面</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>这是设置页面</Text>
        <Button
          title="前往设置详情"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('SettingsDetail')}
        />
      </Card>
    </View>
  );
};

// 创建设置详情页面组件
const SettingsDetailScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>设置详情</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>这是设置详情页面</Text>
      </Card>
    </View>
  );
};

// 创建导航器实例
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 定义底部选项卡导航组件
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'DetailsTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'WalletTab') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // 返回图标组件
          return (
            <Icon name={iconName} type="ionicon" size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#1E88E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: '首页' }}
      />
      <Tab.Screen
        name="WalletTab"
        component={WalletScreen}
        options={{ title: '钱包' }}
      />
      <Tab.Screen
        name="DetailsTab"
        component={DetailsScreen}
        options={{ title: '详情' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: '我的' }}
      />
    </Tab.Navigator>
  );
}

// 钱包页面组件
const WalletScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>钱包页面</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>管理您的数字资产</Text>
        <Button
          title="查看资产"
          buttonStyle={styles.button}
          onPress={() => console.log('查看资产')}
        />
      </Card>
    </View>
  );
};

// 个人资料页面组件
const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>个人资料</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>管理您的个人信息</Text>
      </Card>
      <Card>
        <Card.Title>Redux 计数器示例</Card.Title>
        <Card.Divider />
        <Counter />
      </Card>
    </View>
  );
};

// 设置堆栈导航
function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: '设置' }}
      />
      <Stack.Screen
        name="SettingsDetail"
        component={SettingsDetailScreen}
        options={{ title: '设置详情' }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{ title: '账户设置' }}
      />
      <Stack.Screen
        name="SecuritySettings"
        component={SecuritySettingsScreen}
        options={{ title: '安全设置' }}
      />
    </Stack.Navigator>
  );
}

// 账户设置页面
const AccountSettingsScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>账户设置</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>管理您的账户信息</Text>
      </Card>
    </View>
  );
};

// 安全设置页面
const SecuritySettingsScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>安全设置</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>管理您的安全选项</Text>
      </Card>
    </View>
  );
};

// 帮助中心导航
function HelpStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{ title: '帮助中心' }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={{ title: '常见问题' }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: '联系我们' }}
      />
    </Stack.Navigator>
  );
}

// 帮助中心页面
const HelpCenterScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>帮助中心</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>获取帮助和支持</Text>
        <Button
          title="常见问题"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('FAQ')}
        />
        <Button
          title="联系我们"
          buttonStyle={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('Contact')}
        />
      </Card>
    </View>
  );
};

// 常见问题页面
const FAQScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>常见问题</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>这里是常见问题解答</Text>
      </Card>
    </View>
  );
};

// 联系我们页面
const ContactScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Card>
        <Card.Title>联系我们</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>联系方式和客服信息</Text>
      </Card>
    </View>
  );
};

// 抽屉导航组件
function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#1E88E5',
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{
          title: '首页',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" type="ionicon" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{
          title: '设置',
          drawerIcon: ({ color, size }) => (
            <Icon name="settings" type="ionicon" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="HelpStack"
        component={HelpStackNavigator}
        options={{
          title: '帮助中心',
          drawerIcon: ({ color, size }) => (
            <Icon name="help-circle" type="ionicon" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// 主应用组件
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppDrawerNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
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
