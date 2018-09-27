import React from "react";
import "./Search.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
    this.props.onChange(e.target.value);
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

export default Search;
