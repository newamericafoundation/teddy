# @newamerica/data-table

A nicely styled, responsive data table, with options for pagination and search. This basically wraps [react-table](https://react-table.js.org) with some extra functionality and custom styling.

### Installation

```
npm install @newamerica/data-table --save
```

### Usage Example

```jsx
import { DataTable, DataTableWithSearch } from "@newamerica/data-table";
import "@newamerica/data-table/dist/styles.css";

const columns = [
  {
    Header: // string for the column header,
    Accessor: // accessor string,
    // ^ this is the bare minimum, but react-table accepts a lot more, like custom cell renderers etc...
  }
]

const MyTable = () => (
  <DataTable data={data} columns={columns} showPagination={true} maxRows={20} />
);
```


## Components



  - [Pagination](#pagination)

## API




### Pagination
 
From [`../src/DataTable/Pagination.js`](../src/DataTable/Pagination.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
 
 
 
