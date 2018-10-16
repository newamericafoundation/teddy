import React from "react";
import "./Toggle.scss";

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  handleChange(e) {
    this.setState({ checked: e.target.checked });
    this.props.onChange(e);
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
            onChange={e => this.handleChange(e)}
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
