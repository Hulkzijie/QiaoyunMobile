import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExampleComponent from '../components/ExampleComponent';

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <ExampleComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default MainScreen; 