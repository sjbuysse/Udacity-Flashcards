export const SET_FLIPPED = 'SET_FLIPPED';
export const SET_QUESTION_NUMBER = 'SET_QUESTION_NUMBER';
export const SET_SCORE = 'SET_SCORE';
export const SET_QUIZ_STATE = 'SET_QUIZ_STATE';

export const setFlipped = isFlipped => ({
    type: SET_FLIPPED,
    isFlipped
});

export const setQuestionNumber = questionNumber => ({
    type: SET_QUESTION_NUMBER,
    questionNumber
});

export const setScore = score => ({
    type: SET_SCORE,
    score
});

export const setQuizState = state => ({
    type: SET_QUIZ_STATE,
    state
});
