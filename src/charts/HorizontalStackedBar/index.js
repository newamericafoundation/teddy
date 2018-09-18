import React from "react";
import ChartContainer from "../../components/ChartContainer";
import { BarStackHorizontal } from "@vx/shape";
import { ParentSize } from "@vx/responsive";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { LegendOrdinal } from "@vx/legend";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { localPoint } from "@vx/event";
import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { max } from "d3-array";
import { colors as naColors } from "../../lib/colors";

const HorizontalStackedBarChart = withTooltip(props => {
  const handleMouseOver = (event, datum) => {
    if (props.showTooltip) {
      const coords = localPoint(event.target.ownerSVGElement, event);
      props.showTooltip({
        tooltipLeft: coords.x,
        tooltipTop: coords.y,
        tooltipData: datum
      });
    }
  };

  const margin = props.margin || {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
  };
  const {
    data,
    title,
    subtitle,
    source,
    height,
    y,
    keys,
    xScale,
    yScale,
    zScale,
    xFormat,
    yFormat,
    xAxisLabel,
    yAxisLabel,
    colors,
    tooltipTemplate,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    hideTooltip,
    showTooltip
  } = props;

  const totals = data.reduce((acc, cur) => {
    const t = keys.reduce((total, key) => {
      total += +cur[key];
      return total;
    }, 0);
    acc.push(t);
    return acc;
  }, []);

  return (
    <ChartContainer
      title={title ? title : null}
      subtitle={subtitle ? subtitle : null}
      source={source ? source : null}
      height={height}
    >
      <ParentSize>
        {({ width, height }) => {
          // bounds
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          // scales
          const xScale =
            xScale ||
            scaleLinear({
              rangeRound: [0, xMax],
              domain: [0, max(totals)],
              nice: true
            });
          const yScale =
            yScale ||
            scaleBand({
              rangeRound: [yMax, 0],
              domain: data.map(y),
              padding: 0.2
            });
          const zScale =
            zScale ||
            scaleOrdinal({
              domain: keys,
              range: colors
            });

          return (
            <React.Fragment>
              <svg width={width} height={height}>
                <Group top={margin.top} left={margin.left}>
                  <BarStackHorizontal
                    data={data}
                    keys={keys}
                    height={yMax}
                    y={y}
                    xScale={xScale}
                    yScale={yScale}
                    zScale={zScale}
                    onMouseLeave={data => event => {
                      hideTooltip();
                    }}
                    onMouseMove={data => event => {
                      handleMouseOver(event, data);
                    }}
                  />
                  <AxisLeft
                    hideAxisLine={true}
                    hideTicks={true}
                    scale={yScale}
                    stroke={naColors.grey.dark}
                    tickStroke={naColors.grey.dark}
                    tickFormat={yFormat ? yFormat : null}
                    label={yAxisLabel ? yAxisLabel : null}
                    tickLabelProps={(value, index) => ({
                      fill: naColors.grey.dark,
                      fontSize: 12,
                      width: margin.left,
                      textAnchor: "end",
                      verticalAnchor: "middle"
                    })}
                  />
                  <AxisBottom
                    scale={xScale}
                    top={yMax}
                    stroke={naColors.grey.dark}
                    numTicks={width - margin.left - margin.right < 300 ? 5 : 10}
                    tickStroke={naColors.grey.dark}
                    tickFormat={xFormat ? xFormat : null}
                    label={xAxisLabel ? xAxisLabel : null}
                    tickLabelProps={(value, index) => ({
                      fill: naColors.grey.dark,
                      fontSize: 12,
                      textAnchor: "middle"
                    })}
                  />
                </Group>
                {props.children}
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "14px"
                }}
              >
                <LegendOrdinal
                  scale={zScale}
                  direction="row"
                  labelMargin="0 15px 0 0"
                />
              </div>
              {tooltipOpen && (
                <TooltipWithBounds
                  top={tooltipTop}
                  left={tooltipLeft}
                  className="tooltip"
                >
                  <div className="tooltip__content-container">
                    {tooltipTemplate(tooltipData)}
                  </div>
                </TooltipWithBounds>
              )}
            </React.Fragment>
          );
        }}
      </ParentSize>
    </ChartContainer>
  );
});

export default HorizontalStackedBarChart;
