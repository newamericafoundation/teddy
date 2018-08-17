# Boilerplate for Creating Data Viz on newamerica.org

## Setup
Run `git clone https://github.com/newamerica-graphics/data-viz-boilerplate.git`.

Before starting to build, run `npm install` and change the git origin `git remote set-url origin https://github.com/newamerica-graphics/REPOSITORY.git`.

1. Define all chartIDs that will be referenced in wagtail inside [webpack.config.js](https://github.com/newamerica-graphics/data-viz-boilerplate/blob/master/webpack.config.js#L29)
2. Build your graphic any way you like
3. Inside `src/index.js` define initialization functions for each graphic. It may look somethings like this:
```js
var settings = {
  'id-for-chart1': chart1init,
  'id-for-chart2': chart2init
};

window.renderDataViz = function(el){
  let id = el.getAttribute(id);
  if(settings[id]) chart1init(el);
}
```

`newamericadotorg` looks for any element with the class `.na-dataviz`, and if a `renderDataViz` function is defined globally, calls it for each element. You can see a mock of what happens in the [index.html file](https://github.com/newamerica-graphics/data-viz-boilerplate/blob/master/src/index.html#L19-L27).

##  Notes
- `React`, `ReactDOM`, `ReactRedux`, and `Redux` are all globally scoped on newamerica.org, and defined as externals within this repo's [webpack config](https://github.com/newamerica-graphics/data-viz-boilerplate/blob/master/webpack.config.js). There is no need to install or bundle those dependencies if the graphic will exist exclusively on newamerica.org.

- Critical styles from newamerica.org are included in the head. This includes all [fonts](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_fonts.scss) and [type styles](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_type.scss), [bootstrap columns](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_bootstrap-grid-critical.scss), [margins])https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_margins.scss, and [containers](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_containers.scss).
