# Search

A simple search box with sensible styles.

### Usage

```js
import { Search } from "./components/Search";
```

### Properties

- `onChange` - A function that will be passed the search input value whenever the value changes.
- `placeholder` - The placeholder text for the inside of the search box.
- `className` - Any additional classes to be passed to the search box.
- `style` - Any additional styles to be passed to the search box.

| propName    | propType | defaultValue | isRequired |
|-------------|----------|--------------|------------|
| onChange    | func     | -            | +          |
| placeholder | string   | "Search..."  | -          |
| className   | string   | -            | -          |
| style       | object   | -            | -          |
