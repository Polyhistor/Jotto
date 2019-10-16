import { actionTypes } from "../actions/";

/**
 * @function guessedWordsReducer
 * @param {array} state - array of guessed words
 * @param {object} action - object produced by the action creator
 * @returns {array} - new guessedWord state
 */

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    default:
      return state;
  }
};
