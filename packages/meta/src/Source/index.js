import React from "react";
import PropTypes from "prop-types";
import "./Source.scss";

const Source = ({ children, className, style }) => (
  <span
    className={`dv-chart__source ${className ? className : ""}`}
    style={style}
  >
    {children}
  </span>
);

Source.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Source;
