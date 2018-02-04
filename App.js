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
import { black, purple, white } from "./utils/colors";
import MyStatusBar from "./components/MyStatusBar";
import { setLocalNotification } from "./utils/notifications";

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
        screen: Tabs,
        navigationOptions: {
            title: 'Udacicards',
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            title: 'Quiz',
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    },
    NewCard: {
        screen: NewCard
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    }
});

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
        store.dispatch(fetchDecks());
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <MyStatusBar backgroundColor='#000000' barStyle='light-content'/>
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
