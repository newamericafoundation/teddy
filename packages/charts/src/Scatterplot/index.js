import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { scaleLinear } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { Grid } from "@vx/grid";
import { max } from "d3-array";

const Scatterplot = ({
  width,
  height,
  data,
  handleMouseMove,
  handleMouseLeave,
  x,
  y,
  xAxisLabel,
  yAxisLabel,
  yFormat,
  xFormat,
  circleRadius,
  numTicksX,
  numTicksY,
  circleStroke,
  circleFill,
  margin
}) => {
  if (width < 100) return;

  const xMax = width - margin.left - margin.right;
  const yMaxRange = height - margin.top - margin.bottom;
  const yMaxDomain = max(data, y);
  const xMaxDomain = max(data, x);

  const xScale = scaleLinear({
    domain: [0, xMaxDomain],
    range: [0, xMax],
    clamp: true
  });

  const yScale = scaleLinear({
    domain: [0, yMaxDomain],
    range: [yMaxRange, 0],
    clamp: true
  });

  return (
    <Group top={margin.top} left={margin.left}>
      <Grid
        xScale={xScale}
        yScale={yScale}
        height={yMaxRange}
        width={xMax}
        numTicksRows={numTicksY}
        numTicksColumns={
          typeof numTicksX === "function" ? numTicksX(width) : numTicksX
        }
      />
      <Group>
        {data.map((point, i) => {
          return (
            <circle
              className="dv-scatterplot-point"
              key={`point-${i}`}
              stroke={
                typeof circleStroke === "function"
                  ? circleStroke(point)
                  : circleStroke
              }
              fill={
                typeof circleFill === "function"
                  ? circleFill(point)
                  : circleFill
              }
              fillOpacity={0.2}
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              r={
                typeof circleRadius === "function"
                  ? circleRadius(point)
                  : circleRadius
              }
              onMouseMove={event =>
                handleMouseMove
                  ? handleMouseMove({ event, data, datum: point })
                  : null
              }
              onMouseLeave={handleMouseLeave ? handleMouseLeave : null}
            />
          );
        })}
      </Group>
      <AxisLeft
        scale={yScale}
        hideAxisLine={false}
        hideTicks={true}
        hideZero={true}
        numTicks={
          typeof numTicksY === "function" ? numTicksY(width) : numTicksY
        }
        tickFormat={yFormat}
        tickLabelProps={() => ({
          textAnchor: "end",
          verticalAnchor: "middle"
        })}
        label={yAxisLabel}
        labelProps={{
          textAnchor: "middle",
          verticalAnchor: "end"
        }}
      />
      <AxisBottom
        scale={xScale}
        top={height - margin.top - margin.bottom}
        hideAxisLine={false}
        hideTicks={true}
        tickFormat={xFormat}
        numTicks={
          typeof numTicksX === "function" ? numTicksX(width) : numTicksX
        }
        tickLabelProps={() => ({
          textAnchor: "middle",
          verticalAnchor: "end"
        })}
        label={xAxisLabel}
        labelProps={{
          dy: "2.5em",
          textAnchor: "middle",
          verticalAnchor: "start",
          y: 0
        }}
      />
    </Group>
  );
};

Scatterplot.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  data: PropTypes.array.isRequired,
  /**
   * Accessor function for x axis values
   */
  x: PropTypes.func.isRequired,
  /**
   * Accessor function for y axis values
   */
  y: PropTypes.func.isRequired,
  /**
   * Formatting function for x axis tick labels
   */
  xFormat: PropTypes.func,
  /**
   * Formatting function for y axis tick labels
   */
  yFormat: PropTypes.func,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  /**
   * You can specify the number of x axis ticks directly, or pass in a function which will receive the chart's computed width as an argument.
   */
  numTicksX: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * You can specify the number of y axis ticks directly, or pass in a function which will receive the chart's computed height as an argument.
   */
  numTicksY: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * A number for the circle's radius, or a function that will receive that circle's datum for [radius scaling](https://bl.ocks.org/guilhermesimoes/e6356aa90a16163a6f917f53600a2b4a).
   */
  circleRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * A string for each circle's stroke, or a function that will receive that circle's datum
   */
  circleStroke: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * A string for each circle's fill, or a function that will receive that circle's datum
   */
  circleFill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

Scatterplot.defaultProps = {
  circleRadius: 5,
  numTicksX: 5,
  numTicksY: 5,
  margin: {
    top: 10,
    bottom: 50,
    left: 55,
    right: 10
  },
  circleStroke: "#4C81DB",
  circleFill: "rgba(76,129,219, 0.4)"
};

export default Scatterplot;
