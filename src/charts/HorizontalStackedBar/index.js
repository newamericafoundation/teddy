import React from "react";
import { BarStackHorizontal } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { LegendOrdinal } from "@vx/legend";
import { max } from "d3-array";
import Chart from "../Chart";
import { colors as naColors } from "../../lib/colors";

export default ({
  width,
  height,
  data,
  y,
  yFormat,
  xFormat,
  yAxisLabel,
  xAxisLabel,
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
      width={width}
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
              hideAxisLine={true}
              hideTicks={true}
              scale={yScale}
              stroke={naColors.grey.dark}
              tickStroke={naColors.grey.dark}
              tickFormat={yFormat ? yFormat : null}
              label={yAxisLabel ? yAxisLabel : null}
              tickLabelProps={(value, index) => ({
                fill: naColors.grey.dark,
                fontSize: 12,
                width: margin.left,
                textAnchor: "end",
                verticalAnchor: "middle"
              })}
            />
            <AxisBottom
              scale={xScale}
              top={yMax}
              stroke={naColors.grey.dark}
              numTicks={width - margin.left - margin.right < 300 ? 5 : 10}
              tickStroke={naColors.grey.dark}
              tickFormat={xFormat ? xFormat : null}
              label={xAxisLabel ? xAxisLabel : null}
              tickLabelProps={(value, index) => ({
                fill: naColors.grey.dark,
                fontSize: 12,
                textAnchor: "middle"
              })}
            />
          </Group>
        );
      }}
    </Chart>
  );
};
