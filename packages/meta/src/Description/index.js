import React from "react";
import PropTypes from "prop-types";
import "./Description.scss";

const Description = ({ children, className, style }) => (
  <span
    className={`dv-chart__description ${className ? className : ""}`}
    style={style}
  >
    {children}
  </span>
);

Description.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Description;
