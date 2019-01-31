# @newamerica/charts

A collection of reusable, fully responsive charting components for data visualization.

### Installation

```
npm install @newamerica/charts --save
```

### Usage Example

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

While not required, the base `Chart` component is helpful, because it creates a fully responsive svg container for your chart (it uses a polyfilled version of the Intersection Observer API to watch for _debounced_ changes in screen size and resizes the svg accordingly). It can also optionally take care of rendering chart tooltips.

Children must be passed in via a [render prop](https://reactjs.org/docs/render-props.html), and automatically receive the current `width` and `height` of the chart's svg. If the `renderTooltip` prop is defined, children will also receive the `handleMouseMove` and `handleMouseLeave` functions for calling tooltips.

⚠️ If you choose not to use the `Chart` component, be aware that all other chart types will return an svg `g` element, so you'd have to render those inside of an svg on your own.
