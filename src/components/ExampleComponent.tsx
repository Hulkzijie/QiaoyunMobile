import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Input } from '@rneui/themed';
import GradientButton from './GradientButton';

export const ExampleComponent = () => {
    return (
        <View style={styles.container}>
            <Text h1>Welcome</Text>
            <Text h4>This is an example component</Text>

            <Card>
                <Card.Title>Card Title</Card.Title>
                <Card.Divider />
                <Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Text>
                <GradientButton
                    title="Action"
                    onPress={() => { }}
                    style={styles.buttonContainer}
                />
            </Card>

            <Input
                placeholder="Enter your name"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
            />

            <GradientButton
                title="Primary Button"
                onPress={() => { }}
                style={styles.buttonContainer}
            />

            <GradientButton
                title="Disabled Button"
                onPress={() => { }}
                style={styles.buttonContainer}
                disabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonContainer: {
        marginTop: 16,
    },
});

export default ExampleComponent; 