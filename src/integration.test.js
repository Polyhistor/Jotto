import { storeFactory } from "../test/testUtils";
import { guessWord } from "./actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unssuccesfulGuess = "train";
  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("update state correctly for unssuccesful guess", () => {
      store.dispatch(guessWord(unssuccesfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{ guessedWord: unssuccesfulGuess, letterMatchCount: 3 }]
      };
      expect(newState).toEqual(expectedState);
    });
    test("update state correctly for succesful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }]
      };
      expect(newState).toEqual(expectedState);
    });
  });
  describe("some guessed words", () => {
    test("update state correctly for unssuccesful guess", () => {});
    test("update state correctly for succesful guess", () => {});
  });
});
