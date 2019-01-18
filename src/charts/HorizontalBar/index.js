import React from "react";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear } from "@vx/scale";
import { GridColumns } from "@vx/grid";
import { max } from "d3-array";
import Chart from "../Chart";

export default ({
  maxWidth,
  height,
  data,
  x,
  y,
  renderTooltip,
  xFormat,
  yFormat,
  xAxisLabel,
  yAxisLabel,
  yLabelOffset = "-0.5em",
  numTicksX = 6,
  color = "#22C8A3",
  margin = {
    top: 10,
    left: 70,
    right: 10,
    bottom: 50
  }
}) => {
  return (
    <Chart maxWidth={maxWidth} height={height} renderTooltip={renderTooltip}>
      {({ width, height, handleMouseEnter, handleMouseLeave }) => {
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        const yScale = scaleBand({
          rangeRound: [0, yMax],
          domain: data.map(y),
          padding: 0.2
        });

        const xScale = scaleLinear({
          rangeRound: [0, xMax],
          domain: [0, max(data, x)]
        });

        return (
          <Group top={margin.top} left={margin.left}>
            <GridColumns
              scale={xScale}
              height={yMax}
              numTicks={
                typeof numTicksX === "function" ? numTicksX(width) : numTicksX
              }
            />
            <Group>
              {data.map((datum, i) => {
                return (
                  <Bar
                    key={`bar-${i}`}
                    x={0}
                    y={yScale(y(datum))}
                    width={xScale(x(datum))}
                    height={yScale.bandwidth()}
                    fill={color}
                    onMouseMove={event =>
                      handleMouseEnter({ event, data, datum })
                    }
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </Group>
            <AxisLeft
              scale={yScale}
              label={yAxisLabel}
              labelProps={{
                textAnchor: "middle"
              }}
              hideTicks={false}
              hideAxisLine={false}
              tickFormat={yFormat}
              tickLabelProps={() => ({
                width: margin.left,
                textAnchor: "end",
                verticalAnchor: "middle",
                dx: "-0.3em"
              })}
              labelProps={{
                dx: yLabelOffset,
                textAnchor: "middle"
              }}
            />
            <AxisBottom
              top={yMax}
              scale={xScale}
              label={xAxisLabel}
              hideAxisLine={true}
              hideTicks={true}
              numTicks={
                typeof numTicksX === "function" ? numTicksX(width) : numTicksX
              }
              tickFormat={xFormat}
              tickLabelProps={() => ({
                textAnchor: "middle",
                verticalAnchor: "end"
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
