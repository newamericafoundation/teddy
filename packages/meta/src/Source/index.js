import React from "react";
import "./Source.scss";

const Source = ({ children, className, style }) => (
  <span className={`dv-chart__source ${className}`} style={style}>
    {children}
  </span>
);

export default Source;
