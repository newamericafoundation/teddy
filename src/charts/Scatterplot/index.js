import React from "react";
import { Group } from "@vx/group";
import { scaleLinear, scaleOrdinal } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { max } from "d3-array";
import Chart from "../Chart";

export default ({
  maxWidth,
  height,
  data,
  x,
  y,
  r,
  renderTooltip,
  circleStroke = "#4C81DB",
  circleFill = "rgba(76,129,219, 0.4)",
  margin = {
    top: 10,
    bottom: 55,
    left: 65,
    right: 10
  }
}) => {
  return (
    <Chart maxWidth={maxWidth} height={height} margin={margin}>
      {({ width, height }) => {
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
            <Group>
              {data.map((point, i) => {
                return (
                  <circle
                    className="dv-scatterplot-point"
                    key={`point-${i}`}
                    stroke={circleStroke}
                    fill={circleFill}
                    fillOpacity={0.2}
                    cx={xScale(x(point))}
                    cy={yScale(y(point))}
                    datax={x(point)}
                    datay={y(point)}
                    r={5}
                  />
                );
              })}
            </Group>
            <AxisLeft
              scale={yScale}
              stroke={"rgba(0,0,0,0.15)"}
              hideTicks={true}
              label="Metropolitan/Micropolitan Area Population"
              numTicks={6}
              tickFormat={d => d}
              tickLabelProps={() => ({
                fontFamily: "Circular",
                fontSize: "11px",
                textAnchor: "end",
                fill: "#333"
              })}
              labelProps={{
                textAnchor: "middle",
                fill: "#333",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            />
            <AxisBottom
              scale={xScale}
              top={height - margin.top - margin.bottom}
              stroke={"rgba(0,0,0,0.15)"}
              hideTicks={true}
              label="Number of connections in each Metro Area"
              numTicks={width < 600 ? 5 : 20}
              tickLabelProps={() => ({
                fontFamily: "Circular",
                fontSize: "11px",
                dy: "1.5em",
                fill: "#333",
                textAnchor: "middle"
              })}
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
};
