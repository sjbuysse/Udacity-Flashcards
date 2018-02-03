import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { black, gray, white } from '../utils/colors';

export default class Button extends Component {
    render() {
        const {children, backgroundColor, textColor, onPress, style} = this.props;
        return (
            <TouchableOpacity style={[styles.button, {backgroundColor}, style]} onPress={onPress}>
                <Text style={[styles.buttonText, {color: textColor}]}>{children}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
        margin: 4,
        borderColor: black,
        borderWidth: 2,
        borderRadius: 5,
        width: 130
    },
    buttonText: {
        fontWeight: 'bold'
    }
})
