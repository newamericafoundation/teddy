import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, array, number, object } from "@storybook/addon-knobs";
import { withReadme, withDocs, doc } from "storybook-readme";
import HorizontalStackedBar from "../../src/charts/HorizontalStackedBar";
import HorizontalStackedBarReadme from "../../src/charts/HorizontalStackedBar/README.md";
import { cityTemperature } from "@vx/mock-data";
import { colors } from "../../src/lib/colors";
import "./newamericadotorg.lite.css";
import "../../src/index.scss";

storiesOf("Chart", module)
  .addDecorator(withReadme(HorizontalStackedBarReadme))
  .add("Horizontal Stacked Bar", () => (
    <HorizontalStackedBar
      title={text("Title", "Your Chart's Title")}
      subtitle={text("Subtitle", "Your chart's subtitle")}
      source={text("Source", "A source for the data in your chart")}
      height={number("Height", 400)}
      y={d => d[text("Y Accessor", "date")]}
      keys={array(
        "Keys",
        Object.keys(cityTemperature[0]).filter(d => d !== "date")
      )}
      colors={array("Colors", [
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light
      ])}
      margin={object("Margin", { top: 40, left: 70, right: 40, bottom: 40 })}
      tooltipTemplate={d => <div>Tooltip</div>}
      data={object("Data", [...cityTemperature.slice(0, 10)])}
    />
  ))
  .addDecorator(withKnobs);
