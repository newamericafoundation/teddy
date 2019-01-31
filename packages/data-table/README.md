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



  - [DataTable](#datatable)

## API




### DataTable
 
From [`./src/DataTable/index.js`](./src/DataTable/index.js)
 
All extra props will be passed directly to the `ReactTable` component. See docs for that [here](https://react-table.js.org).

TODO:
- [ ] add functionality for a sticky first column
- [ ] add functionality for a select dropdown in addition to a search box
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | `ReactElement` |  | :x: | 
**columns** | `Array[]<Object>` |  | :white_check_mark: | 
**data** | `Array` |  | :white_check_mark: | 
**showPagination** | `Boolean` | `true` | :x: | 
 
 
 
