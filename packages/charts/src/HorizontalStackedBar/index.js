import React from "react";
import PropTypes from "prop-types";
import { BarStackHorizontal } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { GridColumns } from "@vx/grid";
import { max } from "d3-array";

const HorizontalStackedBar = ({
  width,
  height,
  handleMouseMove,
  handleMouseLeave,
  data,
  y,
  yFormat,
  xFormat,
  yAxisLabel,
  xAxisLabel,
  numTicksX,
  keys,
  colors,
  margin
}) => {
  const totals = data.reduce((acc, cur) => {
    const t = keys.reduce((total, key) => {
      total += +cur[key];
      return total;
    }, 0);
    acc.push(t);
    return acc;
  }, []);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors
  });
  const xScale = scaleLinear({
    rangeRound: [0, xMax],
    domain: [0, max(totals)],
    nice: true
  });
  const yScale = scaleBand({
    rangeRound: [yMax, 0],
    domain: data.map(y),
    padding: 0.2
  });

  return (
    <Group top={margin.top} left={margin.left}>
      <GridColumns
        scale={xScale}
        height={yMax}
        numTicks={
          typeof numTicksX === "function" ? numTicksX(width) : numTicksX
        }
      />
      <BarStackHorizontal
        data={data}
        keys={keys}
        height={yMax}
        y={y}
        xScale={xScale}
        yScale={yScale}
        color={colorScale}
      >
        {barStacks => {
          return barStacks.map(barStack =>
            barStack.bars.map(bar => (
              <rect
                key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={bar.color}
                onMouseLeave={handleMouseLeave ? handleMouseLeave : null}
                onMouseMove={event =>
                  handleMouseMove
                    ? handleMouseMove({ event, data, datum: bar })
                    : null
                }
              />
            ))
          );
        }}
      </BarStackHorizontal>
      <AxisLeft
        scale={yScale}
        hideAxisLine={false}
        hideTicks={false}
        tickFormat={yFormat}
        label={yAxisLabel}
        tickLabelProps={() => ({
          width: margin.left,
          textAnchor: "end",
          verticalAnchor: "middle",
          dx: "-0.3em"
        })}
      />
      <AxisBottom
        scale={xScale}
        top={yMax}
        hideAxisLine={true}
        hideTicks={true}
        numTicks={
          typeof numTicksX === "function" ? numTicksX(width) : numTicksX
        }
        tickFormat={xFormat}
        tickLabelProps={() => ({
          textAnchor: "middle",
          verticalAnchor: "end"
        })}
        label={xAxisLabel}
        labelProps={{
          dy: "2.5em",
          textAnchor: "middle",
          verticalAnchor: "start"
        }}
      />
    </Group>
  );
};

HorizontalStackedBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  data: PropTypes.array.isRequired,
  /**
   * Accessor function for y axis values
   */
  y: PropTypes.func.isRequired,
  /**
   * An array of strings with the column keys of each bar
   */
  keys: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  numTicksX: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

HorizontalStackedBar.defaultProps = {
  margin: {
    top: 10,
    left: 60,
    right: 40,
    bottom: 40
  }
};

export default HorizontalStackedBar;
