import React from "react";
import ContentArea from "./ContentArea";
import TimelineControl from "./TimelineControl";
import "./Timeline.scss";

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeData: {
        title: "",
        description: "",
        date: "",
        tags: "test, test"
      }
    };
    this.updatePoint = this.updatePoint.bind(this);
  }

  componentDidMount() {
    fetch(
      "http://na-data-projects.s3.amazonaws.com/data/isp/proxy_warfare.json"
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ data: data.timeline, activeData: data.timeline[0] });
      });
  }

  updatePoint = newData => {
    this.setState({ activeData: newData });
  };

  render() {
    const title = "test";
    const { activeData } = this.state;
    return (
      <div className="dv-Timeline">
        <div className="dv-Timeline__container">
          <h1 className="dv-Timeline__title col-5" id="dv-Timeline__title">
            {title}
          </h1>
          <ContentArea data={activeData} />
          <TimelineControl onChange={this.updatePoint} />
        </div>
      </div>
    );
  }
}
