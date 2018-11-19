# Boilerplate for Creating Data Viz on newamerica.org

## Setup

Run `git clone https://github.com/newamerica-graphics/data-viz-boilerplate.git`.

Before starting to build, run `npm install` and change the git origin `git remote set-url origin https://github.com/newamerica-graphics/REPOSITORY.git`.

Also change the `name` of the project in `package.json` to your repository's name. This will also be the name the directory the project is deployed to on s3.

1. Define all chartIDs that will be referenced in wagtail inside [webpack.config.js](https://github.com/newamerica-graphics/data-viz-boilerplate/blob/master/webpack.config.js#L29)
2. Build your graphic any way you like
3. Inside `src/index.js` define initialization functions for each graphic. It may look something like this:

```js
var settings = {
  "id-for-chart1": chart1init,
  "id-for-chart2": chart2init
};

window.renderDataViz = function(el) {
  let id = el.getAttribute(id);
  if (settings[id]) settings[id](el);
};
```

`newamericadotorg` looks for any element with the class `.na-dataviz`, and if a `renderDataViz` function is defined globally, calls it for each element. You can see a mock of what happens in the [index.html file](https://github.com/newamerica-graphics/data-viz-boilerplate/blob/master/src/index.html#L19-L27).

## Components

We provide a set of charts, components, and scss utilities in the `src/` folder. These are mostly (although not entirely) built with React and a low-level data visualization library called [vx](https://vx-demo.now.sh/). While you don't have to use React or vx to build a graphic, we find that it speeds up development considerably, and using our predefined components enforces visual styles across all dataviz projects.

To create new charts or components, you can develop in the `.storybook/` folder, merge them into the master branch, and deploy them to our living [component library](https://data.newamerica.org/components-library/) with `npm run storybook`.

## Deployment

- Make sure you have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) configured properly on your machine. If you have Homebrew installed, run `brew update && brew install awscli` and then `aws configure` and finally `aws configure set preview.cloudfront true`
- Make sure you have renamed your project in `package.json`.
- All deployments are cached by AWS cloudfront and available at [https://data.newamerica.org/](https://data.newamerica.org/) and on s3 [here](http://datadotnewamerica.s3-website-us-east-1.amazonaws.com/).

## Notes

- `React`, `ReactDOM`, `ReactRedux`, and `Redux` are all globally scoped on newamerica.org, and defined as externals within this repo's [webpack config](https://github.com/newamerica-graphics/data-viz-boilerplate/blob/master/webpack.config.js). There is no need to install or bundle those dependencies if the graphic will exist exclusively on newamerica.org.

- Critical styles from newamerica.org are included in the head. This includes all [fonts](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_fonts.scss) and [type styles](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_type.scss), [bootstrap columns](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_bootstrap-grid-critical.scss), [margins](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_margins.scss), and [containers](https://github.com/newamericafoundation/newamerica-cms/blob/staging/newamericadotorg/assets/scss/base/_containers.scss).

## Roadmap

- More charts and components are coming soon.
- Potentially separate the chart/component library into a separate npm package, and keep this repository as a pure webpack boilerplate.
