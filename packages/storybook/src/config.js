import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";

addDecorator(
  withOptions({
    name: "Teddy",
    showAddonPanel: false
  })
);

function loadStories() {
  require("./stories/index.js");
}

configure(loadStories, module);
