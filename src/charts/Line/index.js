import React from "react";
import { ParentSize } from "@vx/responsive";
import { Group } from "@vx/group";
import { LinePath } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { curveBasis } from "@vx/curve";
import { format } from "d3-format";
import Chart from "../Chart";

export default ({
  width,
  height,
  x,
  y,
  xAxisLabel,
  yAxisLabel,
  data,
  margin = { top: 10, left: 50, bottom: 50, right: 10 },
  stroke = "#22C8A3",
  strokeWidth = 2
}) => (
  <Chart width={width} height={height}>
    {({ width, height }) => {
      const xMax = width - margin.left - margin.right;
      const yMax = height - margin.top - margin.bottom;

      const xScale = scaleLinear({
        domain: [Math.min(...data.map(x)), Math.max(...data.map(x))],
        range: [0, xMax]
      });
      const yScale = scaleLinear({
        domain: [0, Math.max(...data.map(y))],
        range: [yMax, 0]
      });
      return (
        <Group top={margin.top} left={margin.left}>
          <LinePath
            data={data}
            x={d => xScale(x(d))}
            y={d => yScale(y(d))}
            stroke={stroke}
            strokeWidth={strokeWidth}
            curve={curveBasis}
          />

          <AxisLeft
            scale={yScale}
            stroke={"rgba(0,0,0,0.15)"}
            hideTicks={true}
            label={yAxisLabel || ""}
            numTicks={6}
            tickLabelProps={() => ({
              fontFamily: "Circular",
              fontSize: "11px",
              textAnchor: "end",
              fill: "#333"
            })}
            labelProps={{
              dx: "0.5em",
              textAnchor: "middle",
              fill: "#333",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            stroke={"rgba(0,0,0,0.15)"}
            hideTicks={true}
            label={xAxisLabel || ""}
            numTicks={width < 450 ? 5 : 10}
            tickLabelProps={() => ({
              fontFamily: "Circular",
              fontSize: "11px",
              dy: "1.5em",
              fill: "#333",
              textAnchor: "middle"
            })}
            tickFormat={d => d}
            tickTransform={`translate(0,10px)`}
            labelProps={{
              dy: "3.5em",
              textAnchor: "middle",
              fill: "#333",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          />
        </Group>
      );
    }}
  </Chart>
);
