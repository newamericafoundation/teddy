import React from "react";
import { Chart } from "@newamerica/charts";
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
      maxWidth,
      height,
      aspectRatio,
      data,
      geometry,
      projection,
      circleRadius = 5,
      circleFill = "#2ebcb3",
      circleStroke = "#fff",
      mapFill = "#cbcbcd",
      mapStroke = "#fff",
      renderTooltip
    } = this.props;
    const { proj } = this.state;
    return (
      <LoadGeometry geometry={geometry}>
        {feature => (
          <Chart
            maxWidth={maxWidth}
            height={height}
            aspectRatio={aspectRatio}
            renderTooltip={renderTooltip}
          >
            {({ width, height, handleMouseEnter, handleMouseLeave }) => {
              return (
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
                          r={circleRadius}
                          cx={proj([datum["lon"], datum["lat"]])[0]}
                          cy={proj([datum["lon"], datum["lat"]])[1]}
                          fill={circleFill}
                          stroke={circleStroke}
                          onMouseEnter={event => {
                            handleMouseEnter({ event, datum });
                          }}
                          onMouseLeave={handleMouseLeave}
                        />
                      );
                    })}
                </g>
              );
            }}
          </Chart>
        )}
      </LoadGeometry>
    );
  }
}

export default Pindrop;
