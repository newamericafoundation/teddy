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
