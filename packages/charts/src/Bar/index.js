import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear } from "@vx/scale";
import { GridRows } from "@vx/grid";
import { max } from "d3-array";

const Bar = ({
  width,
  height,
  handleMouseMove,
  handleMouseLeave,
  data,
  x,
  y,
  xFormat,
  yFormat,
  xAxisLabel,
  yAxisLabel,
  numTicksY,
  color,
  margin
}) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.2
  });

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)]
  });

  return (
    <Group top={margin.top} left={margin.left}>
      <GridRows
        scale={yScale}
        width={xMax}
        numTicks={
          typeof numTicksY === "function" ? numTicksY(height) : numTicksY
        }
      />
      <Group>
        {data.map((datum, i) => {
          return (
            <Bar
              key={`bar-${i}`}
              x={xScale(x(datum))}
              y={yScale(y(datum))}
              width={xScale.bandwidth()}
              height={yMax - yScale(y(datum))}
              fill={color}
              onMouseMove={event =>
                handleMouseMove ? handleMouseMove({ event, data, datum }) : null
              }
              onMouseLeave={handleMouseLeave ? handleMouseLeave : null}
            />
          );
        })}
      </Group>
      <AxisLeft
        scale={yScale}
        hideTicks={true}
        hideAxisLine={true}
        numTicks={
          typeof numTicksY === "function" ? numTicksY(height) : numTicksY
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
        top={yMax}
        scale={xScale}
        label={xAxisLabel}
        hideAxisLine={false}
        hideTicks={false}
        tickFormat={xFormat}
        tickLabelProps={() => ({
          textAnchor: "middle",
          width: xScale.bandwidth(),
          verticalAnchor: "middle"
        })}
        labelProps={{
          dy: "3em",
          textAnchor: "middle",
          y: 0
        }}
      />
    </Group>
  );
};

Bar.propTypes = {
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
   * You can specify the number of y axis ticks directly, or pass in a function which will receive the chart's computed height as an argument.
   */
  numTicksY: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  color: PropTypes.string,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }).isRequired
};

Bar.defaultProps = {
  numTicksY: 5,
  color: "#22C8A3",
  margin: {
    top: 10,
    left: 55,
    right: 10,
    bottom: 30
  }
};

export default Bar;
