# Select

A simple select with sensible styles.

### Usage

```js
import { Select } from "./components/Select";
```

### Properties

- `onChange` - A function that will be passed the selected value whenever the input changes.
- `options` - An array of strings, which will be used to create the `<option></option>` elements inside the select box.
- `selected` - An optional string to choose the default selected option.
- `className` - Any additional classes to be passed to the select.
- `style` - Any additional styles to be passed to the select.

| propName  | propType | defaultValue | isRequired |
|-----------|----------|--------------|------------|
| onChange  | func     | -            | +          |
| options   | array    | -            | +          |
| selected  | string   | -            | -          |
| className | string   | -            | -          |
| style     | object   | -            | -          |
