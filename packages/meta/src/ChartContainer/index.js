import React from "react";
import PropTypes from "prop-types";
import "./ChartContainer.scss";

const ChartContainer = ({ children, style, className, full, noBackground }) => (
  <div
    className={`dv-ChartContainer ${
      noBackground ? "dv-ChartContainer-nobg" : ""
    } ${className ? className : ""}`}
    style={style}
  >
    {full ? (
      <div className="dv-ChartContainer__child">{children}</div>
    ) : (
      children
    )}
  </div>
);

ChartContainer.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  /**
   * Wraps your children in a div with the class `dv-ChartContainer__child`
   */
  full: PropTypes.bool,
  /**
   * Removes the light gray background and padding from the chart container
   */
  noBackground: PropTypes.bool
};

ChartContainer.defaultProps = {
  full: false,
  noBackground: false
};

export default ChartContainer;
