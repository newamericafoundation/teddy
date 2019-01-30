import React from "react";
import PropTypes from "prop-types";
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
  width,
  height,
  handleMouseMove,
  handleMouseLeave,
  data,
  valueAccessor,
  geometry,
  projection,
  colors,
  numStops,
  mapStroke,
  mapFill,
  idAccessor
}) => {
  const dataMap = map(data, idAccessor);
  const colorArray = quantize(interpolateRgb(colors[0], colors[1]), numStops);
  const colorScale = scaleQuantize({
    domain: extent(data, valueAccessor),
    range: colorArray
  });
  return (
    <LoadGeometry geometry={geometry}>
      {feature => (
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
                    fill={datum ? colorScale(valueAccessor(datum)) : mapFill}
                    stroke={mapStroke}
                    strokeWidth={0.5}
                    onMouseMove={event =>
                      handleMouseMove ? handleMouseMove({ event, datum }) : null
                    }
                    onMouseLeave={handleMouseLeave ? handleMouseLeave : null}
                  />
                );
              })}
            </g>
          )}
        </Projection>
      )}
    </LoadGeometry>
  );
};

Choropleth.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  data: PropTypes.array.isRequired,
  /**
   * An accessor function for the data that's colored on the map
   */
  valueAccessor: PropTypes.func.isRequired,
  geometry: PropTypes.oneOf(["world", "us"]).isRequired,
  projection: PropTypes.oneOf(["mercator", "equalEarth", "albersUsa"])
    .isRequired,
  /**
   * An array of two colors, from which the color scale will be calculated
   */
  colors: PropTypes.array,
  /**
   * The number of color stops
   */
  numStops: PropTypes.number,
  mapStroke: PropTypes.string,
  mapFill: PropTypes.string,
  /**
   * An accessor function for the state, country, or county FIPS code in your data. This is necessary to match politcal boundaries in the feature collection to your data.
   */
  idAccessor: PropTypes.func
};

Choropleth.defaultProps = {
  colors: ["#e6dcff", "#504a70"],
  numStops: 6,
  mapStroke: "#fff",
  mapFill: "#cbcbcd",
  idAccessor: d => d.id
};

export default Choropleth;
