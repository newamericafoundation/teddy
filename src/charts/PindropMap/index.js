import React from "react";
import ChartContainer from "../../components/ChartContainer";
import BaseMap from "../../components/BaseMap";
import Tooltip from "../../components/Tooltip";
import MapPin from "./MapPin";

class PindropMap extends React.Component {
  constructor(props) {
    super(props);
    // set initial state to empty values, will update once the BaseMap component fetches topojson data
    this.state = {
      projection: () => [0, 0],
      mousePos: [0, 0],
      d: this.props.data[0]
    };
  }

  projectionInit(projection) {
    this.setState({ projection });
  }

  showTooltip(isActive, d, mousePos) {
    this.setState({
      isActive,
      d,
      mousePos
    });
  }

  hideTooltip(isActive) {
    this.setState({ isActive });
  }

  render() {
    const lon = this.props.lon || "lon";
    const lat = this.props.lat || "lat";
    const {
      data,
      title,
      subtitle,
      source,
      geometry,
      width,
      height,
      tooltipTemplate
    } = this.props;
    const { projection, isActive, d, mousePos } = this.state;
    return (
      <ChartContainer title={title} subtitle={subtitle} source={source}>
        <BaseMap
          geometry={geometry}
          width={width}
          height={height}
          projectionInit={this.projectionInit.bind(this)}
        >
          {data.map((d, i) => (
            <MapPin
              x={projection([+d[lon], +d[lat]])[0]}
              y={projection([+d[lon], +d[lat]])[1]}
              d={d}
              key={i}
              showTooltip={this.showTooltip.bind(this)}
              hideTooltip={this.hideTooltip.bind(this)}
            />
          ))}
        </BaseMap>
        {tooltipTemplate ? (
          <Tooltip
            d={d}
            mousePos={mousePos}
            isActive={isActive}
            tooltipTemplate={tooltipTemplate}
          />
        ) : null}
      </ChartContainer>
    );
  }
}
export default PindropMap;
