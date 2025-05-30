import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, Card, ThemeProvider, Icon } from '@rneui/themed';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { theme } from './src/theme';
//解决RN的crypto模块缺失问题
import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import 'react-native-reanimated';
// 导入 BottomSheet 组件
import { BottomSheet } from './src/components/common/BottomSheet';
// 导入 BottomSheetScreen 组件
import { BottomSheetScreen } from './src/components/common/BottomSheetScreen';
// 导入 Counter 组件
import Counter from './src/components/Counter';
// 导入 SimpleBottomSheet 组件
import SimpleBottomSheet from './src/components/common/SimpleBottomSheet';
// 导入crypto getRandomValues shim(在shims**之前**)
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
// import GradientButton from './src/components/GradientButton';
import { LinearGradient } from 'react-native-linear-gradient';
// 导入 ExampleComponent
import ExampleComponent from './src/components/ExampleComponent';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { TopNav } from './src/components/navigation/TopNav';
import { PageNav } from './src/components/navigation/PageNav';
import { SpeedDial } from '@rneui/themed';

import LoginScreen from './src/views/auth/Login';
import RegisterScreen from './src/views/auth/Register';
// 连接
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
// // 导航到抽屉菜单中的页面
// navigation.navigate('SettingsStack');
// navigation.navigate('HelpStack');

// // 导航到底部标签页
// navigation.navigate('MainTabs', { screen: 'HomeTab' });
// navigation.navigate('MainTabs', { screen: 'WalletTab' });

