import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { deleteDeck } from "../statemanagement/actions/data/decks.actions";
import DeckListItem from "./deck-list-item";
import { setActiveDeckTitle } from "../statemanagement/actions/data/active-deck-title.actions";

const DecksList = (props) => {
    const {decks, navigation, removeDeck, setActiveDeckTitle} = props;
    handleSelect = (deck) => {
        setActiveDeckTitle(deck.title);
        navigation.navigate('Deck');
    };
    return (
        <ScrollView style={styles.container}>
            {decks.map(deck => (
                    <DeckListItem key={deck.title} navigateToDeck={() => handleSelect(deck)} deck={deck} handleRemove={() => removeDeck(deck.title)}/>
                )
            )}
        </ScrollView>
    )
}

const mapStateToProps = (state, {navigation}) => {
    const decksObject = state.data.decks;
    const decks = Object.keys(decksObject).map(title => decksObject[title]);
    return {
        decks,
        navigation
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveDeckTitle: (title) => dispatch(setActiveDeckTitle(title)),
        removeDeck: (title) => dispatch(deleteDeck(title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DecksList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
