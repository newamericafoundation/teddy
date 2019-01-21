import React from "react";
import "./Description.scss";

const Description = ({ children, className, style }) => (
  <span className={`dv-chart__description ${className}`} style={style}>
    {children}
  </span>
);

export default Description;
