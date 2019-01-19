# Vertical Grouped Bar Chart

### Usage

```js
import VerticalGroupedBar from "./charts/HorizontalStackedBar";
```

### Properties

- `data` - The data for your chart. This should be an array of objects.
- `title` - The title for your chart.
- `subtitle` - The subtitle for your chart.
- `source` - The data source.
- `height` - An explicitly declared height, which is required so charts can stay responsive.
- `x` - An accessor function for the x axis.
- `keys` - An array of keys that refer to the columns in the data set that should be stacked.
- `yScale` - An optional d3 scaling function for the stacks. If not specified, defaults to linear.
- `xFormat` - An optional d3 formatting function for the x axis ticks.
- `yFormat` - An optional d3 formatting function for the y axis ticks.
- `xAxisLabel` - An optional label for the x axis.
- `yAxisLabel` - An optional label for the y axis.
- `colors` - An array of colors that is passed into the zScale. Used to color each stack.
- `tooltipTemplate` - A React component for the tooltip template. Gets passed in a data object as an argument when a bar is hovered.

| propName        | propType | defaultValue                                  | isRequired |
| --------------- | -------- | --------------------------------------------- | ---------- |
| data            | array    | -                                             | +          |
| title           | string   | -                                             | -          |
| subtitle        | string   | -                                             | -          |
| source          | string   | -                                             | -          |
| height          | number   | -                                             | +          |
| margin          | object   | { top: 40, left: 40, right: 40, bottom: 100 } | -          |
| x               | func     | -                                             | +          |
| y               | func     | -                                             | +          |
| yScale          | func     | band scaling function                         | -          |
| zScale          | func     | ordinal scaling function                      | -          |
| xFormat         | func     | -                                             | -          |
| yFormat         | func     | -                                             | -          |
| xAxisLabel      | string   | -                                             | -          |
| yAxisLabel      | string   | -                                             | -          |
| colors          | array    | -                                             | +          |
| tooltipTemplate | func     | -                                             | +          |
