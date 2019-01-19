# Data Table

### Usage

```js
import { DataTable, DataTableWithSearch } from "./charts/DataTable";
```

The `DataTable` component uses a library called react-table to render data tables inside of our `ChartContainer` wrapper. If you want to include a search box, which will filter rows by search value, use the `DataTableWithSearch` higher-order component.

### Properties

- `data` - The data for your table. This should be an array of objects.
- `columns` - An array of objects that lets react-table know which columns to display. At a minimum, this should include values for "Header" and "accessor." Check out the [react-table docs](https://react-table.js.org/) for more info.
- `showPagination` - `true` or `false` to show the pagination componenent at the bottom.
- `title` - The title for your chart.
- `subtitle` - The subtitle for your chart.
- `source` - The data source.
- Any other props to passed to the `ReactTable` component. More info in the [react-table docs](https://react-table.js.org/).

| propName       | propType | defaultValue | isRequired |
|----------------|----------|--------------|------------|
| data           | array    | -            | +          |
| columns        | array    | -            | +          |
| showPagination | bool     | false        | +          |
| title          | string   | -            | -          |
| subtitle       | string   | -            | -          |
| source         | string   | -            | -          |
