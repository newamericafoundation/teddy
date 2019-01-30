# @newamerica/components

A collection of user interface components that are helpful for complicated data visualizations.

### Installation

```
npm install @newamerica/components --save
```


## Components



  - [ButtonGroup](#buttongroup)
  - [CheckboxGroup](#checkboxgroup)
  - [Search](#search)
  - [Select](#select)
  - [Slider](#slider)
  - [Toggle](#toggle)

## API




### ButtonGroup
 
From [`../src/ButtonGroup/index.js`](../src/ButtonGroup/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**active** | `Union<String \| Number>` |  | :x: | 
**onChange** | `Function` |  | :white_check_mark: | This function will receive the currently selected button's id
**options** | `Array[]<Shape>` |  | :white_check_mark: | 
**options[].id** | `Union<String \| Number>` |  | :x: | 
**options[].text** | `String` |  | :x: | 
 
 
 


### CheckboxGroup
 
From [`../src/CheckboxGroup/index.js`](../src/CheckboxGroup/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**onChange** | `Function` |  | :white_check_mark: | This function will receive an object with all checkbox values.
**options** | `Array[]<Shape>` |  | :white_check_mark: | 
**options[].checked** | `Boolean` |  | :x: | 
**options[].id** | `Union<String \| Number>` |  | :x: | 
**options[].label** | `String` |  | :x: | 
**orientation** | `Enum("vertical","horizontal")` | `"vertical"` | :x: | 
**style** | `Object` |  | :x: | 
**title** | `String` |  | :x: | 
 
 
 


### Search
 
From [`../src/Search/index.js`](../src/Search/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | `String` |  | :x: | 
**onChange** | `Function` |  | :white_check_mark: | This function will receive the current value of the search box
**placeholder** | `String` |  | :x: | 
**style** | `Object` |  | :x: | 
 
 
 


### Select
 
From [`../src/Select/index.js`](../src/Select/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | `String` |  | :x: | 
**onChange** | `Function` |  | :white_check_mark: | This function will receive the current value of the select dropdown.
**options** | `Array[]<String>` |  | :white_check_mark: | 
**selected** | `String` |  | :x: | 
 
 
 


### Slider
 
From [`../src/Slider/index.js`](../src/Slider/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**id** | `String` |  | :x: | 
**label** | `String` |  | :white_check_mark: | 
**max** | `Number` |  | :white_check_mark: | 
**min** | `Number` |  | :white_check_mark: | 
**onChange** | `Function` |  | :white_check_mark: | This function will receive the entire event when the slider has changed. Use `event.target.value` to get the current slider value.
**step** | `Number` |  | :x: | 
 
 
 


### Toggle
 
From [`../src/Toggle/index.js`](../src/Toggle/index.js)
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**checked** | `Boolean` | `false` | :x: | 
**id** | `String` |  | :x: | 
**offLabel** | `String` |  | :white_check_mark: | 
**onChange** | `Function` |  | :white_check_mark: | This function will receive a boolean value for whether or not the toggle is on/off.
**onLabel** | `String` |  | :white_check_mark: | 
 
 
 
