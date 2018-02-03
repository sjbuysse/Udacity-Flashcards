import React, { Component } from 'react';
import { black } from '../utils/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default DeckListItem = (props) => {
        const {deck, handleRemove} = props;
        const questionsAmt = deck.questions.length;
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text>
                        {questionsAmt} {questionsAmt === 1 ? 'card' : 'cards'}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleRemove}>
                    <FontAwesome name='trash-o'></FontAwesome>
                </TouchableOpacity>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 25,
        borderBottomWidth: 1,
        borderBottomColor: black,
        alignItems: 'center'
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold'
    }
})