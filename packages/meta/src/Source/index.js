import React from "react";
import "./Source.scss";

const Source = ({ title, className, style }) => (
  <span className={`dv-chart__source ${className}`} style={style}>
    {title}
  </span>
);

export default Source;
