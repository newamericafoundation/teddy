import React from "react";

class MapPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  handleMouseEnter(e) {
    const isActive = true;
    const d = this.props.d;
    const mousePos = [e.pageX, e.pageY];
    this.setState({
      isActive: true
    });
    this.props.showTooltip(isActive, d, mousePos);
  }

  handleMouseLeave() {
    const isActive = false;
    this.setState({ isActive });
    this.props.hideTooltip(isActive);
  }

  render() {
    return (
      <circle
        cx={this.props.x}
        cy={this.props.y}
        r="5"
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        fill="#2ebcb3"
        strokeWidth={this.state.isActive ? 2 : 1}
        stroke="#ffffff"
      />
    );
  }
}

export default MapPin;
