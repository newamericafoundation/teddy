import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  array,
  number,
  object,
  boolean
} from "@storybook/addon-knobs";
import { withReadme, withDocs, doc } from "storybook-readme";
import HorizontalStackedBar from "../../src/charts/HorizontalStackedBar";
import HorizontalStackedBarReadme from "../../src/charts/HorizontalStackedBar/README.md";
import VerticalGroupedBar from "../../src/charts/VerticalGroupedBar";
import VerticalGroupedBarReadme from "../../src/charts/VerticalGroupedBar/README.md";
import { DataTableWithSearch } from "../../src/charts/DataTable";
import DataTableReadme from "../../src/charts/DataTable/README.md";
import PindropMap from "../../src/charts/PindropMap";
import PindropMapReadme from "../../src/charts/PindropMap/README.md";
import Search from "../../src/components/Search";
import SearchReadme from "../../src/components/Search/README.md";
import Select from "../../src/components/Select";
import SelectReadme from "../../src/components/Select/README.md";
import BaseMap from "../../src/components/BaseMap";
import BaseMapReadme from "../../src/components/BaseMap/README.md";
import { cityTemperature } from "@vx/mock-data";
import { colors } from "../../src/lib/colors";
import "./newamericadotorg.lite.css";
import "../../src/index.scss";

storiesOf("Chart", module)
  .addDecorator(withKnobs)
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
  ));

storiesOf("Chart", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(VerticalGroupedBarReadme))
  .add("Vertical Grouped Bar", () => (
    <VerticalGroupedBar
      title={text("Title", "Your Chart's Title")}
      subtitle={text("Subtitle", "Your chart's subtitle")}
      source={text("Source", "A source for the data in your chart")}
      height={number("Height", 400)}
      x={d => d[text("Y Accessor", "date")]}
      y={d => d.value}
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
  ));

storiesOf("Chart", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DataTableReadme))
  .add("Data Table", () => {
    return (
      <DataTableWithSearch
        showPagination={boolean("Pagination", true)}
        columns={object("Columns", [
          { Header: "Date", accessor: "date" },
          { Header: "New York", accessor: "New York" },
          { Header: "San Francisco", accessor: "San Francisco" },
          { Header: "Austin", accessor: "Austin" }
        ])}
        data={object("Data", [...cityTemperature.slice(0, 30)])}
      />
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(PindropMapReadme))
  .add("Pindrop Map", () => {
    return (
      <PindropMap data={object("Data",[{"lat": 38.9072, lon: -77.0369}])} geometry={text("Geometry", "us")} title={text("Chart Title", "Chart title")} source={text("Source", "Chart source")} width={1000} height={600} />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(SearchReadme))
  .add("Search", () => {
    return <Search />;
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(SelectReadme))
  .add("Select", () => {
    return <Select options={["option 1", "option 2", "option 3"]} />;
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(BaseMapReadme))
  .add("BaseMap", () => {
    return (
      <BaseMap
        geometry={text("Geometry", "us")}
        width={1000}
        height={600}
        projectionInit={projection => console.log(projection)}
      />
    );
  });
