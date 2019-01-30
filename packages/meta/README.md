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


## Components



  - [ChartContainer](#chartcontainer)
  - [Description](#description)
  - [Source](#source)
  - [Title](#title)

## API




### ChartContainer
 
From [`../src/ChartContainer/index.js`](../src/ChartContainer/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | `*` |  | :x: | 
**className** | `String` |  | :x: | 
**full** | `Boolean` | `false` | :x: | Wraps your children in a div with the class `dv-ChartContainer__child`
**noBackground** | `Boolean` | `false` | :x: | Removes the light gray background and padding from the chart container
**style** | `Object` |  | :x: | 
 
 
 


### Description
 
From [`../src/Description/index.js`](../src/Description/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | `*` |  | :x: | 
**className** | `String` |  | :x: | 
**style** | `Object` |  | :x: | 
 
 
 


### Source
 
From [`../src/Source/index.js`](../src/Source/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | `*` |  | :x: | 
**className** | `String` |  | :x: | 
**style** | `Object` |  | :x: | 
 
 
 


### Title
 
From [`../src/Title/index.js`](../src/Title/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | `*` |  | :x: | 
**className** | `String` |  | :x: | 
**style** | `Object` |  | :x: | 
 
 
 
