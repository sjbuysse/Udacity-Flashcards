import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import { black, gray } from '../utils/colors';

export default class BoxedInput extends Component {
    render() {
        const {value, handleTextChange, placeholder, style} = this.props;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <TextInput placeholder={placeholder} style={[styles.input, style]} value={value}
                               onChangeText={handleTextChange}/>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: black,
        borderWidth: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    input: {
        paddingBottom: 5,
        borderBottomColor: gray,
        borderBottomWidth: 2,
    }
})
