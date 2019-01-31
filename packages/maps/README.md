# @newamerica/maps

Components for creating fully responsive maps, with flexibility to change the loaded geometry, projections, overlays, and tooltips.

### Installation

```
npm install @newamerica/maps --save
```

### Usage Example

```jsx
import { Pindrop } from "@newamerica/maps";
import { Chart } from "@newamerica/charts";
import "@newamerica/charts/dist/styles.css";
import "@newamerica/maps/dist/styles.css";

const MyMap = () => (
  <Chart maxWidth="100%" aspectRatio={0.6}>
    {({ width, height }) => (
      <Pindrop
        data={data}
        width={width}
        height={height}
        geometry="us"
        projection="albersUsa"
      />
    )}
  </Chart>
);
```


## Components



  - [Cartogram](#cartogram)
  - [Choropleth](#choropleth)
  - [LoadGeometry](#loadgeometry)
  - [Pindrop](#pindrop)
  - [Projection](#projection)

## API




### Cartogram
 
From [`./src/Cartogram/index.js`](./src/Cartogram/index.js)
 
Cartogram map

⚠ this chart wraps the base `Chart` component in `@newamerica/charts`, because it relies on an internally calculated aspect ratio.
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**colors** | `Array` | `["#e6dcff", "#504a70"]` | :x: | 
**data** | `Array` |  | :white_check_mark: | 
**idAccessor** | `Function` | `d => d.id` | :x: | 
**mapFill** | `String` | `"#cbcbcd"` | :x: | 
**mapStroke** | `String` | `"#fff"` | :x: | 
**maxWidth** | `Union<String \| Number>` |  | :x: | 
**numStops** | `Number` | `6` | :x: | 
**renderTooltip** | `Function` |  | :x: | 
**valueAccessor** | `Function` |  | :white_check_mark: | 
 
 
 


### Choropleth
 
From [`./src/Choropleth/index.js`](./src/Choropleth/index.js)
 
Choropleth map
TODO: legend and margins
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**colors** | `Array` | `["#e6dcff", "#504a70"]` | :x: | An array of two colors, from which the color scale will be calculated
**data** | `Array` |  | :white_check_mark: | 
**geometry** | `Enum("world","us")` |  | :white_check_mark: | 
**handleMouseLeave** | `Function` |  | :x: | 
**handleMouseMove** | `Function` |  | :x: | 
**height** | `Number` |  | :white_check_mark: | 
**idAccessor** | `Function` | `d => d.id` | :x: | An accessor function for the state, country, or county FIPS code in your data. This is necessary to match politcal boundaries in the feature collection to your data.
**mapFill** | `String` | `"#cbcbcd"` | :x: | 
**mapStroke** | `String` | `"#fff"` | :x: | 
**numStops** | `Number` | `6` | :x: | The number of color stops
**projection** | `Enum("mercator","equalEarth","albersUsa")` |  | :white_check_mark: | 
**valueAccessor** | `Function` |  | :white_check_mark: | An accessor function for the data that's colored on the map
**width** | `Number` |  | :white_check_mark: | 
 
 
 


### LoadGeometry
 
From [`./src/LoadGeometry/index.js`](./src/LoadGeometry/index.js)
 
Loads a geojson from our S3 bucket, and calls your child function with the topojson feature.
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | `Function` |  | :white_check_mark: | 
**geometry** | `Enum("world","us")` |  | :white_check_mark: | 
 
 
 


### Pindrop
 
From [`./src/Pindrop/index.js`](./src/Pindrop/index.js)
 
Pindrop map component
TODO: implement overlap detection with an optional `preventOverlap` prop
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**circleFill** | `Union<String \| Function>` | `"#2ebcb3"` | :x: | A string for each circle's fill, or a function that will receive that circle's datum
**circleRadius** | `Union<Number \| Function>` | `5` | :x: | A number for the circle's radius, or a function that will receive that point's datum for [radius scaling](https://bl.ocks.org/guilhermesimoes/e6356aa90a16163a6f917f53600a2b4a).
**circleStroke** | `Union<String \| Function>` | `"#fff"` | :x: | A string for each circle's stroke, or a function that will receive that circle's datum
**data** | `Array` |  | :white_check_mark: | 
**geometry** | `Enum("world","us")` |  | :white_check_mark: | 
**handleMouseLeave** | `Function` |  | :x: | 
**handleMouseMove** | `Function` |  | :x: | 
**height** | `Number` |  | :white_check_mark: | 
**mapFill** | `String` | `"#cbcbcd"` | :x: | 
**mapStroke** | `String` | `"#fff"` | :x: | 
**projection** | `Enum("mercator","equalEarth","albersUsa")` |  | :white_check_mark: | 
**width** | `Number` |  | :white_check_mark: | 
 
 
 


### Projection
 
From [`./src/Projection/index.js`](./src/Projection/index.js)
 
Component for all projections.
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**center** | `Array` |  | :x: | 
**children** | `Function` |  | :x: | 
**clipAngle** | `Number` |  | :x: | 
**clipExtent** | `Array` |  | :x: | 
**data** | `Array` |  | :white_check_mark: | 
**fitExtent** | `Array` |  | :x: | 
**fitSize** | `Array` |  | :x: | 
**innerRef** | `Function` |  | :x: | 
**pathFunc** | `Function` |  | :x: | 
**precision** | `Number` |  | :x: | 
**projection** | `Enum("mercator","equalEarth","albersUsa")` | `"mercator"` | :x: | 
**projectionFunc** | `Function` |  | :x: | 
**rotate** | `Array` |  | :x: | 
**scale** | `Number` |  | :x: | 
**translate** | `Array` |  | :x: | 
 
 
 
