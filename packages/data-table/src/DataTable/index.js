import React from "react";
import ReactTable from "react-table";
import Pagination from "./Pagination";
import withSearch from "./WithSearch";
import { Select } from "@newamerica/components";
import "react-table/react-table.css";
import "@newamerica/components/dist/styles.scss";
import "./DataTable.scss";

const DataTable = ({
  data,
  columns,
  showPagination,
  maxWidth = 1200,
  children,
  ...rest
}) => (
  <div style={{ maxWidth: maxWidth }}>
    {children}
    <ReactTable
      data={data}
      columns={columns}
      className="-striped"
      showPagination={showPagination ? showPagination : false}
      showPageSizeOptions={false}
      PaginationComponent={Pagination}
      {...rest}
    />
  </div>
);

const DataTableWithSearch = withSearch(DataTable);

export default DataTable;
export { DataTableWithSearch };
