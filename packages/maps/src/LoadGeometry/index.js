import React from "react";
import { feature } from "topojson-client";

export default class LoadGeometry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feature: null
    };
  }
  async componentDidMount() {
    if (this.props.geometry === "world") {
      const response = await fetch(
        "https://s3-us-west-2.amazonaws.com/na-data-projects/geography/world.json"
      );
      const world = await response.json();
      this.setState({
        feature: feature(world, world.objects.countries)
      });
    } else if (this.props.geometry === "us") {
      const response = await fetch(
        "https://s3-us-west-2.amazonaws.com/na-data-projects/geography/us.json"
      );
      const us = await response.json();
      this.setState({
        feature: feature(us, us.objects.states)
      });
    }
  }
  render() {
    if (!this.state.feature) return null;
    return this.props.children(this.state.feature);
  }
}
