import React from "react";
import "./Title.scss";

const Title = ({ children, className, style }) => (
  <h3 className={`dv-chart__title ${className}`} style={style}>
    {children}
  </h3>
);

export default Title;
