import React from "react";
import PropTypes from "prop-types";
import { BarGroup } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { GridRows } from "@vx/grid";
import { max } from "d3-array";

const VerticalGroupedBar = ({
  width,
  height,
  handleMouseMove,
  handleMouseLeave,
  data,
  x,
  keys,
  xFormat,
  yFormat,
  xAxisLabel,
  yAxisLabel,
  numTicksY,
  colors,
  margin
}) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors
  });
  const x0Scale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.2
  });
  const x1Scale = scaleBand({
    rangeRound: [0, x0Scale.bandwidth()],
    domain: keys,
    padding: 0.1
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [
      0,
      max(data, d => {
        return max(keys, key => d[key]);
      })
    ]
  });

  return (
    <Group top={margin.top} left={margin.left}>
      <GridRows scale={yScale} width={xMax} numTicks={numTicksY} />
      <BarGroup
        data={data}
        keys={keys}
        height={yMax}
        x0={x}
        x0Scale={x0Scale}
        x1Scale={x1Scale}
        yScale={yScale}
        color={colorScale}
      >
        {barGroups => {
          return barGroups.map(barGroup => {
            return (
              <Group
                key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                left={barGroup.x0}
              >
                {barGroup.bars.map(bar => {
                  return (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}-${
                        bar.value
                      }-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      onMouseMove={event =>
                        handleMouseMove
                          ? handleMouseMove({ event, data, datum: bar })
                          : null
                      }
                      onMouseLeave={handleMouseLeave ? handleMouseLeave : null}
                    />
                  );
                })}
              </Group>
            );
          });
        }}
      </BarGroup>
      <AxisLeft
        scale={yScale}
        hideTicks={true}
        hideAxisLine={true}
        numTicks={numTicksY}
        tickFormat={yFormat}
        tickLabelProps={(value, index) => ({
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
        top={yMax}
        scale={x0Scale}
        label={xAxisLabel}
        hideAxisLine={false}
        hideTicks={false}
        tickFormat={xFormat}
        tickLabelProps={() => ({
          textAnchor: "middle",
          width: x0Scale.bandwidth(),
          verticalAnchor: "middle"
        })}
        labelProps={{
          dy: "3em",
          textAnchor: "middle",
          y: 0
        }}
      />
    </Group>
  );
};

VerticalGroupedBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  tooltipOpen: PropTypes.bool,
  data: PropTypes.array.isRequired,
  /**
   * Accessor function for x axis values
   */
  x: PropTypes.func.isRequired,
  /**
   * An array of strings with the keys for each bar
   */
  keys: PropTypes.array.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  numTicksY: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  colors: PropTypes.array.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

VerticalGroupedBar.defaultProps = {
  numTicksY: 5,
  margin: {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
  }
};

export default VerticalGroupedBar;
