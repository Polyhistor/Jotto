import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";

import GuessedWords from "./Guessedwords";
import Congrats from "./Congrats";
import Input from "./input";
import { getSecretWord } from "./actions";

const App = props => {
  useEffect(() => {
    props.getSecretWord();
  });

  return (
    <div className="container">
      <h1>Jotto</h1>
      <Congrats success={props.success} />
      <Input />
      <GuessedWords guessedWords={props.guessedWords} />
    </div>
  );
};

const mapStateToProps = state => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

export default connect(
  mapStateToProps,
  { getSecretWord }
)(App);
