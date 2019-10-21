import React, { useState } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

export const UnconnecInput = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.guessWord(state);
  };

  const [state, setState] = useState("");

  const contents = props.success ? null : (
    <form className="form-inline">
      <input
        className="mb-2 mx-sm-3"
        type="text"
        placeholder="enter guess"
        data-test="input-box"
        onChange={e => setState(e.target.value)}
        value={state}
      ></input>
      <button
        className="btn btn-primary"
        type="submit"
        data-test="submit-button"
        onClick={e => handleSubmit(e)}
      >
        Submit
      </button>
    </form>
  );
  return <div data-test="component-input">{contents}</div>;
};

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(
  mapStateToProps,
  { guessWord }
)(UnconnecInput);
