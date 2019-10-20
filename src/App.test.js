import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";

import setupTests from "./setupTests";
import { storeFactory } from "../test/testUtils";
import App, { UnconnectedApp } from "./App";
import GuessedWords from "./Guessedwords";
import thunk from "redux-thunk";

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

it("'getSecretWord' runs on App mount", () => {
  const success = true;
  const store = storeFactory({ success });
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: true,
    guessedWords: []
  };

  React.useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());

  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // check to see if our mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);

  getSecretWordMock.mockClear();
});
