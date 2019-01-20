import React from "react";
import { ParentSize } from "@vx/responsive";
import WithTooltip from "./WithTooltip";
import "./Chart.scss";

const Chart = ({
  maxWidth = "100%",
  height,
  aspectRatio,
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
            aspectRatio={aspectRatio}
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
          {({ width, height: computedHeight }) => {
            if (width < 10) return;
            const chartHeight = height ? computedHeight : width * aspectRatio;
            return (
              <svg width={width} height={chartHeight}>
                {children({ width, height: chartHeight, ...rest })}
              </svg>
            );
          }}
        </ParentSize>
      </div>
    );
  }
};

export default Chart;
