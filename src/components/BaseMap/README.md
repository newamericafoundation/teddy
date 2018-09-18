# Pindrop Map

### Usage

```js
import BaseMap from "./components/BaseMap";
```

### Properties

- `geometry` - Either "world" or "us", this is used to load the geometry and projection.
- `projectionInit` - A function that will receive the map's projection as an argument. This is used to pass the projection from the BaseMap back up to the parent.
- `width` - An explicitly declared width, which is passed into the BaseMap component and used in the SVG's viewBox.
- `height` -An explicitly declared height, which is passed into the BaseMap component and used in the SVG's viewBox.

| propName       | propType | defaultValue | isRequired |
| -------------- | -------- | ------------ | ---------- |
| projectionInit | string   | -            | +          |
| geometry       | func     | -            | +          |
| width          | number   | -            | +          |
| height         | number   | -            | +          |
