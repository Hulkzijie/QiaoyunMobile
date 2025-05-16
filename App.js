import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, Text, Card, ThemeProvider } from '@rneui/themed';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
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
        </Card>
      </SafeAreaView>
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