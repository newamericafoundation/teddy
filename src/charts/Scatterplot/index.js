import React from "react";
import { Group } from "@vx/group";
import { GlyphCircle } from "@vx/glyph";
import { Text } from "@vx/text";
import { scaleLinear, scaleOrdinal } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { max, extent } from "d3-array";
import { format } from "d3-format";
import Chart from "../Chart";

const margin = {
  top: 10,
  bottom: 55,
  left: 65,
  right: 10
};

export default ({ maxWidth, height, data, renderTooltip, x, y }) => {
  return (
    <Chart maxWidth={maxWidth} height={height}>
      {({ width, height }) => {
        if (width < 100) return null;

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
          range: [yMaxRange, margin.top],
          clamp: true
        });

        return (
          <Group top={margin.top} left={margin.left}>
            <Group>
              {data.map((point, i) => {
                return (
                  <GlyphCircle
                    className="dv-scatterplot-point"
                    key={`point-${i}`}
                    stroke={"#4C81DB"}
                    fill="transparent"
                    fillOpacity={0.2}
                    left={xScale(x(point))}
                    top={yScale(y(point))}
                    size={60}
                  />
                );
              })}
            </Group>
            <AxisLeft
              scale={yScale}
              left={margin.left}
              stroke={"rgba(0,0,0,0.15)"}
              hideTicks={true}
              label="Metropolitan/Micropolitan Area Population"
              numTicks={6}
              tickFormat={d => format(".2s")(d).replace(".0", "")}
              tickLabelProps={() => ({
                fontFamily: "Circular",
                fontSize: "11px",
                textAnchor: "end",
                fill: "#333"
              })}
              labelProps={{
                dx: "-0.5em",
                textAnchor: "middle",
                fill: "#333",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            />
            <AxisBottom
              scale={xScale}
              top={height - margin.top - margin.bottom}
              left={margin.left}
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
};
