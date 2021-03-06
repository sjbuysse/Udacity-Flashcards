import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { black, white } from '../utils/colors';
import BoxedInput from './boxed-input';
import Button from "./button";
import { saveDeck } from "../statemanagement/actions/data/decks.actions";
import { connect } from "react-redux";
import { setActiveDeckTitle } from "../statemanagement/actions/data/active-deck-title.actions";

class NewDeck extends Component {
    state = {
        input: ''
    }

    handleTextChange = (text) => {
        this.setState({input: text})
    }

onSubmit = () => {
    const deckTitle = this.state.input;
    this.props.addDeck(deckTitle)
        .then(() => {
            this.setState({
                input: ''
            })
            this.props.setActiveDeckTitle(deckTitle);
            this.props.navigation.navigate('decksList');
            this.props.navigation.navigate('Deck');
        });
}

    render() {
        const {input} = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>
                        What is the title of your new deck?
                    </Text>
                    <BoxedInput placeholder={'Deck title'} style={{width: 200}} handleTextChange={this.handleTextChange}
                                value={input}/>
                    <Button style={{margin: 10}} textColor={white} backgroundColor={black} onPress={this.onSubmit}>Submit</Button>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveDeckTitle: (title) => dispatch(setActiveDeckTitle(title)),
        addDeck: (title) => dispatch(saveDeck(title)),
    }
}

export default connect(null, mapDispatchToProps)(NewDeck)

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
