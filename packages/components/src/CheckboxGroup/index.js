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
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.id]: e.target.checked
      },
      () => this.props.onChange(this.state)
    );
  }

  render() {
    const { orientation, options, style, title } = this.props;
    return (
      <div
        className={`dv-checkbox-container ${
          orientation === "vertical"
            ? "dv-checkbox-container-vertical"
            : orientation === "horizontal"
            ? "dv-checkbox-container-horizontal"
            : ""
        }`}
        style={{ ...style }}
      >
        {title ? (
          <span className="dv-checkbox-container__title">{title}</span>
        ) : null}
        {options.map((option, i) => (
          <div className="dv-checkbox" key={i}>
            <input
              id={option.id}
              type="checkbox"
              checked={this.state[option.id]}
              onChange={this.handleChange}
            />
            <label htmlFor={option.id} className="dv-checkbox-label">
              {option.label}
            </label>
          </div>
        ))}
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
  style: PropTypes.object,
  title: PropTypes.string
};

CheckboxGroup.defaultProps = {
  orientation: "vertical"
};

export default CheckboxGroup;
