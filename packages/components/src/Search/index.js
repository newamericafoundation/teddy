import React from "react";
import PropTypes from "prop-types";
import "./Search.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  updateSearch(e) {
    this.setState({ search: e.target.value }, () =>
      this.props.onChange(this.state.search)
    );
  }

  render() {
    const { placeholder, className, style } = this.props;
    return (
      <input
        type="search"
        placeholder={placeholder || "Search..."}
        onChange={this.updateSearch.bind(this)}
        value={this.state.search}
        className={`dv-search ${className || ""}`}
        style={style}
      />
    );
  }
}

Search.propTypes = {
  /**
   * This function will receive the current value of the search box
   */
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Search;
