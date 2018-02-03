import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { black, gray, white } from '../utils/colors';
import BoxedInput from './boxed-input';
import Button from "./button";
import { getDeck, saveDeckTitle } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { connect } from "react-redux";
import { saveCard } from "../statemanagement/actions/data/decks.actions";

class NewCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    handleTextChange = (key, text) => {
        this.setState({[key]: text})
    }

    onSubmit = () => {
        const {navigation, addCard} = this.props;
        const {deckTitle} = navigation.state.params;
        addCard(deckTitle, this.state).then(() =>
                navigation.goBack());
    }

    render() {
        const {question, answer} = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formWrapper}>
                    <BoxedInput placeholder={'Question'} style={{width: 300}}
                                handleTextChange={(text) => this.handleTextChange('question', text)} value={question}/>
                    <View style={{height: 20}}></View>
                    <BoxedInput placeholder={'Answer'} style={{width: 300}}
                                handleTextChange={(text) => this.handleTextChange('answer', text)} value={answer}/>
                    <Button style={{margin: 10}} textColor={white} backgroundColor={black} onPress={this.onSubmit}>Submit</Button>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state, {navigation}) => {
    return {
        navigation
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (title, card) => dispatch(saveCard(title, card))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    formWrapper: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
        marginBottom: 100,
    },
})
