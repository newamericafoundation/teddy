import React from "react";
import { Chart } from "@newamerica/charts";
import { Text } from "@vx/text";
import { scaleLinear, scaleQuantize } from "@vx/scale";
import { quantize, interpolateRgb } from "d3-interpolate";
import { max, extent } from "d3-array";
import { map } from "d3-collection";
import layout from "./layout";
import "./Cartogram.scss";

/**
 * Cartogram map component
 * TODO: legend and margins
 */
const Cartogram = ({
  maxWidth,
  data,
  renderTooltip,
  valueAccessor,
  idAccessor = d => d.id,
  margin = { top: 10, right: 10, bottom: 10, left: 10 },
  mapStroke = "#fff",
  mapFill = "#cbcbcd",
  colors = ["#e5f5f9", "#2ca25f"],
  numStops = 6
}) => {
  const dataMap = map(data, idAccessor);
  const colorArray = quantize(interpolateRgb(colors[0], colors[1]), numStops);
  const colorScale = scaleQuantize({
    domain: extent(data, valueAccessor),
    range: colorArray
  });
  const x = d => d.x;
  const y = d => d.y;
  const boxesWide = max(layout, x) + 1;
  const boxesTall = max(layout, y) + 1;
  const ratio = boxesTall / boxesWide;
  return (
    <Chart
      maxWidth={maxWidth}
      aspectRatio={ratio}
      renderTooltip={renderTooltip}
    >
      {({ width, height, handleMouseEnter, handleMouseLeave }) => {
        if (width < 10) return;
        const boxWidth = width / boxesWide;
        const textOffset = boxWidth / 2;
        const xScale = scaleLinear({
          domain: [0, boxesWide],
          range: [0, width]
        });
        const yScale = scaleLinear({
          domain: [0, boxesTall],
          range: [0, height]
        });
        return (
          <g>
            {layout.map((state, i) => {
              const xPos = xScale(x(state));
              const yPos = yScale(y(state));
              const datum = dataMap.get(state.fips);
              return (
                <g
                  key={`grid-square-${i}`}
                  onMouseMove={event => handleMouseEnter({ event, datum })}
                  onMouseLeave={handleMouseLeave}
                >
                  <rect
                    x={xPos}
                    y={yPos}
                    width={boxWidth}
                    height={boxWidth}
                    fill={datum ? colorScale(valueAccessor(datum)) : mapFill}
                    stroke={mapStroke}
                  />
                  <Text
                    x={xPos + textOffset}
                    y={yPos + textOffset}
                    textAnchor="middle"
                    verticalAnchor="middle"
                    className="dv-Cartogram__label"
                  >
                    {width < 640 ? state.short : state.abb}
                  </Text>
                </g>
              );
            })}
          </g>
        );
      }}
    </Chart>
  );
};

export default Cartogram;
