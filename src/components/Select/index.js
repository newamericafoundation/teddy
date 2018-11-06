import React from "react";
import "./Select.scss";

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = { value: this.props.selected || "" };
  }

  onSelectChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
  }

  render() {
    const {
      options,
      selected,
      onChange,
      className,
      ...otherProps
    } = this.props;
    return (
      <select
        onChange={this.onSelectChange}
        value={this.state.value}
        className={`dv-select ${className || ""}`}
        {...otherProps}
      >
        {options.map((option, i) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}
