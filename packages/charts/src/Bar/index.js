import React from "react";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear } from "@vx/scale";
import { GridRows } from "@vx/grid";
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
  numTicksY = 5,
  color = "#22C8A3",
  margin = {
    top: 10,
    left: 55,
    right: 10,
    bottom: 30
  }
}) => {
  return (
    <Chart maxWidth={maxWidth} height={height} renderTooltip={renderTooltip}>
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
            <GridRows scale={yScale} width={xMax} numTicks={numTicksY} />
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
                      handleMouseEnter({ event, data, datum })
                    }
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </Group>
            <AxisLeft
              scale={yScale}
              hideTicks={true}
              hideAxisLine={true}
              numTicks={numTicksY}
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
