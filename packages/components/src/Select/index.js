import React from "react";
import PropTypes from "prop-types";
import "./Select.scss";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = { value: this.props.selected || "" };
  }

  onSelectChange(e) {
    this.setState(
      {
        value: e.target.value
      },
      () => this.props.onChange(this.state.value)
    );
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

Select.propTypes = {
  /**
   * This function will receive the current value of the select dropdown.
   */
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  className: PropTypes.string
};

export default Select;
