import React from "react";
import { Chart } from "@newamerica/charts";
import { scaleQuantize } from "@vx/scale";
import { map } from "d3-collection";
import { extent } from "d3-array";
import { quantize, interpolateRgb } from "d3-interpolate";
import LoadGeometry from "../LoadGeometry";
import Projection from "../Projection";

/**
 * Choropleth map
 * TODO: legend and margins
 */
const Choropleth = ({
  maxWidth,
  height,
  data,
  accessor,
  geometry,
  projection,
  renderTooltip,
  colors = ["#e5f5f9", "#2ca25f"],
  numStops = 6,
  mapStroke = "#fff",
  mapFill = "#cbcbcd",
  id = d => d.id
}) => {
  const dataMap = map(data, id);
  const colorArray = quantize(interpolateRgb(colors[0], colors[1]), numStops);
  const colorScale = scaleQuantize({
    domain: extent(data, accessor),
    range: colorArray
  });
  return (
    <LoadGeometry geometry={geometry}>
      {feature => (
        <Chart
          maxWidth={maxWidth}
          height={height}
          renderTooltip={renderTooltip}
        >
          {({ width, height, handleMouseEnter, handleMouseLeave }) => {
            return (
              <Projection
                data={feature.features}
                projection={projection}
                fitSize={[[width, height], feature]}
              >
                {topo => (
                  <g>
                    {topo.features.map((f, i) => {
                      const datum = dataMap.get(f.feature.id);
                      return (
                        <path
                          key={`map-feature-${i}`}
                          d={f.path}
                          fill={datum ? colorScale(accessor(datum)) : mapFill}
                          stroke={mapStroke}
                          strokeWidth={0.5}
                          onMouseMove={event =>
                            handleMouseEnter({ event, datum })
                          }
                          onMouseLeave={handleMouseLeave}
                        />
                      );
                    })}
                  </g>
                )}
              </Projection>
            );
          }}
        </Chart>
      )}
    </LoadGeometry>
  );
};

export default Choropleth;
