import React from "react";
import PropTypes from "prop-types";
import "./Slider.scss";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value }, () =>
      this.props.onChange(this.state.value)
    );
  }

  render() {
    const { label, min, max, step, id } = this.props;
    const { value } = this.state;
    const gradValue = Math.round((+value / +max) * 1 * 100);
    return (
      <div className="dv-range-slider">
        <div className="dv-range-slider__label-container">
          <span className="dv-range-slider__label">{label}</span>
          <span className="dv-range-slider__value">
            {value} out of {max}
          </span>
        </div>
        <input
          id={id}
          className="dv-range-slider__range"
          type="range"
          value={value}
          min={min}
          max={max}
          step={step || 1}
          onChange={this.handleChange}
          onTouchMove={this.handleChange}
          style={{
            background: `linear-gradient(90deg,#2dd1ac ${gradValue}%,#e3e3e3 ${gradValue}%)`
          }}
        />
      </div>
    );
  }
}

Slider.propTypes = {
  /**
   * This function will receive the entire event when the slider has changed. Use `event.target.value` to get the current slider value.
   */
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  id: PropTypes.string
};

export default Slider;
