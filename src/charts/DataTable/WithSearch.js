import React from "react";
import Search from "../../components/Search";

export default function withSearch(Table) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { search: "" };
    }

    handleChange(val) {
      this.setState({ search: val });
    }

    render() {
      const search = this.state.search;
      const { data, ...otherProps } = this.props;
      let _data = data;
      if (search.length > 0) {
        _data = data.filter(row => {
          const columns = Object.keys(row);
          return columns.some(column =>
            row[column].toLowerCase().includes(search.toLowerCase())
          );
        });
      }
      return (
        <Table data={_data} {...otherProps}>
          <Search onChange={this.handleChange.bind(this)} />
        </Table>
      );
    }
  };
}
