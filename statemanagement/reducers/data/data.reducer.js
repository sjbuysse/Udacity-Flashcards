import { combineReducers } from 'redux';
import { decksReducer } from './decks.reducer';
import { activeDeckTitleReducer } from "./active-deck-title.reducer";

export default combineReducers({
    decks: decksReducer,
    activeDeckTitle: activeDeckTitleReducer,
})
