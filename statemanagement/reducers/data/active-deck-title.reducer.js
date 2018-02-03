import { SET_ACTIVE_DECK_TITLE } from '../../actions/data/active-deck-title.actions';

export const activeDeckTitleReducer = (state = null, action) => {
    switch(action.type) {
        case(SET_ACTIVE_DECK_TITLE):
            return action.deckTitle
        default:
            return state;
    }
};
