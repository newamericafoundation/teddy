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
    this.selectAll = this.selectAll.bind(this);
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

  selectAll() {
    const options = Object.keys(this.state);
    const newState = {};
    options.forEach(option => {
      newState[option] = true;
    });
    this.setState(newState, () => this.props.onChange(this.state));
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
    const { orientation, options, selectButtons, style, title } = this.props;
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
        {selectButtons ? (
          <div>
            <button className="dv-Checkbox__select" onClick={this.selectAll}>
              Select All
            </button>
            <span className="dv-Checkbox__bullet" />
            <button className="dv-Checkbox__select" onClick={this.deselectAll}>
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
   * If true, adds buttons that let the user select and deselect all checkboxes at once.
   */
  selectButtons: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string
};

CheckboxGroup.defaultProps = {
  orientation: "vertical",
  selectButtons: false
};

export default CheckboxGroup;
