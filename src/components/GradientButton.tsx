import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Text } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

const GradientButton = ({ title, onPress, style, textStyle, disabled }: GradientButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, style]}
            disabled={disabled}
            activeOpacity={0.8}
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
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120,
        minHeight: 48,
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