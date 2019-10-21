import React from "react";
import { shallow } from "enzyme";

import setupTests from "./setupTests";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnecInput } from "./input";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();

  return wrapper;
};

setup();

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("doest not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true;
    const store = storeFactory({ success });
    // it is essential that we just dive one level
    const wrapper = shallow(<Input store={store} />).dive(); // note, single dive
    expect(wrapper.props().success).toBe(true);
  });

  test("'guessWord' action creator is a function prop", () => {
    const success = true;
    const store = storeFactory({ success });
    const wrapper = shallow(<Input store={store} />).dive();
    const guessWordProp = wrapper.props().guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action creator call", () => {
  let guessWordMock;
  let wrapper;
  beforeEach(() => {
    // set up mock for guess word
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock
    };
    // set up app component with guessWordMock as the guessWord prop
    wrapper = shallow(<UnconnecInput {...props} />);

    // add value to the input box

    // simulated click
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls 'guessword' when button is clicked", () => {
    // check to see if mock ran
    const guessWordCallCount = guessWordMock.mock.calls.length;

    expect(guessWordCallCount).toBe(1);
  });

  test("submits guessword with the correct input", () => {
    // our change for testing
    const eventObj = { target: { value: "test" } };

    // our input element
    const input = findByTestAttr(wrapper, "input-box");
    input.simulate("change", eventObj);

    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click");

    expect(guessWordMock.mock.calls[1][0]).toBe("test");
  });
});
