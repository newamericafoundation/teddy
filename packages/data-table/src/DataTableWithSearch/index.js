import React from "react";
import DataTable from "../DataTable";
import withSearch from "./WithSearch";

/**
 * Wraps the DataTable component with a search box.
 */
export default withSearch(DataTable);
