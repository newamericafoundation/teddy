import React from "react";
import "./ButtonGroup.scss";

export default class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ active: e.target.id });
    this.props.onChange(e);
  }

  render() {
    const { options } = this.props;
    const { active } = this.state;
    return (
      <div className="dv-btn-group" role="group">
        {options.map(option => (
          <button
            type="button"
            className={`dv-btn ${active === option.id ? "dv-btn-active" : ""}`}
            onClick={this.handleClick}
            id={option.id}
          >
            {option.text}
          </button>
        ))}
      </div>
    );
  }
}