// // 导航到其他页面（不在底部标签栏显示的页面）
// navigation.navigate('OtherStack', { screen: 'OtherTab' });
// navigation.navigate('OtherStack', { screen: 'OtherTab1' });
// 创建主屏幕组件
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  // 添加状态来控制 BottomSheet 的显示
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  // 添加状态来控制 BottomSheetScreen 的显示
  const [showBottomSheetScreen, setShowBottomSheetScreen] = useState(false);
  // 添加状态来控制 SimpleBottomSheet 的显示
  const [showSimpleBottomSheet, setShowSimpleBottomSheet] = useState(false);
  // 底部弹窗内容
  const bottomSheetContent = (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
        钱包连接选项
        {/* <Icon name='settings-outline' type='ionicons'/> */}
        <Icon name="home" type="material" color="#1b8d74" size={24} />
        <Icon name="sc-telegram" type="evilicons" color="#517fa4" />
        <Icon
          reverse
          name="ios-american-football"
          type="ionicon"
          color="#517fa4"
        />
        <Icon
          raised
          name="heartbeat"
          type="font-awesome"
          color="#f50"
          onPress={() => console.log('hello')}
        />
      </Text>
      <Button
        title="连接 MetaMask"
        buttonStyle={[styles.button, { marginBottom: 10 }]}
        onPress={() => {
          console.log('连接 MetaMask');
          setShowBottomSheet(true);
        }}
      />
      <Button
        title="测试BottomSheet"
        onPress={() => setShowBottomSheet(true)}
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
  const [open, setOpen] = React.useState(false);
  
  const openLeftDrawer = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.openDrawer();
    }
  };

  const openRightDrawer = () => {
    const rootNavigation = navigation.getParent()?.getParent();
    if (rootNavigation) {
      rootNavigation.openDrawer();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <TopNav
        avatarOnPress={() => navigation.navigate('OtherStack', { screen: 'OtherTab' })}
        scanOnPress={() => console.log('Scan pressed')}
        activityCenterOnPress={openRightDrawer}
        avatarProps={{
          name: 'John Doe',
          source: 'https://randomuser.me/api/portraits/men/1.jpg'
        }}
        notificationCount={5}
      />

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
        {/* <Button
          title={<CustomTitle />}
          ViewComponent={LinearGradient}
          titleStyle={{fontWeight: 'bold', fontSize: 18}}
          linearGradientProps={{
            colors: ['#FF9800', '#F44336'],
            start:{x: 0, y: 0},
            end: {x: 1, y: 0},
          }}

          buttonStyle={{
            borderWidth: 0,
            borderColor: 'transparent',
            borderRadius: 20,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          icon={{
            name: 'arrow-right',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
        /> */}
        <LinearGradient
          colors={['#fe7000', '#e43800']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}>
          <Text style={{ color: '#fff' }}>Sign in with Facebook</Text>
        </LinearGradient>

        <Button
          title="示例页面 (Tab)"
          buttonStyle={[styles.button, { marginTop: 10 }]}
          onPress={() => {
            console.log('ExampleScreen...');
            navigation.navigate('DetailsTab');
          }}
        />
        <Button
          title="打开设置页面 (Stack)"
          buttonStyle={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('SettingsStack')}
        />
        {/* <Button
          title="测试按钮 (Stack)"
          buttonStyle={[styles.button, {marginTop: 10}]}
          onPress={() => {
            setShowBottomSheet(true);
          }}
        />
        <Button
          title="测试 BottomSheetScreen"
          buttonStyle={[
            styles.button,
            {marginTop: 10, backgroundColor: '#FF5722'},
          ]}
          onPress={() => {
            console.log('测试 BottomSheetScreen');
            setShowBottomSheetScreen(true);
          }}
        />
        <Button
          title="测试 SimpleBottomSheet"
          buttonStyle={[
            styles.button,
            {marginTop: 10, backgroundColor: '#4CAF50'},
          ]}
          onPress={() => {
            console.log('测试 SimpleBottomSheet');
            setShowSimpleBottomSheet(true);
          }}
        /> */}
        <Button
          title="测试以太坊钱包"
          buttonStyle={[
            styles.button,
            { marginTop: 10, backgroundColor: '#9C27B0' },
          ]}
          onPress={() => {
            // 导航到钱包页面或显示钱包组件
            navigation.navigate('WalletTab');
          }}
        />
      </Card>
      {showBottomSheet && (
        <BottomSheet
          content={bottomSheetContent}
          hide={!showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          paddingBottomOverride={insets.bottom}
          hideOnBackgroundPress={true}
        />
      )}

      {showBottomSheetScreen && (
        <BottomSheetScreen
          onClose={() => setShowBottomSheetScreen(false)}
          showHandle={true}
          disableClosing={false}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
              BottomSheetScreen 测试
            </Text>
            <Text style={{ marginBottom: 20 }}>
              这是一个全屏底部弹窗组件，支持拖拽关闭
            </Text>
            <Button
              title="关闭"
              buttonStyle={{ backgroundColor: '#F44336', marginTop: 20 }}
              onPress={() => setShowBottomSheetScreen(false)}
            />
          </View>
        </BottomSheetScreen>
      )}

      {showSimpleBottomSheet && (
        <SimpleBottomSheet
          onClose={() => setShowSimpleBottomSheet(false)}
          showHandle={true}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
              SimpleBottomSheet 测试
            </Text>
            <Text style={{ marginBottom: 20 }}>
              这是一个简化版的底部弹窗组件，支持拖拽关闭
            </Text>
            <Button
              title="关闭"
              buttonStyle={{ backgroundColor: '#4CAF50', marginTop: 20 }}
              onPress={() => setShowSimpleBottomSheet(false)}
            />
          </View>
        </SimpleBottomSheet>
      )}
      <SpeedDial
        isOpen={open}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add"
          onPress={() => console.log('Add Something')}
        />
        <SpeedDial.Action
          icon={{ name: 'delete', color: '#fff' }}
          title="Delete"
          onPress={() => console.log('Delete Something')}
        />
      </SpeedDial>
    </View>
  );
};
const CustomTitle = () => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>John Doe</Text>
      <Text style={{ fontStyle: 'italic', fontSize: 12 }}>Minister of Magic</Text>
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

// 创建示例组件屏幕
const ExampleScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      <PageNav
        type="title"
        title="示例页面"
        iconName="chevron-back-outline"
        onPress={() => navigation.goBack()}
        rightSide={[
          {
            iconName: "ellipsis-vertical-outline",
            onPress: () => console.log('More options pressed'),
          }
        ]}
      />
      <View style={[styles.content, { paddingTop: 16 }]}>
        <ExampleComponent />
      </View>
    </View>
  );
};

// 自定义底部导航栏组件
const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        // 如果设置了 tabBarButton 为 null，则不显示该标签
        if (options.tabBarButton === null) {
          return null;
        }

        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}>
            <View style={styles.tabContent}>
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? '#fe7000' : '#666666',
                size: 24
              })}
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.activeLabel : styles.inactiveLabel,
                ]}>
                {String(label)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// 其他页面组件

const OtherScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={[styles.container]}>
      <PageNav
        type="title"
        title="其他页面"
        iconName="chevron-back-outline"
        onPress={() => navigation.goBack()}
        rightSide={[
          {
            iconName: "ellipsis-vertical-outline",
            onPress: () => console.log('More options pressed'),
          }
        ]}
      />
      <View style={[styles.content, { paddingTop: 16 }]}>
        <ExampleComponent />
        
      </View>
    </View>
  );
};
// 交易页面组件
const TradeScreen = () => { 

  return (
    <View  style={[styles.container,{flex:1}]}>
        <LinearGradient
        colors={[ '#0d0d0d','#712e09',]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{height:300}}>
        <Text style={{ color: '#fff' }}>Sign in with Facebook</Text>
        </LinearGradient>
    </View>
  )

}

