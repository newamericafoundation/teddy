// code from Chris Williams' data-ui: https://github.com/williaster/data-ui/blob/master/packages/shared/src/enhancer/WithTooltip.jsx

import React from "react";
import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { localPoint } from "@vx/event";

class WithTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.tooltipTimeout = null;
  }

  componentWillUnmount() {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
  }

  handleMouseEnter({ event, datum, coords, ...rest }) {
    const { showTooltip } = this.props;
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    let tooltipCoords = { x: 0, y: 0 };
    if (event && event.target && event.target.ownerSVGElement) {
      tooltipCoords = localPoint(event.target.ownerSVGElement, event);
    }

    tooltipCoords = { ...tooltipCoords, ...coords };

    showTooltip({
      tooltipLeft: tooltipCoords.x,
      tooltipTop: tooltipCoords.y,
      tooltipData: {
        event,
        datum,
        ...rest
      }
    });
  }

  handleMouseLeave() {
    const { hideTooltip } = this.props;
    this.tooltipTimeout = setTimeout(() => {
      hideTooltip();
    }, 200);
  }

  render() {
    const {
      children,
      tooltipData,
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      renderTooltip
    } = this.props;

    const { handleMouseEnter, handleMouseLeave } = this;

    const tooltipContent = tooltipOpen && renderTooltip(tooltipData);

    return (
      <React.Fragment>
        {children({ handleMouseEnter, handleMouseLeave, tooltipOpen })}
        {tooltipOpen && (
          <TooltipWithBounds
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              borderRadius: 0,
              boxShadow:
                "0 2px 5px 0 rgba(0, 0, 0, 0.15), 0 2px 10px 0 rgba(0, 0, 0, 0.1)"
            }}
          >
            {tooltipContent}
          </TooltipWithBounds>
        )}
      </React.Fragment>
    );
  }
}

export default withTooltip(WithTooltip);
