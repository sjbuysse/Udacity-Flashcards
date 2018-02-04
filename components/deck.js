import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { black, gray, white } from '../utils/colors';
import { Constants } from 'expo';
import Button from './button';
import { connect } from "react-redux";
import MyStatusBar from "./MyStatusBar";

class Deck extends Component {
    render() {
        const {deck, navigation} = this.props;
        const questionsAmt = deck.questions.length;
        return (
            <View style={styles.container}>
                <MyStatusBar backgroundColor='#000000' barStyle='light-content' />
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>
                        {deck.title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {questionsAmt} {questionsAmt === 1 ? 'card' : 'cards'}
                    </Text>
                </View>
                <View>
                    <Button onPress={() => navigation.navigate('NewCard', {deckTitle: deck.title})}>Add Card</Button>
                    <Button onPress={() => navigation.navigate('Quiz')} textColor={white} backgroundColor={black}>Start
                        Quiz</Button>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state, {navigation}) => {
    const {activeDeckTitle, decks} = state.data;
    return {
        deck: decks[activeDeckTitle],
        navigation
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (title) => dispatch(saveCard(title))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Deck);

const styles = StyleSheet.create({
    container: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleWrapper: {
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        padding: 10,
        fontWeight: 'bold'
    },
    subTitle: {
        color: gray,
        fontSize: 20,
        fontWeight: 'bold'
    }
})
