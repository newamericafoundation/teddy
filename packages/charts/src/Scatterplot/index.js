import React from "react";
import { Group } from "@vx/group";
import { scaleLinear, scalePower } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { Grid } from "@vx/grid";
import { max, extent } from "d3-array";
import Chart from "../Chart";

const Scatterplot = ({
  maxWidth,
  height,
  data,
  x,
  y,
  r,
  xAxisLabel,
  yAxisLabel,
  yFormat,
  xFormat,
  size = 5,
  numTicksX = 5,
  numTicksY = 5,
  renderTooltip,
  renderAnnotation,
  margin = {
    top: 10,
    bottom: 50,
    left: 55,
    right: 10
  },
  circleStroke = "#4C81DB",
  circleFill = "rgba(76,129,219, 0.4)"
}) => {
  return (
    <Chart
      maxWidth={maxWidth}
      height={height}
      margin={margin}
      renderTooltip={renderTooltip}
      renderAnnotation={renderAnnotation}
    >
      {({ width, height, handleMouseEnter, handleMouseLeave }) => {
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

        let rScale = undefined;

        if (r && size.length === 2) {
          rScale = scalePower({
            domain: extent(data, r),
            range: [size[0], size[1]],
            exponent: 0.5
          });
        }

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
                    stroke={circleStroke}
                    fill={circleFill}
                    fillOpacity={0.2}
                    cx={xScale(x(point))}
                    cy={yScale(y(point))}
                    r={rScale ? rScale(r(point)) : size}
                    onMouseMove={event =>
                      renderTooltip
                        ? handleMouseEnter({ event, data, datum: point })
                        : null
                    }
                    onMouseLeave={renderTooltip ? handleMouseLeave : null}
                  />
                );
              })}
            </Group>
            <AxisLeft
              scale={yScale}
              hideAxisLine={false}
              hideTicks={true}
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
      }}
    </Chart>
  );
};

export default Scatterplot;
