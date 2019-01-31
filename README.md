![Teddy Logo](./assets/teddy.png)

## Teddy

Teddy is a library of charts, maps, and user interface components for data visualization, built with React and vx.

[**Demo and examples**](https://data.newamerica.org/component-library/)

## Usage

Example:

```jsx
import { Chart, Bar } from "@newamerica/charts";
import "@newamerica/charts/dist/styles.css";

const MyChart = () => (
  <Chart
    maxWidth="100%"
    height={400}
    renderTooltip={({ datum }) => <div>{datum.value}</div>}
  >
    {({ width, height, handleMouseMove, handleMouseLeave }) => (
      <Bar
        data={data}
        width={width}
        height={height}
        x={d => d.x}
        y={d => +d.y}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
      />
    )}
  </Chart>
);
```

## Packages and docs

_More charts and documentation coming soon_

**Charts** ([docs](./packages/charts/README.md))

```bash
npm install --save @newamerica/charts
```

- Bar
- HorizontalBar
- HorizontalStackedBar
- VerticalGroupedBar
- Line
- Scatterplot

**Maps** ([docs](./packages/maps/README.md))

```bash
npm install --save @newamerica/maps
```

- Pindrop
- Choropleth
- Cartogram
- Hexgrid (coming soon)

**Data Table** ([docs](./packages/data-table/README.md))

```bash
npm install --save @newamerica/data-table
```

- DataTable
- DataTableWithSearch

**Timeline**

```bash
npm install --save @newamerica/timeline
```

- Timeline

**Components** ([docs](./packages/components/README.md))

```bash
npm install --save @newamerica/components
```

- ButtonGroup
- CheckboxGroup
- Search
- Select
- Slider
- Toggle

**Meta** ([docs](./packages/meta/README.md))

```bash
npm install --save @newamerica/meta
```

- ChartContainer
- Title
- Description
- Source

## To do

- [x] add prop type checks to all packages
- [x] generate documentation from prop types
- [ ] add mobile touch events for tooltip interactions
- [ ] project website
- [ ] improve accessibility across packages, especially for UI components

## Development

Clone this repo:

```bash
git clone https://github.com/newamericafoundation/teddy.git
```

Install [lerna](https://github.com/lerna/lerna) globally:

```bash
npm i -g lerna
```

Bootstrap all packages. This installs package dependencies (equivalent to `npm install` in every package folder), but hoists dependencies required by multiple packages up to the top level `node_modules`. It also symlinks `@newamerica` dependencies to that package's `packages/<PACKAGE>/dist` folder.

```bash
lerna bootstrap --hoist
```

To publish new package versions to npm:

```bash
lerna publish
```

**Local development**

Watch file changes in all packages and create development builds. This runs `rollup -c -w --environment BUILD:development` inside of every package:

```bash
lerna run start --parallel
```

If you just want to work on one or a couple packages, run something like this instead (it'll be a bit lighter on your computer, because it won't spawn separate subprocesses to watch/build every single package).

```
lerna run start --parallel --scope @newamerica/charts @newamerica/maps
```

Now you can start storybook to develop charts/maps/components locally. Packages will be rebuilt automatically on file changes and storybook will hot reload those changes. Go to `packages/storybook` and run:

```bash
npm run storybook
```

**Docs**

To generate documentation from component prop-types, run this from the root of the repo, or run `npm run docs` in an individual package folder:

```bash
lerna run docs
```
