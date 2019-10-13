import React from "react";
import propTypes from "prop-types";

/**
 * Functional react component for congratulator message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component (or null if success prop is empty)
 */

const Congrats = props => {
  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Congratulations! you guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats"></div>;
  }
};

Congrats.propTypes = {
  success: propTypes.bool.isRequired
};

export default Congrats;
