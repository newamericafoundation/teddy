# Chart

This component is the default wrapper for all charts. It provides two functionalities:

- gives you a responsive SVG
- optionally takes care of the rendering and positioning of your tooltips.

## Usage

**Without tooltips:**

```jsx
import React from "react"
import Chart from "./Chart"

const SomeChart = () => (
  <Chart width={width} height={height} renderTooltip={}>
    {(width, height, margin) => {
      // width and height will change depending on screen size, so dynamically create your scales here
      // the margin prop is optional, feel free to use your own instead
      const xScale = ...
      const yScale = ...
      return (
        <Group top={margin.top} left={margin.left}>
          // do your work here
        </Group>
      )
    }}
  </Chart>
)
```

**With tooltips:**

```jsx
import React from "react"
import Chart from "./Chart"

const Tooltip = ({event, data, datum}) => (
  <div>
    <div style={{display: "flex"}}>
      <span>x</span>
      <span>{datum.x}</span>
    </div>
    <div style={{display: "flex"}}>
      <span>y</span>
      <span>{datum.y}</span>
    </div>
  </div>
)

const SomeChart = () => (
  <Chart width={width} height={height} renderTooltip={Tooltip}>
    {(width, height, margin, handleMouseEnter, handleMouseLeave) => {
      // width and height will change depending on screen size, so dynamically create your scales here
      // the margin prop is optional, feel free to use your own instead
      const xScale = ...
      const yScale = ...
      return (
        <Group top={margin.top} left={margin.left}>
          {data.map(d => (
            <rect
              onMouseEnter={(e) => handleMouseEnter({
                event: e,
                data: data,
                datum: d
              })}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </Group>
      )
    }}
  </Chart>
)
```

You can define tooltips in the `renderTooltip` prop as a component that receives the mouse event, the data, and the datum. This gives you complete control over what's rendered inside of the tooltip.

```jsx
const Tooltip = ({ event, data, datum }) => (
  <div>
    <div style={{ display: "flex" }}>
      <span>x</span>
      <span>{datum.x}</span>
    </div>
    <div style={{ display: "flex" }}>
      <span>y</span>
      <span>{datum.y}</span>
    </div>
  </div>
);
```

Potentially in the future, we'll be able to define it as an object, which will let the `WithTooltip` component handle rendering and display.

```js
const tooltip = {
  "This is a label": d => d.x,
  "This is a different label": d => d.date
};
```

```jsx
if (tooltipOpen && typeof renderTooltip === "function") {
  tooltipContent = renderTooltip(tooltipData);
} else if (tooltipOpen && typeof renderTooltip === "object") {
  tooltipContent = (
    <div>
      {Object.keys(renderTooltip).map(label => (
        <div style={{ display: "flex" }}>
          <span style={{ paddingRight: "3px" }}>{label}:</span>
          <span style={{ fontWeight: "bold" }}>
            {renderTooltip[label](tooltipData.datum)}
          </span>
        </div>
      ))}
    </div>
  );
}
```
