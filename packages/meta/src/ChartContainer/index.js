import React from "react";

const ChartContainer = ({ children, style, className, full, noBackground }) => (
  <div
    className={`dv-ChartContainer ${
      noBackground ? "dv-ChartContainer-nobg" : ""
    }`}
    style={style}
  >
    {full ? (
      <div className="dv-ChartContainer__child">{children}</div>
    ) : (
      { children }
    )}
  </div>
);

export default ChartContainer;
