import React from "react";
import ContentArea from "./ContentArea";
import TimelineControl from "./TimelineControl";
import { min, max, ascending } from "d3-array";
import "./Timeline.scss";

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this._data = this.props.data
      .sort((a, b) => ascending(a.date, b.date))
      .map((val, i) => ({ ...val, id: i }));
    this.state = {
      activeData: this._data[0]
    };
  }

  componentWillReceiveProps(nextProps) {
    this._data = nextProps.data
      .sort((a, b) => ascending(a.date, b.date))
      .map((val, i) => ({ ...val, id: i }));
    this.setState({ activeData: this._data[0] });
  }

  updatePoint = id => {
    this.setState({ activeData: this._data[id] });
  };

  render() {
    const { divisionWidth, title } = this.props;
    const { activeData } = this.state;
    const highestPoint = this._data.length - 1;
    const minDate = min(this._data, d => d.date);
    const maxDate = max(this._data, d => d.date);
    return (
      <div className="dv-Timeline">
        <div className="dv-Timeline__container">
          <h1 className="dv-Timeline__title" id="dv-Timeline__title">
            {title}
          </h1>
          {this.props.children}
          <ContentArea
            activeData={activeData}
            updatePoint={this.updatePoint}
            highestPoint={highestPoint}
          />
          <TimelineControl
            data={this._data}
            onChange={this.updatePoint}
            activePoint={activeData.id}
            divisionWidth={divisionWidth}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      </div>
    );
  }
}
