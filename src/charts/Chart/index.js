import React from "react";
import { ParentSize } from "@vx/responsive";
import WithTooltip from "./WithTooltip";
import "./Chart.scss";

const Chart = ({
  maxWidth = "100%",
  height = 600,
  renderTooltip,
  renderLegend,
  children,
  ...rest
}) => {
  if (renderTooltip) {
    return (
      <WithTooltip renderTooltip={renderTooltip}>
        {({ handleMouseEnter, handleMouseLeave, tooltipOpen }) => (
          <Chart
            maxWidth={maxWidth}
            height={height}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            tooltipOpen={tooltipOpen}
            renderTooltip={null}
            renderLegend={renderLegend}
          >
            {children}
          </Chart>
        )}
      </WithTooltip>
    );
  } else {
    return (
      <div style={{ maxWidth: maxWidth, height }} className="dv-Chart">
        {renderLegend && (
          <div className="dv-legend-container">{renderLegend()}</div>
        )}
        <ParentSize>
          {({ width, height }) => {
            if (width < 10) return;
            return (
              <svg width={width} height={height}>
                {children({ width, height, ...rest })}
              </svg>
            );
          }}
        </ParentSize>
      </div>
    );
  }
};

export default Chart;
