import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { LinePath } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { scaleLinear } from "@vx/scale";
import { curveBasis } from "@vx/curve";
import { GridRows } from "@vx/grid";
import { localPoint } from "@vx/event";
import { bisector, max, extent } from "d3-array";
import Chart from "../Chart";
import HoverLine from "./HoverLine";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove = ({
    data,
    event,
    tooltipParentFunc,
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    margin
  }) => {
    const bisect = bisector(xAccessor).left;
    let { x } = localPoint(event.target.ownerSVGElement, event);
    x = x - margin.left;
    const x0 = xScale.invert(x);
    const index = bisect(data, x0);
    if (index > data.length - 1 || index < 1) return;
    const d0 = data[index - 1];
    const d1 = data[index];
    const d = x0 - xScale(xAccessor(d0)) > xScale(xAccessor(d1)) - x0 ? d1 : d0;
    const xPos = xScale(xAccessor(d));
    const yPos = yScale(yAccessor(d));
    tooltipParentFunc({
      datum: d,
      coords: { x: xPos + margin.left, y: yPos + margin.top }
    });
    this.setState({ x: xPos, y: yPos });
  };

  render() {
    const {
      maxWidth,
      height,
      aspectRatio,
      renderTooltip,
      renderAnnotation,
      data,
      x,
      y,
      xAxisLabel,
      yAxisLabel,
      yFormat,
      xFormat,
      numTicksX,
      numTicksY,
      margin,
      stroke,
      strokeWidth
    } = this.props;

    return (
      <Chart
        maxWidth={maxWidth}
        height={height}
        aspectRatio={aspectRatio}
        renderTooltip={renderTooltip}
        renderAnnotation={renderAnnotation}
      >
        {({
          width,
          height,
          handleMouseEnter,
          handleMouseLeave,
          tooltipOpen
        }) => {
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const xScale = scaleLinear({
            domain: extent(data, x),
            range: [0, xMax]
          });

          const yScale = scaleLinear({
            domain: [0, max(data, y)],
            range: [yMax, 0]
          });
          return (
            <Group top={margin.top} left={margin.left}>
              <GridRows scale={yScale} width={xMax} numTicks={numTicksY} />
              <LinePath
                data={data}
                x={d => xScale(x(d))}
                y={d => yScale(y(d))}
                stroke={stroke}
                strokeWidth={strokeWidth}
                curve={curveBasis}
              />
              <rect
                x={0}
                y={0}
                width={xMax}
                height={yMax}
                fill="transparent"
                onMouseMove={event => {
                  renderTooltip
                    ? this.handleMouseMove({
                        event,
                        data,
                        xScale,
                        yScale,
                        margin,
                        xAccessor: x,
                        yAccessor: y,
                        tooltipParentFunc: handleMouseEnter
                      })
                    : null;
                }}
                onMouseLeave={renderTooltip ? handleMouseLeave : null}
              />
              {tooltipOpen && (
                <HoverLine
                  top={0}
                  bottom={yMax}
                  tooltipLeft={this.state.x}
                  tooltipTop={this.state.y}
                />
              )}
              <AxisLeft
                scale={yScale}
                hideTicks={true}
                hideAxisLine={true}
                tickFormat={yFormat}
                numTicks={numTicksY}
                tickLabelProps={() => ({
                  textAnchor: "end",
                  verticalAnchor: "middle"
                })}
                label={yAxisLabel}
                labelProps={{
                  textAnchor: "middle",
                  verticalAnchor: "end"
                }}
              />
              <AxisBottom
                scale={xScale}
                top={yMax}
                tickFormat={xFormat}
                numTicks={
                  typeof numTicksX === "function" ? numTicksX(width) : numTicksX
                }
                tickLabelProps={() => ({
                  textAnchor: "middle",
                  verticalAnchor: "middle"
                })}
                tickFormat={d => d}
                label={xAxisLabel}
                labelProps={{
                  dy: "2.5em",
                  textAnchor: "middle",
                  verticalAnchor: "start"
                }}
              />
            </Group>
          );
        }}
      </Chart>
    );
  }
}

LineChart.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  aspectRatio: PropTypes.number,
  renderTooltip: PropTypes.func,
  renderAnnotation: PropTypes.func,
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  /**
   * You can specify the number of y axis ticks directly, or pass in a function which will receive the chart's computed height as an argument.
   */
  numTicksY: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * You can specify the number of x axis ticks directly, or pass in a function which will receive the chart's computed width as an argument.
   */
  numTicksX: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

LineChart.defaultProps = {
  numTicksX: 10,
  numTicksY: 5,
  stroke: "#22C8A3",
  strokeWidth: 2,
  margin: { top: 10, left: 55, bottom: 30, right: 10 }
};

export default LineChart;
