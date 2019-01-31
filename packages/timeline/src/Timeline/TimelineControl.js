import React from "react";
import Draggable from "react-draggable";
import { scaleTime } from "@vx/scale";
import { Axis } from "@vx/axis";
import { Group } from "@vx/group";
import { GridColumns } from "@vx/grid";
import { ParentSize } from "@vx/responsive";
import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { debounce } from "debounce";
import { timeYear } from "d3-time";
import dodge from "./dodge";

class TimelineControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { xDragPos: 0, dragging: false, instructionsHidden: false };
    this.width = null;
    this.count = timeYear.count(this.props.minDate, this.props.maxDate);
    this.scrubberWidth = this.props.divisionWidth * this.count;
    this.scale = scaleTime({
      domain: [this.props.minDate, this.props.maxDate],
      range: [20, this.scrubberWidth - 100]
    });
    this._data = dodge(this.props.data, 14, d => d.date, this.scale);
    this.lastActiveX = this._data[this.props.activePoint].x;
    this.showTooltipDebounced = debounce(this.handleMouseOver, 300);
    this.dragStarted = this.dragStarted.bind(this);
    this.dragEnded = this.dragEnded.bind(this);
  }

  componentWillReceiveProps({ data, activePoint }) {
    // data array length is probably a bad heuristic to check if the data has changed, but i dont wanna do a deep equal
    if (data.length !== this.props.data.length) {
      this._data = dodge(data, 14, d => d.date, this.scale);
    }
    const activeX = this._data[activePoint].x;
    if (activeX === this.lastActiveX) {
      return;
    } else {
      this.lastActiveX = activeX;
    }
    const { xDragPos } = this.state;
    if (activeX > this.width - xDragPos) {
      this.setState({ xDragPos: -(activeX - this.width) - 20 });
    } else if (activeX < -xDragPos) {
      this.setState({ xDragPos: -activeX + 20 });
    }
  }

  handleMouseOver = (e, d) => {
    const coords = localPoint(e.target.ownerSVGElement, e);
    this.props.showTooltip({
      tooltipLeft: coords.x + this.state.xDragPos,
      tooltipTop: coords.y,
      tooltipData: d
    });
  };

  showTooltip = (e, d) => {
    e.persist();
    if (this.state.dragging) {
      return;
    }
    this.showTooltipDebounced(e, d);
  };

  dragStarted = () => {
    this.setState({ dragging: true, instructionsHidden: true });
  };

  dragEnded = pos => {
    this.setState({ xDragPos: pos, dragging: false });
  };

  render() {
    const {
      activePoint,
      onChange,
      tooltipData,
      tooltipLeft,
      tooltipTop,
      tooltipOpen,
      hideTooltip
    } = this.props;
    const { xDragPos, dragging, instructionsHidden } = this.state;
    return (
      <div
        className={`dv-TimelineControl-container ${
          instructionsHidden ? "hidden" : ""
        }`}
      >
        <ParentSize>
          {({ width }) => {
            if (width < 10) return null;
            this.width = width;
            return (
              <Draggable
                axis="x"
                bounds={{
                  left: width - this.scrubberWidth,
                  right: 0,
                  top: 0,
                  bottom: 0
                }}
                position={{ x: xDragPos, y: 0 }}
                defaultPosition={{ x: 0, y: 0 }}
                onStart={this.dragStarted}
                onStop={(e, d) => {
                  this.dragEnded(d.x);
                }}
              >
                <div
                  style={{
                    width: this.scrubberWidth,
                    cursor: dragging ? "grabbing" : "grab",
                    position: "relative"
                  }}
                >
                  <svg height="140" width={this.scrubberWidth}>
                    <Group>
                      <Group top={70}>
                        <rect
                          x={0}
                          y={0}
                          height={70}
                          width={this.scrubberWidth}
                          fill="#DBDBDB"
                        />
                        <Axis
                          top={35}
                          scale={this.scale}
                          hideAxisLine={true}
                          hideTicks={true}
                          tickLabelProps={(val, i) => ({
                            y: 0,
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
                          width={this.scrubberWidth}
                          fill="#EBEBEB"
                        />
                        <GridColumns
                          scale={this.scale}
                          height={70}
                          stroke="#A6A6A6"
                        />
                        {this._data.map((val, i) => {
                          return (
                            <circle
                              cx={val.x}
                              cy={val.y + 35}
                              r={val.id === activePoint ? 8 : 5}
                              fill={val.id === activePoint ? "#2DD1AC" : "#fff"}
                              stroke="#A6A6A6"
                              strokeWidth={4}
                              key={i}
                              onClick={() => onChange(val.id)}
                              onMouseOver={e => this.showTooltip(e, val.title)}
                              onMouseOut={() => setTimeout(hideTooltip, 300)}
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
            );
          }}
        </ParentSize>
        {tooltipOpen && (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            className="dv-TimelineControl-Tooltip"
            style={{
              borderRadius: 0,
              color: "#fff",
              backgroundColor: "#333",
              padding: "10px"
            }}
          >
            {tooltipData}
          </TooltipWithBounds>
        )}
      </div>
    );
  }
}

export default withTooltip(TimelineControl);
