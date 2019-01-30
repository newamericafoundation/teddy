import React from "react";
import PropTypes from "prop-types";
import { Chart } from "@newamerica/charts";
import { Text } from "@vx/text";
import { scaleLinear, scaleQuantize } from "@vx/scale";
import { quantize, interpolateRgb } from "d3-interpolate";
import { max, extent } from "d3-array";
import { map } from "d3-collection";
import layout from "./layout";
import "./Cartogram.scss";

/**
 * Cartogram map
 *
 * ⚠ this chart wraps the base `Chart` component in `@newamerica/charts`, because it relies on an internally calculated aspect ratio.
 */
const Cartogram = ({
  maxWidth,
  data,
  renderTooltip,
  valueAccessor,
  idAccessor,
  mapStroke,
  mapFill,
  colors,
  numStops
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
      {({ width, height, handleMouseMove, handleMouseLeave }) => {
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
                  onMouseMove={event => handleMouseMove({ event, datum })}
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

Cartogram.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array.isRequired,
  renderTooltip: PropTypes.func,
  valueAccessor: PropTypes.func.isRequired,
  idAccessor: PropTypes.func,
  mapStroke: PropTypes.string,
  mapFill: PropTypes.string,
  colors: PropTypes.array,
  numStops: PropTypes.number
};

Cartogram.defaultProps = {
  idAccessor: d => d.id,
  mapStroke: "#fff",
  mapFill: "#cbcbcd",
  colors: ["#e6dcff", "#504a70"],
  numStops: 6
};

export default Cartogram;
