![Teddy Logo](./assets/teddy.png)

## Teddy

Teddy is a library of data visualization charts and components, built with React and vx.

While anyone can use these packages, many of the styles are customized to suit data visualizations on newamerica.org.

## Usage

Installation:

```bash
npm install --save @newamerica/charts
npm install --save @newamerica/maps
npm install --save @newamerica/data-table
npm install --save @newamerica/timeline
npm install --save @newamerica/components
npm install --save @newamerica/meta
```

And then:

```jsx
import { Bar } from "@newamerica/charts";
import "@newamerica/charts/styles.css";
import data from "data.json";

const vis = document.querySelector(".vis");

ReactDOM.render(
  <Bar
    maxWidth={600}
    height={400}
    data={data}
    x={d => d.key}
    y={d => d.value}
    renderTooltip={({ datum }) => <div>{datum.value}</div>}
  />,
  vis
);
```

## Packages

_Documentation coming soon_

**Charts**

- Bar
- HorizontalBar
- HorizontalStackedBar
- VerticalGroupedBar
- Line
- Scatterplot

**Maps**

- Cartogram (coming soon)
- Choropleth (coming soon)
- Hexgrid (coming soon)
- Pindrop (coming soon)

**Data Table**

- DataTable
- DataTableWithSearch

**Timeline**

- Timeline

**Components**

- ButtonGroup
- CheckboxGroup
- Search
- Select
- Slider
- Toggle

**Meta**

- Title
- Description
- Source
