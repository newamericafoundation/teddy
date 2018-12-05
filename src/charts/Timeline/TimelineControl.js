import React from "react";
import Draggable from "react-draggable";
import { scaleTime } from "@vx/scale";
import { Axis } from "@vx/axis";
import { Group } from "@vx/group";
import { GridColumns } from "@vx/grid";
import { ParentSize } from "@vx/responsive";
import { timeYear } from "d3-time";

export default ({
  divisionWidth,
  minDate,
  maxDate,
  data,
  activePoint,
  onChange
}) => {
  const count = timeYear.count(minDate, maxDate);
  const scrubberWidth = divisionWidth * count;
  const scale = scaleTime({
    domain: [minDate, maxDate],
    range: [20, scrubberWidth - 100]
  });
  return (
    <div
      style={{
        overflowX: "hidden",
        margin: "0 0.5rem",
        position: "relative"
      }}
    >
      <ParentSize>
        {({ width }) => (
          <Draggable
            axis="x"
            bounds={{
              left: width - scrubberWidth,
              right: 0,
              top: 0,
              bottom: 0
            }}
            defaultPosition={{ x: 0, y: 0 }}
          >
            <div
              style={{
                width: scrubberWidth,
                cursor: "col-resize",
                position: "relative"
              }}
            >
              <svg height="140" width={scrubberWidth}>
                <Group>
                  <Group top={70}>
                    <rect
                      x={0}
                      y={0}
                      height={70}
                      width={scrubberWidth}
                      fill="#DBDBDB"
                    />
                    <Axis
                      top={35}
                      scale={scale}
                      hideAxisLine={true}
                      hideTicks={true}
                      tickLabelProps={(val, i) => ({
                        dy: "0.35em",
                        fontFamily: "Circular",
                        textAnchor: "middle",
                        fontSize: "15px"
                      })}
                    />
                  </Group>
                  <Group top={0}>
                    <rect
                      x={0}
                      y={0}
                      height={70}
                      width={scrubberWidth}
                      fill="#EBEBEB"
                    />
                    <GridColumns scale={scale} height={70} stroke="#A6A6A6" />
                    {data.map((val, i) => {
                      return (
                        <circle
                          cx={scale(val.date)}
                          cy={70}
                          r={val.id === activePoint ? 8 : 5}
                          fill={val.id === activePoint ? "#2DD1AC" : "#fff"}
                          stroke="#A6A6A6"
                          strokeWidth={4}
                          key={i}
                          onClick={() => onChange(val.id)}
                          style={{ cursor: "pointer" }}
                          data={val}
                        />
                      );
                    })}
                  </Group>
                </Group>
              </svg>
            </div>
          </Draggable>
        )}
      </ParentSize>
    </div>
  );
};
