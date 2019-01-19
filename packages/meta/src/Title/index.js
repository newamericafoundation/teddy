import React from "react";
import "./Title.scss";

const Title = ({ title, className, style }) => (
  <h3 className={`dv-chart__title ${className}`} style={style}>
    {title}
  </h3>
);

export default Title;
