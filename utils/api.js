import { AsyncStorage } from 'react-native';

const FLASHCARDS_KEY = 'Udacity:Flashcards';

function createDeck(title) {
    return {
        title: title,
        questions: []
    }
}

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARDS_KEY)
        .then(results => JSON.parse(results))
}

export function getDeck(id) {
    return AsyncStorage.getItem(FLASHCARDS_KEY)
        .then(results => JSON.parse(results))
        .then(data => data[id])
}

export const saveDeckTitle = (title) => {
    return AsyncStorage.getItem(FLASHCARDS_KEY)
        .then(results => JSON.parse(results))
        .then(data => {
            const newData = {
                ...data,
                [title]: createDeck(title)
            }
            return AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(newData))
                .then(() => newData[title])
        })
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(FLASHCARDS_KEY)
        .then(results => JSON.parse(results))
        .then(data => {
            const newData = {
                ...data,
                [title]: {
                    ...data[title],
                    questions: data[title].questions.concat(card)
                }
            };
            return AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(newData))
                .then(() => card);
        })
}

export function removeDeck(title) {
    return AsyncStorage.getItem(FLASHCARDS_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[title] = undefined;
            delete data[title];
            AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(data))
        })
}
