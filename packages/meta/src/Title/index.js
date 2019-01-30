import React from "react";
import PropTypes from "prop-types";
import "./Title.scss";

const Title = ({ children, className, style }) => (
  <h3 className={`dv-chart__title ${className ? className : ""}`} style={style}>
    {children}
  </h3>
);

Title.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Title;
