import React from "react";
import PropTypes from "prop-types";
import "./CheckboxGroup.scss";

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.options.forEach(val => {
      this.state[val.id] = val.checked ? true : false;
    });
    this.handleChange = this.handleChange.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.id]: e.target.checked
      },
      () => this.props.onChange(this.state)
    );
  }

  deselectAll() {
    const options = Object.keys(this.state);
    const newState = {};
    options.forEach(option => {
      newState[option] = false;
    });
    this.setState(newState, () => this.props.onChange(this.state));
  }

  render() {
    const { orientation, options, deselectButton, style, title } = this.props;
    return (
      <div
        className={`dv-Checkbox__container ${
          orientation === "vertical"
            ? "dv-Checkbox__container-vertical"
            : orientation === "horizontal"
            ? "dv-Checkbox__container-horizontal"
            : ""
        }`}
        style={{ ...style }}
      >
        {title ? <span className="dv-Checkbox__title">{title}</span> : null}
        {options.map((option, i) => (
          <div className="dv-Checkbox" key={i}>
            <input
              id={option.id}
              type="checkbox"
              checked={this.state[option.id]}
              onChange={this.handleChange}
            />
            <label htmlFor={option.id} className="dv-Checkbox__label">
              {option.label}
            </label>
          </div>
        ))}
        {deselectButton ? (
          <div>
            <button
              className="dv-Checkbox__deselect"
              onClick={this.deselectAll}
            >
              Deselect All
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      checked: PropTypes.bool
    })
  ).isRequired,
  /**
   * This function will receive an object with all checkbox values.
   */
  onChange: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * If set to true, adds a button that lets the user deselect all checkboxes at once.
   */
  deselectButton: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string
};

CheckboxGroup.defaultProps = {
  orientation: "vertical",
  deselectButton: false
};

export default CheckboxGroup;
