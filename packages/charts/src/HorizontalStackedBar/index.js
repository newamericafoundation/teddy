import React from "react";
import { BarStackHorizontal } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { LegendOrdinal } from "@vx/legend";
import { GridColumns } from "@vx/grid";
import { max } from "d3-array";
import Chart from "../Chart";

export default ({
  maxWidth,
  height,
  data,
  y,
  yFormat,
  xFormat,
  yAxisLabel,
  xAxisLabel,
  numTicksX,
  keys,
  colors,
  renderTooltip,
  margin = {
    top: 10,
    left: 60,
    right: 40,
    bottom: 40
  }
}) => {
  const totals = data.reduce((acc, cur) => {
    const t = keys.reduce((total, key) => {
      total += +cur[key];
      return total;
    }, 0);
    acc.push(t);
    return acc;
  }, []);

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors
  });

  const legend = () => (
    <LegendOrdinal
      scale={colorScale}
      direction="row"
      labelMargin="0 15px 0 0"
    />
  );

  return (
    <Chart
      maxWidth={maxWidth}
      height={height}
      renderTooltip={renderTooltip}
      renderLegend={legend}
    >
      {({ width, height, handleMouseEnter, handleMouseLeave }) => {
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        const xScale = scaleLinear({
          rangeRound: [0, xMax],
          domain: [0, max(totals)],
          nice: true
        });
        const yScale = scaleBand({
          rangeRound: [yMax, 0],
          domain: data.map(y),
          padding: 0.2
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
            <BarStackHorizontal
              data={data}
              keys={keys}
              height={yMax}
              y={y}
              xScale={xScale}
              yScale={yScale}
              color={colorScale}
            >
              {barStacks => {
                return barStacks.map(barStack =>
                  barStack.bars.map(bar => (
                    <rect
                      key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={event =>
                        handleMouseEnter({ event, data, datum: bar })
                      }
                    />
                  ))
                );
              }}
            </BarStackHorizontal>
            <AxisLeft
              scale={yScale}
              hideAxisLine={false}
              hideTicks={false}
              tickFormat={yFormat}
              label={yAxisLabel}
              tickLabelProps={() => ({
                width: margin.left,
                textAnchor: "end",
                verticalAnchor: "middle",
                dx: "-0.3em"
              })}
            />
            <AxisBottom
              scale={xScale}
              top={yMax}
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
              label={xAxisLabel}
              labelProps={{
                dy: "2.5em",
                textAnchor: "middle",
                verticalAnchor: "start"
              }}
            />
          </Group>
        );
      }}
    </Chart>
  );
};
