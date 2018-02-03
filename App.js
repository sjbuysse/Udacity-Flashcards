import React from 'react';
import { StatusBar, StyleSheet, View, Platform } from 'react-native';
import store from './statemanagement/store';
import { fetchDecks } from './statemanagement/actions/data/decks.actions';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator } from "react-navigation";
import DecksList from './components/decks-list';
import NewDeck from './components/new-deck';
import NewCard from './components/new-card';
import Deck from './components/deck';
import Quiz from './components/quiz';
import { purple, white } from "./utils/colors";

const Tabs = TabNavigator({
        decksList: {
            screen: DecksList,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-variant' size={30} color={tintColor}/>
            }
        },
        addEntry: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
            }
        }
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    });

const Stacks = StackNavigator({
    Home: {
        screen: Tabs
    },
    Deck: {
        screen: Deck
    },
    NewCard: {
        screen: NewCard
    },
    Quiz: {
        screen: Quiz
    }
});

export default class App extends React.Component {
    componentDidMount() {
        store.dispatch(fetchDecks());
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={{height: Constants.statusBarHeight}}>
                        <StatusBar/>
                    </View>
                    <Stacks/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});
