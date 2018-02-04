import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import {
    setFlipped, setQuestionNumber, setQuizState,
    setScore
} from "../statemanagement/actions/containers/quiz.actions";
import { green, red, white } from "../utils/colors";
import Button from "./button";
import CardContent from "./card-content";
import { createQuizContainerState } from "../statemanagement/reducers/containers/quiz.reducer";
import { clearLocalNotification, setLocalNotification } from "../utils/notifications";

class Quiz extends Component {
    componentWillMount() {
        this.props.resetQuizState();
    }
    render() {
        const {questionNumber, flipped, totalQuestions, currentQuestion, flipCard, setQuestionNumber, score, setScore, navigation, resetQuizState} = this.props;
        const handleSubmit = (isCorrect) => {
            flipCard(false);
            const increment = isCorrect ? 1 : 0;
            setScore(score + increment);
            setQuestionNumber(questionNumber + 1);
        };
        if (questionNumber > totalQuestions) {
            clearLocalNotification().then(
                setLocalNotification
            );
            return (
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <View style={styles.centerWrapper}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>
                            Sweet, all done! You're scored {Math.round((score/totalQuestions)*100)}% on this test.
                        </Text>
                        <View style={[styles.centerWrapper, {marginTop: 50}]}>
                            <Button onPress={() => resetQuizState()}>Restart Quiz</Button>
                            <Button onPress={() => navigation.goBack()}>Back to Deck</Button>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.counterWrapper}>
                        <Text style={{fontWeight: 'bold'}}>{questionNumber}/{totalQuestions}</Text>
                    </View>
                    <CardContent cardContent={flipped ? currentQuestion.answer : currentQuestion.question}
                                 flipLinkText={flipped ? 'Question' : 'Answer'}
                                 onFlip={() => flipCard(!flipped)}></CardContent>
                    <View style={styles.buttonWrapper}>
                        <Button style={{borderWidth: 0}} textColor={white} backgroundColor={green}
                                onPress={() => handleSubmit(true)}>Correct</Button>
                        <Button style={{borderWidth: 0}} textColor={white} backgroundColor={red}
                                onPress={() => handleSubmit(false)}>Incorrect</Button>
                    </View>
                </ScrollView>
            )
        }
    }
}

const mapStateToProps = (state, {navigation}) => {
    const {questionNumber, flipped, score} = state.containers.quiz;
    const activeDeckTitle = state.data.activeDeckTitle;
    const totalQuestions = state.data.decks[activeDeckTitle].questions.length;
    const currentQuestion = state.data.decks[activeDeckTitle].questions[questionNumber - 1];
    return {
        questionNumber,
        score,
        flipped,
        currentQuestion,
        totalQuestions,
        navigation
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetQuizState: () => dispatch(setQuizState(createQuizContainerState())),
        flipCard: (flipped) => dispatch(setFlipped(flipped)),
        setQuestionNumber: (number) => dispatch(setQuestionNumber(number)),
        setScore: (number) => dispatch(setScore(number))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    counterWrapper: {
        alignSelf: 'flex-start',
    },
    centerWrapper: {
        alignSelf: 'center',
    },
    title: {
        fontSize: 35,
        padding: 10,
        fontWeight: 'bold'
    },
})
