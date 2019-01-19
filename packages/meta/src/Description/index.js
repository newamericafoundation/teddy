import React from "react";
import "./Description.scss";

const Description = ({ children, className, style }) => (
  <p className={`dv-chart__description ${className}`} style={style}>
    {children}
  </p>
);

export default Description;
