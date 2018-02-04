import React, { Component } from 'react';
import { black } from '../utils/colors';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class DeckListItem extends Component {
    state = {
        bounceValue: new Animated.Value(1)
    };

    handleSelect = () => {
        const {bounceValue} = this.state;
        const {navigateToDeck} = this.props;
        Animated.sequence([
            Animated.timing(bounceValue, {duration: 200, toValue: 1.07}),
        ]).start(() => {
            navigateToDeck();
            this.setState({
                bounceValue: new Animated.Value(1)
            });
        });
    }

    render() {
        const {deck, handleRemove} = this.props;
        const {bounceValue} = this.state;
        const questionsAmt = deck.questions.length;
        return (
            <TouchableOpacity onPress={() => this.handleSelect()}>
                <View style={styles.container}>
                    <View style={styles.titleWrapper}>
                        <Animated.Text
                            style={[styles.title, {transform: [{scale: bounceValue}]}]}>{deck.title}</Animated.Text>
                        <Text>
                            {questionsAmt} {questionsAmt === 1 ? 'card' : 'cards'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleRemove}>
                        <FontAwesome name='trash-o'></FontAwesome>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
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