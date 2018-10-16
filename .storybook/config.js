import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";

addDecorator(
  withOptions({
    addonPanelInRight: true
  })
);

function loadStories() {
  require("./stories/index.js");
}

configure(loadStories, module);
