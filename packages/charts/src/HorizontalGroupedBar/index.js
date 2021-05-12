import React from "react";
import PropTypes from "prop-types";
import { BarGroupHorizontal } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { GridColumns } from "@vx/grid";
import { max } from "d3-array";

const HorizontalGroupedBar = ({
  width,
  height,
  handleMouseMove,
  handleMouseLeave,
  data,
  y,
  keys,
  xFormat,
  yFormat,
  xAxisLabel,
  yAxisLabel,
  numTicksX,
  colors,
  margin
}) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors
  });
  const y0Scale = scaleBand({
    rangeRound: [0, yMax],
    domain: data.map(y),
    padding: 0.2
  });
  const y1Scale = scaleBand({
    rangeRound: [0, y0Scale.bandwidth()],
    domain: keys,
    padding: 0.1
  });
  const xScale = scaleLinear({
    rangeRound: [0, xMax],
    domain: [
      0,
      max(data, d => {
        return max(keys, key => d[key]);
      })
    ]
  });

  return (
    <Group top={margin.top} left={margin.left}>
      <GridColumns scale={xScale} width={xMax} numTicks={numTicksX} />
      <BarGroupHorizontal
        data={data}
        keys={keys}
        width={xMax}
        y0={y}
        y0Scale={y0Scale}
        y1Scale={y1Scale}
        xScale={xScale}
        color={colorScale}
      >
        {barGroups => {
          return barGroups.map(barGroup => {
            return (
              <Group
                key={`bar-group-${barGroup.index}-${barGroup.y0}`}
                top={barGroup.y0}
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
                          ? handleMouseMove({ event, data, datum: bar, index: barGroup.index })
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
      </BarGroupHorizontal>
      <AxisBottom
        top={yMax}
        scale={xScale}
        hideTicks={true}
        hideAxisLine={true}
        numTicks={numTicksX}
        tickFormat={xFormat}
        tickLabelProps={(value, index) => ({
          textAnchor: "middle",
          verticalAnchor: "middle"
        })}
        label={xAxisLabel}
        labelProps={{
          dy: "3em",
          textAnchor: "middle",
          y: 0
        }}
      />
      <AxisLeft
        scale={y0Scale}
        label={yAxisLabel}
        hideAxisLine={true}
        hideTicks={true}
        tickFormat={yFormat}
        tickLabelProps={() => ({
          textAnchor: "end",
          height: y0Scale.bandwidth(),
          verticalAnchor: "middle"
        })}
        labelProps={{
          textAnchor: "middle",
          verticalAnchor: "end"
        }}
      />
    </Group>
  );
};

HorizontalGroupedBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  tooltipOpen: PropTypes.bool,
  data: PropTypes.array.isRequired,
  /**
   * Accessor function for x axis values
   */
  y: PropTypes.func.isRequired,
  /**
   * An array of strings with the keys for each bar
   */
  keys: PropTypes.array.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  numTicksX: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  colors: PropTypes.array.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

HorizontalGroupedBar.defaultProps = {
  numTicksX: 5,
  margin: {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
  }
};

export default HorizontalGroupedBar;
