import React from "react";
import { BarGroup } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { LegendOrdinal } from "@vx/legend";
import { max } from "d3-array";
import Chart from "../Chart";
import { colors as naColors } from "../../lib/colors";

export default ({
  maxWidth,
  height,
  data,
  x,
  y,
  keys,
  renderTooltip,
  xFormat,
  yFormat,
  xAxisLabel,
  yAxisLabel,
  colors,
  margin = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
  }
}) => {
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

        const x0Scale = scaleBand({
          rangeRound: [0, xMax],
          domain: data.map(x),
          padding: 0.2
        });
        const x1Scale = scaleBand({
          rangeRound: [0, x0Scale.bandwidth()],
          domain: keys,
          padding: 0.1
        });
        const yScale = scaleLinear({
          rangeRound: [yMax, 0],
          domain: [
            0,
            max(data, d => {
              return max(keys, key => d[key]);
            })
          ]
        });

        return (
          <Group top={margin.top} left={margin.left}>
            <BarGroup
              data={data}
              keys={keys}
              height={yMax}
              x0={x}
              x0Scale={x0Scale}
              x1Scale={x1Scale}
              yScale={yScale}
              color={colorScale}
            >
              {barGroups => {
                return barGroups.map(barGroup => {
                  return (
                    <Group
                      key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                      left={barGroup.x0}
                    >
                      {barGroup.bars.map(bar => {
                        return (
                          <rect
                            key={`bar-group-bar-${barGroup.index}-${
                              bar.index
                            }-${bar.value}-${bar.key}`}
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            onMouseMove={event =>
                              handleMouseEnter({ event, data, datum: bar })
                            }
                            onMouseLeave={handleMouseLeave}
                          />
                        );
                      })}
                    </Group>
                  );
                });
              }}
            </BarGroup>
            <AxisLeft
              scale={yScale}
              label={yAxisLabel ? yAxisLabel : null}
              labelProps={{
                fontSize: 12,
                fill: naColors.grey.dark,
                textAnchor: "middle"
              }}
              stroke="rgba(0,0,0,0.15)"
              tickStroke="rgba(0,0,0,0.15)"
              hideTicks={false}
              tickFormat={yFormat ? yFormat : null}
              tickLabelProps={(value, index) => ({
                fill: naColors.grey.dark,
                fontSize: 12,
                textAnchor: "end",
                dy: "0.33em"
              })}
            />
            <AxisBottom
              top={yMax}
              scale={x0Scale}
              label={xAxisLabel ? xAxisLabel : null}
              stroke="rgba(0,0,0,0.15)"
              hideAxisLine={true}
              hideTicks={true}
              tickStroke={naColors.grey.dark}
              tickFormat={xFormat ? xFormat : null}
              tickLabelProps={(value, index) => ({
                fill: naColors.grey.dark,
                fontSize: 12,
                textAnchor: "middle",
                width: x0Scale.bandwidth(),
                verticalAnchor: "end"
              })}
            />
          </Group>
        );
      }}
    </Chart>
  );
};
