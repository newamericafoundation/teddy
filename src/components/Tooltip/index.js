import React from "react";
import "./Tooltip.scss";

const body = document.querySelector("body");

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  getTooltipCoords(mouse) {
    if (this.tooltip) {
      let retCoords = mouse;
      let windowWidth = window.innerWidth;
      let tooltipHeight = this.tooltip.offsetHeight;
      let tooltipWidth = this.tooltip.offsetWidth;
      let xPadding = 15;

      if (mouse[0] > windowWidth - tooltipWidth - xPadding) {
        retCoords[0] = mouse[0] - tooltipWidth - 50;
        retCoords[0] -= xPadding;
      } else {
        retCoords[0] += xPadding;
      }

      retCoords[1] -= tooltipHeight / 2 + 15;
      return retCoords;
    } else {
      return [0, 0];
    }
  }

  render() {
    const { isActive, d, mousePos, tooltipTemplate } = this.props;

    return ReactDOM.createPortal(
      <div
        className={isActive ? "tooltip" : "tooltip hidden"}
        ref={tooltip => (this.tooltip = tooltip)}
        style={{
          top: `${this.getTooltipCoords(mousePos)[1]}px`,
          left: `${this.getTooltipCoords(mousePos)[0]}px`
        }}
      >
        <div className="tooltip__content-container">{tooltipTemplate(d)}</div>
      </div>,
      body
    );
  }
}

export default Tooltip;
