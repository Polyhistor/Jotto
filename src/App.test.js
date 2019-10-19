import React from "react";
import { shallow } from "enzyme";

import setupTests from "./setupTests";
import { storeFactory } from "../test/testUtils";
import App from "./App";
import GuessedWords from "./Guessedwords";

/**
 * @function setup
 * @param {object} state - the default state
 * @return {ShallowWrapper}
 */

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store}></App>).dive();
  return wrapper;
};

setup();

describe("redux properties", () => {
  it("has access to 'success' state", () => {
    const success = true;
    const wrapper = setup({ success });
    expect(wrapper.props().success).toEqual(success);
  });

  it("has access to 'secretWord' state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    expect(wrapper.props().secretWord).toEqual(secretWord);
  });

  it("has access to 'guessWords' state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    expect(wrapper.props().guessedWords).toEqual(guessedWords);
  });

  it("'getSecretWord' action is a function on the props", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.props().getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});
