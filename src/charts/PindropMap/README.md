# Pindrop Map

### Usage

```js
import PindropMap from "./charts/PindropMap";
```

### Properties

- `data` - An array of objects for your data.
- `title` - The title for your chart.
- `subtitle` - The subtitle for your chart.
- `source` - The data source.
- `geometry` - Either "world" or "us", this is passed into the BaseMap component and used to load the geometry and projection.
- `lat` - An accessor string for the latitude column. Defaults to "lat"
- `lot` - An accessor string for the longitude column. Defaults to "lon"
- `width` - An explicitly declared width, which is passed into the BaseMap component and used in the SVG's viewBox.
- `height` -An explicitly declared height, which is passed into the BaseMap component and used in the SVG's viewBox.
- `tooltipTemplate` - A React component for the tooltip template. Gets passed a data object as an argument when a pin is hovered.

| propName        | propType | defaultValue | isRequired |
| --------------- | -------- | ------------ | ---------- |
| data            | array    | -            | +          |
| title           | string   | -            | -          |
| subtitle        | string   | -            | -          |
| source          | string   | -            | -          |
| geometry        | string   | -            | +          |
| lat             | string   | -            | -          |
| lon             | string   | -            | -          |
| width           | number   | -            | +          |
| height          | number   | -            | +          |
| tooltipTemplate | func     | -            | +          |
