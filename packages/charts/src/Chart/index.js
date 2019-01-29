import React from "react";
import PropTypes from "prop-types";
import { ParentSize } from "@vx/responsive";
import WithTooltip from "./WithTooltip";
import "./Chart.scss";

/**
 * The base Chart component for all charts and maps.
 * This takes care of creating a responsive svg, and rendering tooltips, legends, and annotations.
 */
const Chart = ({
  maxWidth,
  height,
  aspectRatio,
  renderTooltip,
  renderLegend,
  renderAnnotation,
  children,
  ...rest
}) => {
  return (
    <div style={{ maxWidth, height }} className="dv-Chart">
      {renderLegend && (
        <div className="dv-legend-container">{renderLegend()}</div>
      )}

      <ParentSize>
        {({ width, height: computedHeight }) => {
          if (width < 10) return null;

          const chartHeight = height ? computedHeight : width * aspectRatio;

          if (renderTooltip) {
            return (
              <WithTooltip renderTooltip={renderTooltip}>
                {({ handleMouseEnter, handleMouseLeave, tooltipOpen }) => (
                  <svg width={width} height={chartHeight}>
                    {children({
                      width,
                      height: chartHeight,
                      handleMouseEnter,
                      handleMouseLeave,
                      tooltipOpen,
                      ...rest
                    })}
                    {renderAnnotation &&
                      renderAnnotation({ width, height: chartHeight })}
                  </svg>
                )}
              </WithTooltip>
            );
          } else {
            return (
              <svg width={width} height={chartHeight}>
                {children({ width, height: chartHeight, ...rest })}
                {renderAnnotation &&
                  renderAnnotation({ width, height: chartHeight })}
              </svg>
            );
          }
        }}
      </ParentSize>
    </div>
  );
};

Chart.propTypes = {
  /**
   * The max width of the chart. Can either be a string (i.e. `100%` or `8rem`) or a number representing a pixel value.
   */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  /**
   * The height of the chart. Can either be a string (i.e. `100%` or `8rem`) or a number representing a pixel value.
   * The chart MUST receive either a height or and aspectRatio prop.
   */
  height: (props, propName, componentName) => {
    if (!props.height && !props.aspectRatio) {
      return new Error(
        `One of props 'height' or 'aspectRatio' was not specified in '${componentName}'.`
      );
    }
    if (
      !props.aspectRatio &&
      (typeof props.height !== "string" && typeof props.height !== "number")
    ) {
      return new Error(
        `'${propName}' prop in '${componentName}' must be a number or a string.`
      );
    }
  },
  /**
   * The aspectRatio of the chart. This is a number that is multiplied by the chart's computed width to calculate the chart's height.
   * The chart MUST receive either a height or and aspectRatio prop.
   */
  aspectRatio: (props, propName, componentName) => {
    if (!props.height && !props.aspectRatio) {
      return new Error(
        `One of props 'height' or 'aspectRatio' was not specified in '${componentName}'.`
      );
    }
    if (!props.height && typeof props.aspectRatio !== "number") {
      return new Error(
        `'${propName}' prop in '${componentName}' must be a number.`
      );
    }
  },
  /**
   * A function that returns a component for the chart's tooltip.
   * It receives event, datum, and any other arguments passed into the `handleMouseEnter` function.
   */
  renderTooltip: PropTypes.func,
  /**
   * A function that returns a component for the chart's legend. This is rendered as a div above the chart's svg.
   */
  renderLegend: PropTypes.func,
  /**
   * A function that returns a component for an annotation, which is rendered at the very bottom of the svg.
   * It receive's the chart's current width and height (which are helpful to have for annotation positioning).
   */
  renderAnnotation: PropTypes.func,
  /**
   * A function that is passed the caculated width and height of the chart, as well as tooltip functions (if the renderTooltip prop is defined)
   */
  children: PropTypes.func.isRequired
};

Chart.defaultProps = {
  maxWidth: "100%"
};

export default Chart;
