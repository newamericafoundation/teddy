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
import styles from "@sambego/storybook-styles";
import Line from "../../src/charts/Line";
import Timeline from "../../src/charts/Timeline";
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
import Slider from "../../src/components/Slider";
import SliderReadme from "../../src/components/Slider/README.md";
import CheckboxGroup from "../../src/components/CheckboxGroup";
import CheckboxGroupReadme from "../../src/components/CheckboxGroup/README.md";
import Toggle from "../../src/components/Toggle";
import ToggleReadme from "../../src/components/Toggle/README.md";
import ButtonGroup from "../../src/components/ButtonGroup";
import ButtonGroupReadme from "../../src/components/ButtonGroup/README.md";
import BaseMap from "../../src/components/BaseMap";
import BaseMapReadme from "../../src/components/BaseMap/README.md";
import { cityTemperature } from "@vx/mock-data";
import { colors } from "../../src/lib/colors";
import "./newamericadotorg.lite.css";
import "../../src/index.scss";

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    fetch(this.props.url)
      .then(data => data.json())
      .then(data => {
        this.setState({ data });
      });
  }
  render() {
    if (!this.state.data) {
      return <div>loading</div>;
    }
    return this.props.children(this.state.data);
  }
}

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add("Line Chart", () => {
    const url =
      "https://na-data-projects.s3.amazonaws.com/data/nann/network_research.json";
    return (
      <LoadData url={url}>
        {data => (
          <Line
            data={data.line}
            width={600}
            height={400}
            x={d => d.year}
            y={d => d.cumulative}
          />
        )}
      </LoadData>
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add("Timeline", () => {
    const url =
      "http://na-data-projects.s3.amazonaws.com/data/isp/proxy_warfare.json";
    return (
      <LoadData
        url={url}
        render={data => {
          const _data = data.timeline.map((val, i) => ({
            ...val,
            date: new Date(val.date),
            dateString: val.date
          }));
          return <Timeline title="test" divisionWidth={30} data={_data} />;
        }}
      />
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withReadme(HorizontalStackedBarReadme))
  .addDecorator(
    styles({
      maxWidth: "850px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Horizontal Stacked Bar", () => (
    <HorizontalStackedBar
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
      renderTooltip={({ datum }) => (
        <div style={{ display: "flex" }}>
          <span style={{ paddingRight: "3px" }}>{datum.key}: </span>
          <span>{datum.bar.data[datum.key]}</span>
        </div>
      )}
      data={object("Data", [...cityTemperature.slice(0, 10)])}
    />
  ));

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withReadme(VerticalGroupedBarReadme))
  .addDecorator(
    styles({
      maxWidth: "850px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
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
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withReadme(DataTableReadme))
  .addDecorator(
    styles({
      maxWidth: "1200px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
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
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withReadme(PindropMapReadme))
  .addDecorator(
    styles({
      maxWidth: "1200px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Pindrop Map", () => {
    return (
      <PindropMap
        data={object("Data", [{ lat: 38.9072, lon: -77.0369 }])}
        geometry={text("Geometry", "us")}
        title={text("Chart Title", "Chart title")}
        source={text("Source", "Chart source")}
        width={1000}
        height={600}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(SearchReadme))
  .addDecorator(
    styles({
      padding: "0 0.5rem"
    })
  )
  .add("Search", () => {
    return <Search />;
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(SelectReadme))
  .addDecorator(
    styles({
      padding: "0 0.5rem"
    })
  )
  .add("Select", () => {
    return (
      <Select
        options={["option 1", "option 2", "option 3"]}
        onChange={e => console.log(e)}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(BaseMapReadme))
  .addDecorator(
    styles({
      maxWidth: "1200px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
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

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(SliderReadme))
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("Slider", () => {
    return (
      <Slider
        label="Label"
        min="0"
        max="10"
        step="1"
        value="5"
        onChange={val => console.log(val)}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(CheckboxGroupReadme))
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("CheckboxGroup", () => {
    return (
      <CheckboxGroup
        orientation="vertical"
        options={[
          { id: "1", label: "option 1" },
          { id: "2", label: "option 2" }
        ]}
        onChange={e => console.log(e.target.checked)}
        title="Title"
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ToggleReadme))
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("Toggle", () => {
    return (
      <Toggle
        onLabel="on"
        offLabel="off"
        id="toggle"
        onChange={e => console.log(e)}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ButtonGroupReadme))
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("ButtonGroup", () => {
    return (
      <ButtonGroup
        options={[
          {
            id: "1",
            text: "option 1"
          },
          {
            id: "2",
            text: "option 2"
          }
        ]}
        active="2"
        onChange={e => console.log(e)}
      />
    );
  });
