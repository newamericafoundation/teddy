import React from "react";
import PropTypes from "prop-types";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear } from "@vx/scale";
import { GridRows } from "@vx/grid";
import { max } from "d3-array";
import Chart from "../Chart";

const BarChart = ({
  maxWidth,
  height,
  aspectRatio,
  renderTooltip,
  renderAnnotation,
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
  return (
    <Chart
      maxWidth={maxWidth}
      height={height}
      aspectRatio={aspectRatio}
      renderTooltip={renderTooltip}
      renderAnnotation={renderAnnotation}
    >
      {({ width, height, handleMouseEnter, handleMouseLeave }) => {
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
                      renderTooltip
                        ? handleMouseEnter({ event, data, datum })
                        : null
                    }
                    onMouseLeave={renderTooltip ? handleMouseLeave : null}
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
      }}
    </Chart>
  );
};

BarChart.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  aspectRatio: PropTypes.number,
  renderTooltip: PropTypes.func,
  renderAnnotation: PropTypes.func,
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  /**
   * You can specify the number of y axis ticks directly, or pass in a function which will receive the chart's computed height as an argument.
   */
  numTicksY: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  color: PropTypes.string,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

BarChart.defaultProps = {
  numTicksY: 5,
  color: "#22C8A3",
  margin: {
    top: 10,
    left: 55,
    right: 10,
    bottom: 30
  }
};

export default BarChart;
