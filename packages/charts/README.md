# @newamerica/charts

A collection of reusable, fully responsive charting components for data visualization.

### Installation

```
npm install @newamerica/charts --save
```

### Usage Example

```jsx
import { Chart, Bar } from "@newamerica/charts";

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
</Chart>;
```

While not required, the base `Chart` component is helpful, because it creates a fully responsive svg container for your chart (it uses a polyfilled version of the Intersection Observer API to watch for _debounced_ changes in screen size and resizes the svg accordingly). It can also optionally take care of rendering chart tooltips. Children must be passed in via a [render prop](https://reactjs.org/docs/render-props.html), and automatically receive the current `width` and `height` of the chart's svg. If the `renderTooltip` prop is defined, children will also receive the `handleMouseMove` and `handleMouseLeave` functions for calling tooltips.

⚠️ If you choose not to use the `Chart` component, be aware that all other chart types will return an svg `g` element, so you'd have to render those inside of an svg on your own.


## Components



  - [Bar](#bar)
  - [Chart](#chart)
  - [HorizontalBar](#horizontalbar)
  - [HorizontalStackedBar](#horizontalstackedbar)
  - [Line](#line)
  - [Scatterplot](#scatterplot)
  - [VerticalGroupedBar](#verticalgroupedbar)

## API




## Bar

From [`../src/Bar/index.js`](../src/Bar/index.js)



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**color** | `String` | `"#22C8A3"` | :x: | 
**data** | `Array` |  | :white_check_mark: | 
**handleMouseLeave** | `Function` |  | :x: | 
**handleMouseMove** | `Function` |  | :x: | 
**height** | `Number` |  | :white_check_mark: | 
**margin** | `Shape` | `{   top: 10,   left: 55,   right: 10,   bottom: 30 }` | :x: | 
**margin.bottom** | `Number` |  | :x: | 
**margin.left** | `Number` |  | :x: | 
**margin.right** | `Number` |  | :x: | 
**margin.top** | `Number` |  | :x: | 
**numTicksY** | `Union<Number \| Function>` | `5` | :x: | You can specify the number of y axis ticks directly, or pass in a function which will receive the chart's computed height as an argument.
**width** | `Number` |  | :white_check_mark: | 
**x** | `Function` |  | :white_check_mark: | Accessor function for x axis values
**xAxisLabel** | `String` |  | :x: | 
**xFormat** | `Function` |  | :x: | Formatting function for x axis tick labels
**y** | `Function` |  | :white_check_mark: | Accessor function for y axis values
**yAxisLabel** | `String` |  | :x: | 
**yFormat** | `Function` |  | :x: | Formatting function for y axis tick labels





## Chart

From [`../src/Chart/index.js`](../src/Chart/index.js)

The base Chart component for all charts and maps.
This takes care of creating a responsive svg, and rendering tooltips, legends, and annotations.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**aspectRatio** | `(custom validator)` |  | :x: | The aspectRatio of the chart. This is a number that is multiplied by the chart's computed width to calculate the chart's height. The chart MUST receive either a height or and aspectRatio prop.
**children** | `Function` |  | :white_check_mark: | A function that is passed the caculated width and height of the chart, as well as tooltip functions (if the renderTooltip prop is defined)
**height** | `(custom validator)` |  | :x: | The height of the chart. Can either be a string (i.e. `100%` or `8rem`) or a number representing a pixel value. The chart MUST receive either a height or and aspectRatio prop.
**maxWidth** | `Union<String \| Number>` | `"100%"` | :x: | The max width of the chart. Can either be a string (i.e. `100%` or `8rem`) or a number representing a pixel value.
**renderAnnotation** | `Function` |  | :x: | A function that returns a component for an annotation, which is rendered at the very bottom of the svg. It receive's the chart's current width and height (which are helpful to have for annotation positioning).
**renderLegend** | `Function` |  | :x: | A function that returns a component for the chart's legend. This is rendered as a div above the chart's svg.
**renderTooltip** | `Function` |  | :x: | A function that returns a component for the chart's tooltip. It receives event, datum, and any other arguments passed into the `handleMouseEnter` function.





## HorizontalBar

From [`../src/HorizontalBar/index.js`](../src/HorizontalBar/index.js)



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**color** | `String` | `"#22C8A3"` | :x: | 
**data** | `Array` |  | :white_check_mark: | 
**handleMouseLeave** | `Function` |  | :x: | 
**handleMouseMove** | `Function` |  | :x: | 
**height** | `Number` |  | :white_check_mark: | 
**margin** | `Shape` | `{   top: 10,   left: 50,   right: 10,   bottom: 20 }` | :x: | 
**margin.bottom** | `Number` |  | :x: | 
**margin.left** | `Number` |  | :x: | 
**margin.right** | `Number` |  | :x: | 
**margin.top** | `Number` |  | :x: | 
**numTicksX** | `Union<Number \| Function>` | `6` | :x: | 
**width** | `Number` |  | :white_check_mark: | 
**x** | `Function` |  | :white_check_mark: | 
**xAxisLabel** | `String` |  | :x: | 
**xFormat** | `Function` |  | :x: | 
**y** | `Function` |  | :white_check_mark: | 
**yAxisLabel** | `String` |  | :x: | 
**yFormat** | `Function` |  | :x: | 
**yLabelOffset** | `String` | `"-0.5em"` | :x: | 





## HorizontalStackedBar

From [`../src/HorizontalStackedBar/index.js`](../src/HorizontalStackedBar/index.js)



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**margin** | `Unknown` | `{   top: 10,   left: 60,   right: 40,   bottom: 40 }` | :x: | 





## Line

From [`../src/Line/index.js`](../src/Line/index.js)



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**aspectRatio** | `Number` |  | :x: | 
**data** | `Array` |  | :white_check_mark: | 
**height** | `Union<Number \| String>` |  | :x: | 
**margin** | `Shape` | `{ top: 10, left: 55, bottom: 30, right: 10 }` | :x: | 
**margin.bottom** | `Number` |  | :white_check_mark: | 
**margin.left** | `Number` |  | :white_check_mark: | 
**margin.right** | `Number` |  | :white_check_mark: | 
**margin.top** | `Number` |  | :white_check_mark: | 
**maxWidth** | `Union<Number \| String>` |  | :x: | 
**numTicksX** | `Union<Number \| Function>` | `10` | :x: | You can specify the number of x axis ticks directly, or pass in a function which will receive the chart's computed width as an argument.
**numTicksY** | `Union<Number \| Function>` | `5` | :x: | You can specify the number of y axis ticks directly, or pass in a function which will receive the chart's computed height as an argument.
**renderAnnotation** | `Function` |  | :x: | 
**renderTooltip** | `Function` |  | :x: | 
**stroke** | `String` | `"#22C8A3"` | :x: | 
**strokeWidth** | `Number` | `2` | :x: | 
**x** | `Function` |  | :white_check_mark: | 
**xAxisLabel** | `String` |  | :x: | 
**xFormat** | `Function` |  | :x: | 
**y** | `Function` |  | :white_check_mark: | 
**yAxisLabel** | `String` |  | :x: | 
**yFormat** | `Function` |  | :x: | 





## Scatterplot

From [`../src/Scatterplot/index.js`](../src/Scatterplot/index.js)



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**circleFill** | `Unknown` | `"rgba(76,129,219, 0.4)"` | :x: | 
**circleStroke** | `Unknown` | `"#4C81DB"` | :x: | 
**margin** | `Unknown` | `{   top: 10,   bottom: 50,   left: 55,   right: 10 }` | :x: | 
**numTicksX** | `Unknown` | `5` | :x: | 
**numTicksY** | `Unknown` | `5` | :x: | 
**size** | `Unknown` | `5` | :x: | 





## VerticalGroupedBar

From [`../src/VerticalGroupedBar/index.js`](../src/VerticalGroupedBar/index.js)



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**margin** | `Unknown` | `{   top: 40,   left: 40,   right: 40,   bottom: 40 }` | :x: | 
**numTicksY** | `Unknown` | `5` | :x: | 



