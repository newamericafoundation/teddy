import React from "react";
import { Chart } from "@newamerica/charts";
import { hexgrid } from "d3-hexgrid";
import LoadGeometry from "../LoadGeometry";
import Projection from "../Projection";

class Hexgrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projectionFunc: null, pathFunc: null };
    this.projectionFunc = this.projectionFunc.bind(this);
    this.pathFunc = this.pathFunc.bind(this);
  }

  projectionFunc = projectionFunc => {
    this.setState({ projectionFunc });
  };

  pathFunc = pathFunc => {
    this.setState({ pathFunc });
  };

  genHexgrid = (projection, path) => {
    const grid = hexgrid()
    .extent([width, height])
    .geography(geo)
    .pathGenerator(geoPath)
    .projection(projection)
    .hexRadius(5);

  }

  render() {
    const { maxWidth, height, data, geometry, projection } = this.props;
    const { projectionFunc, pathFunc } = this.state;
    return (
      <LoadGeometry>
        {feature => (
          <Chart>
            {({ width, height, handleMouseEnter, handleMouseLeave }) => {
              return (
                <Projection
                  projection={projection}
                  data={feature.features}
                  fitSize={[[width, height], feature]}
                  projectionFunc={this.projectionFunc}
                  pathFunc={this.pathFunc}
                />
                {projectionFunc && pathFunc && this.genHexgrid(projectionFunc, pathFunc)}
              );
            }}
          </Chart>
        )}
      </LoadGeometry>
    );
  }
}