// 钱包页面组件
const WalletScreen = () => {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const connectWallet = async () => {
    try {
      const provider = new ethers.JsonRpcProvider('HTTP://127.0.0.1:7545');
      console.log('provider', provider);
      const signer = await provider.getSigner();
      console.log('signer', signer);
      const blockNumber = await provider.getBlockNumber();
      console.log('blockNumber', blockNumber);
      const walletAddress = await signer.getAddress();
      console.log('walletAddress', walletAddress);
      setAddress(walletAddress);
      setBalance(ethers.formatEther(await provider.getBalance(walletAddress)));
    } catch (error) {
      console.error('连接钱包错误:', error);
    }
  };
  // const publicClient = createPublicClient({
  //   chain: sepolia,
  //   transport: http(),
  // });
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
        <Button onPress={connectWallet} title="连接钱包" />
        <Text>地址: {address}</Text>
        <Text>余额: {balance} ETH</Text>
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

const OtherScreen1 = () => {
  return <View>
    <Text>其他页面1</Text>
  </View>
}

const OtherScreen2 = () => {  
  return <View>
    <Text>其他页面2</Text>
  </View>
}

const apiRoutes = [
  {
    name: 'OtherTab1',
    component: OtherScreen1,
    title: '其他1',
    showInTab: false
  },
  { 
    name: 'OtherTab2',
    component: OtherScreen2,
    title: '其他2',
    showInTab: false
  }
]

// 定义底部选项卡导航组件
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#ffffff' },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ 
          title: '首页',
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              type="ionicon"
              size={24}
              color={focused ? '#fe7000' : '#666666'}
            />
          )
        }}
      />
      <Tab.Screen
        name="MarketTab"
        component={WalletScreen}
        options={{ 
          title: '市场',
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'podium' : 'podium-outline'}
              type="ionicon"
              size={24}
              color={focused ? '#fe7000' : '#666666'}
            />
          )
        }}
      />
      <Tab.Screen
        name="TradeTab"
        component={TradeScreen}
        options={{ 
          title: '交易',
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'repeat' : 'repeat-outline'}
              type="ionicon"
              size={24}
              color={focused ? '#fe7000' : '#666666'}
            />
          )
        }}
      />
      <Tab.Screen
        name="DiscoverTab"
        component={ExampleScreen}
        options={{ 
          title: '发现',
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'grid' : 'grid-outline'}
              type="ionicon"
              size={24}
              color={focused ? '#fe7000' : '#666666'}
            />
          )
        }}
      />
      <Tab.Screen
        name="AssetsTab"
        component={ProfileScreen}
        options={{ 
          title: '资产',
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              type="ionicon"
              size={24}
              color={focused ? '#fe7000' : '#666666'}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

// 创建其他页面的堆栈导航
function OtherStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OtherTab" component={OtherScreen} />
      {apiRoutes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{ title: route.title }}
        />
      ))}
    </Stack.Navigator>
  );
}

// 左侧抽屉导航组件
function LeftDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerActiveTintColor: '#1E88E5',
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {
          marginLeft: -20,
        },
        headerShown: false,
        drawerType: 'front'
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
    </Drawer.Navigator>
  );
}

// 右侧抽屉导航组件
function RightDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerActiveTintColor: '#fe7000',
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {
          marginLeft: -20,
        },
        headerShown: false,
        drawerType: 'front'
      }}>
      <Drawer.Screen
        name="LeftDrawer"
        component={LeftDrawerNavigator}
        options={{
          drawerItemStyle: { display: 'none' }
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
      <Drawer.Screen
        name="NotificationStack"
        component={NotificationScreen}
        options={{
          title: '消息中心',
          drawerIcon: ({ color, size }) => (
            <Icon name="notifications" type="ionicon" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// 消息中心页面
const NotificationScreen = () => {
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
        <Card.Title>消息中心</Card.Title>
        <Card.Divider />
        <Text style={styles.paragraph}>这里是您的消息通知</Text>
      </Card>
    </View>
  );
};

// 主应用导航
function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}

// 认证导航
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// 主要导航（包含抽屉导航）
function MainNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#1E88E5',
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {
          marginLeft: -20,
        },
        headerShown: false,
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
    </Drawer.Navigator>
  );
}

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
          buttonStyle={[styles.button, { marginBottom: 10 }]}
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

// 主应用组件
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 8,
    height: 40,
    width: 'auto',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 80,
    paddingBottom: 20,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  activeLabel: {
    color: '#fe7000',
  },
  inactiveLabel: {
    color: '#666666',
  },
  button: {
    backgroundColor: '#1b8d74',
    borderRadius: 8,
    padding: 12,
  },
});

export default App;
