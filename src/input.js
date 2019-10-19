import React from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

const Input = props => {
  const contents = props.success ? null : (
    <form className="form-inline">
      <input
        className="mb-2 mx-sm-3"
        type="text"
        placeholder="enter guess"
        data-test="input-box"
      ></input>
      <button
        className="btn btn-primary"
        type="submit"
        data-test="submit-button"
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
)(Input);
