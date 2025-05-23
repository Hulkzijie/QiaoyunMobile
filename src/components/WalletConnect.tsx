import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Card } from '@rneui/themed';
import { walletUtils } from '../utils/wallet';

const WalletConnect = () => {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  // 初始化提供者
  useEffect(() => {
    walletUtils.initProvider();
  }, []);
  
  // 创建随机钱包
  const createWallet = async () => {
    try {
      const wallet = walletUtils.createRandomWallet();
      if (wallet) {
        setAddress(wallet.address);
        setIsConnected(true);
        
        // 获取余额
        const bal = await walletUtils.getBalance();
        setBalance(bal);
      }
    } catch (error) {
      Alert.alert('错误', '创建钱包失败');
    }
  };
  
  // 导入钱包
  const importWallet = (privateKey: string) => {
    try {
      const wallet = walletUtils.importWalletByPrivateKey(privateKey);
      if (wallet) {
        setAddress(wallet.address);
        setIsConnected(true);
        
        // 获取余额
        walletUtils.getBalance().then(bal => {
          setBalance(bal);
        });
      }
    } catch (error) {
      Alert.alert('错误', '导入钱包失败');
    }
  };
  
  // 断开连接
  const disconnect = () => {
    setAddress('');
    setBalance('0');
    setIsConnected(false);
  };
  
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>以太坊钱包</Card.Title>
        <Card.Divider />
        
        {isConnected ? (
          <>
            <Text style={styles.addressText}>地址: {address}</Text>
            <Text style={styles.balanceText}>余额: {balance} ETH</Text>
            <Button
              title="断开连接"
              buttonStyle={[styles.button, {backgroundColor: '#F44336'}]}
              onPress={disconnect}
            />
          </>
        ) : (
          <>
            <Text style={styles.infoText}>连接您的以太坊钱包</Text>
            <Button
              title="创建新钱包"
              buttonStyle={styles.button}
              onPress={createWallet}
            />
            <Button
              title="导入私钥"
              buttonStyle={[styles.button, {marginTop: 10}]}
              onPress={() => {
                // 这里应该弹出一个输入框让用户输入私钥
                // 简化示例，使用一个测试私钥
                const testPrivateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
                importWallet(testPrivateKey);
              }}
            />
          </>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addressText: {
    fontSize: 14,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2089dc',
    borderRadius: 6,
    marginTop: 15,
  },
});

export default WalletConnect;