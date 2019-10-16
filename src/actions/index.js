import axios from "axios";

import { getLetterMatchCount } from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD"
};

/**
 * It takes a state as an argument and it updates the state based on the correct guess
 * @function guessWord
 * @param {object} guessedWord - the current state
 * @returns {function} - function that updates the state
 */
export const guessWord = guessedWord => {
  return function(dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount }
    });

    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS
      });
    }
  };
};

export const getSecretWord = () => {
  return dispatch => {
    return axios.get("http://localhost:3000").then(respond => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: respond.data
      });
    });
  };
};
