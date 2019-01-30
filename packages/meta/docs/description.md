# @newamerica/meta

Components for wrapping charts with New America-styled backgrounds, titles, descriptions, and sources.

### Installation

```
npm install @newamerica/meta --save
```

### Usage Example

```jsx
import { ChartContainer, Title, Description, Source } from "@newamerica/meta";
import "@newamerica/meta/dist/styles.css";

const MyChart = () => (
  <ChartContainer>
    <Title>This is a title</Title>
    <Description>This is a description</Description>
    // your chart here
    <Source>This is a source</Source>
  </ChartContainer>
);
```
