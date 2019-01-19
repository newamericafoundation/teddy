import React from "react";
import "./Description.scss";

const Description = ({ title, className, style }) => (
  <p className={`dv-chart__description ${className}`} style={style}>
    {title}
  </p>
);

export default Description;
