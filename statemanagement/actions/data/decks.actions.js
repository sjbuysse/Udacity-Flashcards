import * as api from '../../../utils/api';

export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const UPDATE_DECK = 'UPDATE_DECK';

export const addDeck = deck => ({
    type: ADD_DECK,
    deck
});

export const removeDeck = title => ({
    type: REMOVE_DECK,
    title
});

export const addCardToDeck = (deckTitle, card) => ({
    type: UPDATE_DECK,
    deckTitle,
    card
});

export const saveDeck = (title) => (dispatch) => (
    api.saveDeckTitle(title)
        .then(deck => dispatch(addDeck(deck)))
);

export const saveCard = (deckTitle, card) => (dispatch) => (
    api.addCardToDeck(deckTitle, card)
        .then(returnedCard => dispatch(addCardToDeck(deckTitle, returnedCard)))
);

export const deleteDeck = (title) => (dispatch) => (
    api.removeDeck(title)
        .then(() => dispatch(removeDeck(title)))
);

export const fetchDecks = () => (dispatch) => {
    api.getDecks().then(decks => {
        for (const deckTitle of Object.keys(decks)) {
            dispatch(addDeck(decks[deckTitle]));
        }
    })
};
