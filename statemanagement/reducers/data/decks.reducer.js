import { ADD_DECK, REMOVE_DECK, UPDATE_DECK } from '../../actions/data/decks.actions';

const initialDecksState = {};

export const decksReducer = (state = initialDecksState, action) => {
    switch(action.type) {
        case(ADD_DECK):
            return {
                ...state,
                [action.deck.title] : action.deck
            };
        case(REMOVE_DECK):
            const newState = Object.assign({}, state);
            newState[action.title] = undefined;
            delete newState[action.title];
            return newState;
        case(UPDATE_DECK):
            return {
                ...state,
                [action.deckTitle] : {
                    ...state[action.deckTitle],
                    questions: state[action.deckTitle].questions.concat(action.card)
                }
            };
        default:
            return state;
    }
};
