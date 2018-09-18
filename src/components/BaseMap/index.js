import React from "react";
import { geoPath, geoEqualEarth, geoAlbersUsa } from "d3-geo";
import { feature } from "topojson-client";

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { features: [] };
  }

  componentDidMount() {
    this.loadGeometry();
  }

  /*   
    Fetch topojson files based on the geometry prop, either "world" or "us"
    Creates a projection that is fit to the size of the SVG, sends it back up to the parent component, 
    and adds the path generator and feature collection from the topojson to state
  */

  loadGeometry() {
    if (this.props.geometry === "world") {
      let features, path;
      fetch(
        "https://s3-us-west-2.amazonaws.com/na-data-projects/geography/world.json"
      )
        .then(response => response.json())
        .then(world => {
          const projection = geoEqualEarth().fitSize(
            [this.props.width, this.props.height],
            feature(world, world.objects.countries)
          );
          this.props.projectionInit(projection);
          this.setState({
            features: feature(world, world.objects.countries).features,
            path: geoPath().projection(projection)
          });
        });
      return {
        features,
        path
      };
    } else if (this.props.geometry === "us") {
      fetch(
        "https://s3-us-west-2.amazonaws.com/na-data-projects/geography/us.json"
      )
        .then(response => response.json())
        .then(us => {
          const projection = geoAlbersUsa().fitSize(
            [this.props.width, this.props.height],
            feature(us, us.objects.states)
          );
          this.props.projectionInit(projection);
          this.setState({
            features: feature(us, us.objects.states).features,
            path: geoPath().projection(projection)
          });
        });
    }
  }

  render() {
    const { path, features } = this.state;
    return (
      <svg viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        <g className="geometry">
          {features.map((d, i) => (
            <path
              key={`path-${i}`}
              d={path(d)}
              fill="#CBCBCD"
              stroke="#FFFFFF"
            />
          ))}
        </g>
        <g className="data">{this.props.children}</g>
      </svg>
    );
  }
}
export default BaseMap;
