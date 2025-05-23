import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    style?: any;
    textStyle?: any;
    disabled?: boolean;
}

const GradientButton = ({ title, onPress, style, textStyle, disabled }: GradientButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, style]}
            disabled={disabled}
        >
            <LinearGradient
                colors={['#fe7000', '#e43800']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.gradient,
                    disabled && styles.disabledGradient
                ]}
            >
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradient: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledGradient: {
        opacity: 0.5,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GradientButton; 