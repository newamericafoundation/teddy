import React from "react";
import { ParentSize } from "@vx/responsive";
import { Group } from "@vx/group";
import { LinePath } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { scaleLinear } from "@vx/scale";
import { curveBasis } from "@vx/curve";
import { GridRows } from "@vx/grid";
import { localPoint } from "@vx/event";
import { bisector } from "d3-array";
import Chart from "../Chart";
import HoverLine from "./HoverLine";

class Line extends React.Component {
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
      coords: { x: xPos + 30, y: yPos + 10 }
    });
    this.setState({ x: xPos, y: yPos });
  };

  render() {
    const {
      maxWidth,
      height,
      data,
      x,
      y,
      xAxisLabel,
      yAxisLabel,
      yFormat,
      xFormat,
      numTicksX = 10,
      numTicksY = 5,
      renderTooltip,
      margin = { top: 10, left: 50, bottom: 50, right: 10 },
      stroke = "#22C8A3",
      strokeWidth = 2
    } = this.props;

    return (
      <Chart maxWidth={maxWidth} height={height} renderTooltip={renderTooltip}>
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
            domain: [Math.min(...data.map(x)), Math.max(...data.map(x))],
            range: [0, xMax]
          });
          const yScale = scaleLinear({
            domain: [0, Math.max(...data.map(y))],
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
                  this.handleMouseMove({
                    event,
                    data,
                    xScale,
                    yScale,
                    margin,
                    xAccessor: x,
                    yAccessor: y,
                    tooltipParentFunc: handleMouseEnter
                  });
                }}
                onMouseLeave={handleMouseLeave}
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
                  dx: "0.5em",
                  textAnchor: "middle"
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
                  dy: "1.8em",
                  textAnchor: "middle",
                  y: 0
                })}
                tickFormat={d => d}
                label={xAxisLabel}
                labelProps={{
                  dy: "3.5em",
                  textAnchor: "middle"
                }}
              />
            </Group>
          );
        }}
      </Chart>
    );
  }
}

export default Line;
