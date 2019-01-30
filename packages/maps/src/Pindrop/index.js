import React from "react";
import PropTypes from "prop-types";
import LoadGeometry from "../LoadGeometry";
import Projection from "../Projection";

/**
 * Pindrop map component
 * TODO: implement overlap detection with an optional `preventOverlap` prop
 */
class Pindrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { proj: null };
    this.projectionFunc = this.projectionFunc.bind(this);
  }

  projectionFunc = proj => {
    this.setState({ proj });
  };

  render() {
    const {
      width,
      height,
      handleMouseMove,
      handleMouseLeave,
      data,
      geometry,
      projection,
      circleRadius,
      circleFill,
      circleStroke,
      mapFill,
      mapStroke
    } = this.props;
    const { proj } = this.state;
    return (
      <LoadGeometry geometry={geometry}>
        {feature => (
          <g>
            <Projection
              data={feature.features}
              projection={projection}
              fitSize={[[width, height], feature]}
              projectionFunc={this.projectionFunc}
              fill={mapFill}
              stroke={mapStroke}
            />
            {proj &&
              data.map((datum, i) => {
                return (
                  <circle
                    key={`pin-${i}`}
                    r={
                      typeof circleRadius === "function"
                        ? circleRadius(datum)
                        : circleRadius
                    }
                    cx={proj([datum["lon"], datum["lat"]])[0]}
                    cy={proj([datum["lon"], datum["lat"]])[1]}
                    fill={
                      typeof circleFill === "function"
                        ? circleFill(datum)
                        : circleFill
                    }
                    stroke={
                      typeof circleStroke === "function"
                        ? circleStroke(datum)
                        : circleStroke
                    }
                    onMouseEnter={event => {
                      handleMouseMove
                        ? handleMouseMove({ event, datum })
                        : null;
                    }}
                    onMouseLeave={handleMouseLeave ? handleMouseLeave : null}
                  />
                );
              })}
          </g>
        )}
      </LoadGeometry>
    );
  }
}

Pindrop.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  data: PropTypes.array.isRequired,
  geometry: PropTypes.oneOf(["world", "us"]).isRequired,
  projection: PropTypes.oneOf(["mercator", "equalEarth", "albersUsa"])
    .isRequired,
  /**
   * A number for the circle's radius, or a function that will receive that point's datum for [radius scaling](https://bl.ocks.org/guilhermesimoes/e6356aa90a16163a6f917f53600a2b4a).
   */
  circleRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * A string for each circle's fill, or a function that will receive that circle's datum
   */
  circleFill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * A string for each circle's stroke, or a function that will receive that circle's datum
   */
  circleStroke: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  mapFill: PropTypes.string,
  mapStroke: PropTypes.string
};

Pindrop.defaultProps = {
  circleRadius: 5,
  circleFill: "#2ebcb3",
  circleStroke: "#fff",
  mapFill: "#cbcbcd",
  mapStroke: "#fff"
};

export default Pindrop;
