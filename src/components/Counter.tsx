import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { increment, decrement, incrementByAmount } from '../redux/slices/counterSlice';

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>计数: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="增加"
          onPress={() => dispatch(increment())}
          buttonStyle={styles.button}
        />
        <Button
          title="减少"
          onPress={() => dispatch(decrement())}
          buttonStyle={[styles.button, { backgroundColor: '#ff6b6b' }]}
        />
        <Button
          title="增加 10"
          onPress={() => {
            // 来一个大的！增加10点能量值
            dispatch(incrementByAmount(10));
            console.log('哇！数字蹭蹭往上涨！');
          }}
          buttonStyle={[styles.button, { backgroundColor: '#4dabf7' }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    minWidth: 80,
    marginHorizontal: 5,
  },
});

export default Counter;