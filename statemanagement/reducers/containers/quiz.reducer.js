import { SET_FLIPPED, SET_QUESTION_NUMBER, SET_QUIZ_STATE, SET_SCORE } from "../../actions/containers/quiz.actions";


export const createQuizContainerState = () => ({
    flipped: false,
    questionNumber: 1,
    score: 0,
    finished: false
})

const initialQuizState = createQuizContainerState();

export const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case (SET_FLIPPED):
            return {
                ...state,
                flipped: action.isFlipped
            };
        case (SET_QUESTION_NUMBER):
            return {
                ...state,
                questionNumber: action.questionNumber
            };
        case (SET_SCORE):
            return {
                ...state,
                score: action.score
            };
        case (SET_QUIZ_STATE):
            return action.state;
        default:
            return state;
    }
}