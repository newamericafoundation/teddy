import React from "react";
import PropTypes from "prop-types";
import "./Toggle.scss";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ checked: e.target.checked }, () =>
      this.props.onChange(this.state.checked)
    );
  }

  render() {
    const { onLabel, offLabel, id } = this.props;
    const { checked } = this.state;
    return (
      <div className="dv-toggle-container">
        <div className="dv-toggle">
          <input
            type="checkbox"
            className="dv-toggle__input"
            onChange={this.handleChange}
            checked={checked ? true : false}
            id={id}
          />
          <label htmlFor={id} className="dv-toggle__button" />
        </div>
        <span className="dv-toggle__label">{checked ? onLabel : offLabel}</span>
      </div>
    );
  }
}

Toggle.propTypes = {
  /**
   * This function will receive a boolean value for whether or not the toggle is on/off.
   */
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  onLabel: PropTypes.string.isRequired,
  offLabel: PropTypes.string.isRequired,
  id: PropTypes.string
};

Toggle.defaultProps = {
  checked: false
};

export default Toggle;
