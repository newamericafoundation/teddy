import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import Pagination from "./Pagination";
import "react-table/react-table.css";
import "./DataTable.scss";

/**
 * All extra props will be passed directly to the `ReactTable` component. See docs for that [here](https://react-table.js.org).
 *
 * TODO:
 * - [ ] add functionality for a sticky first column
 * - [ ] add functionality for a select dropdown in addition to a search box
 */
const DataTable = ({ data, columns, showPagination, children, ...rest }) => (
  <div className="dv-DataTable">
    {children}
    <ReactTable
      data={data}
      columns={columns}
      className="-striped"
      showPagination={showPagination}
      showPageSizeOptions={false}
      PaginationComponent={Pagination}
      {...rest}
    />
  </div>
);

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  showPagination: PropTypes.bool,
  children: PropTypes.element
};

DataTable.defaultProps = {
  showPagination: true
};

export default DataTable;
