/**
 * @method getLetterMatchCount
 * @param {String} guessedWord - Guessed Word.
 * @param {String} secretWord - Secret Word.
 * @returns {number} - Number of letters matched between the guessed word and the secret word
 */

export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = new Set(secretWord.split(""));
  const guessedLetterSet = new Set(guessedWord.split(""));
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter))
    .length;
}
