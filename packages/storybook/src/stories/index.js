import React from "react";
import { storiesOf } from "@storybook/react";
import styles from "@sambego/storybook-styles";
import {
  Chart,
  Bar,
  HorizontalBar,
  HorizontalStackedBar,
  VerticalGroupedBar,
  Line,
  Scatterplot
} from "@newamerica/charts";
import {
  Search,
  Select,
  Slider,
  CheckboxGroup,
  Toggle,
  ButtonGroup
} from "@newamerica/components";
import { Pindrop, Choropleth, Cartogram } from "@newamerica/maps";
import { ChartContainer, Title, Description, Source } from "@newamerica/meta";
import { Timeline } from "@newamerica/timeline";
import { DataTableWithSearch } from "@newamerica/data-table";
import { cityTemperature } from "@vx/mock-data";
import { AnnotationCalloutCircle } from "react-annotation";
import { colors } from "../lib/colors";
import "./newamericadotorg.lite.css";
import "@newamerica/charts/dist/styles.css";
import "@newamerica/data-table/dist/styles.css";
import "@newamerica/components/dist/styles.css";
import "@newamerica/timeline/dist/styles.css";
import "@newamerica/meta/dist/styles.css";
import "@newamerica/maps/dist/styles.css";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default ChartContainer;

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

storiesOf("Charts", module)
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Bar Chart", () => {
    const barData = new Array(5).fill(0).map((val, i) => ({
      key: `Bar ${i + 1}`,
      value: getRandomInt(1, 40)
    }));
    const tooltip = ({ datum }) => (
      <div>
        {datum.key}: <b>{datum.value}</b>
      </div>
    );

    return (
      <ChartContainer>
        <Title>This is a bar chart</Title>
        <Description>This is a description for the bar chart</Description>
        <Chart maxWidth={600} aspectRatio={0.55} renderTooltip={tooltip}>
          {chartProps => {
            return (
              <Bar
                data={barData}
                x={d => d.key}
                y={d => d.value}
                yAxisLabel="This is an axis label"
                margin={{ top: 10, left: 55, right: 10, bottom: 30 }}
                {...chartProps}
              />
            );
          }}
        </Chart>
        <Source>This is a source for the bar chart</Source>
      </ChartContainer>
    );
  });

storiesOf("Charts", module)
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Horizontal Bar Chart", () => {
    const barData = new Array(5).fill(undefined).map((val, i) => ({
      key: `Bar ${i + 1}`,
      value: getRandomInt(1, 40)
    }));

    const tooltip = ({ datum }) => (
      <div>
        {datum.key}: <b>{datum.value}</b>
      </div>
    );

    return (
      <ChartContainer>
        <Title>This is a title for the horizontal bar chart</Title>
        <Description>
          This is a description for the horizontal bar chart
        </Description>
        <Chart maxWidth="100%" height={350} renderTooltip={tooltip}>
          {chartProps => (
            <HorizontalBar
              data={barData}
              x={d => d.value}
              y={d => d.key}
              numTicksX={width => (width < 400 ? 4 : 6)}
              margin={{ top: 10, left: 40, right: 10, bottom: 20 }}
              {...chartProps}
            />
          )}
        </Chart>

        <Source>This is a source</Source>
      </ChartContainer>
    );
  });

storiesOf("Charts", module)
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Scatterplot", () => {
    const scatterData = new Array(30).fill(undefined).map((val, i) => ({
      name: i,
      x: getRandomInt(i, (i + 1) * 5),
      y: getRandomInt(i, (i + 1) * 5)
    }));
    return (
      <ChartContainer>
        <Title>This is a scatterplot</Title>
        <Description>This is a description</Description>

        <Chart
          maxWidth={650}
          height={400}
          renderTooltip={() => <div>Tooltip</div>}
        >
          {chartProps => (
            <Scatterplot
              data={scatterData}
              x={d => d.x}
              y={d => d.y}
              xAxisLabel="This is an axis label"
              yAxisLabel="This is an axis label"
              numTicksX={width => (width < 400 ? 5 : 7)}
              margin={{
                top: 10,
                bottom: 50,
                left: 55,
                right: 10
              }}
              {...chartProps}
            />
          )}
        </Chart>

        <Source>This is a source</Source>
      </ChartContainer>
    );
  });

storiesOf("Charts", module)
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Line Chart", () => {
    const url =
      "https://na-data-projects.s3.amazonaws.com/data/nann/network_research.json";

    const tooltip = ({ datum }) => (
      <div>
        {datum.year}: <b>{datum.cumulative}</b>
      </div>
    );
    return (
      <LoadData url={url}>
        {data => (
          <ChartContainer>
            <Title>This is a line chart</Title>
            <Description>
              Instead of a fixed height, this chart has an aspect ratio that it
              will maintain on all screen sizes
            </Description>
            <Chart maxWidth={600} aspectRatio={0.6} renderTooltip={tooltip}>
              {props => (
                <React.Fragment>
                  <Line
                    data={data.line}
                    x={d => d.year}
                    y={d => +d.cumulative}
                    yAxisLabel="Label"
                    margin={{ top: 10, left: 55, right: 10, bottom: 30 }}
                    numTicksX={width => (width < 350 ? 3 : 8)}
                    {...props}
                  />
                  <AnnotationCalloutCircle
                    x={props.width / 1.35}
                    y={props.height / 1.75}
                    dy={props.width < 350 ? -40 : -50}
                    dx={props.width < 350 ? -10 : -50}
                    color={"#333"}
                    editMode={false}
                    note={{
                      label: "Oh look, this is an annotation 😎",
                      lineType: "horizontal",
                      lineType: null
                    }}
                    subject={{ radius: 16, radiusPadding: 5 }}
                  />
                </React.Fragment>
              )}
            </Chart>
            <Source>This is a source</Source>
          </ChartContainer>
        )}
      </LoadData>
    );
  });

storiesOf("Charts", module)
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Horizontal Stacked Bar", () => (
    <ChartContainer>
      <Title>This is a horizontal stacked bar chart</Title>
      <Description>This is a description</Description>
      <Chart
        maxWidth={600}
        height={350}
        renderTooltip={({ datum }) => (
          <div style={{ display: "flex" }}>
            <span style={{ paddingRight: "3px" }}>{datum.key}: </span>
            <span>{datum.bar.data[datum.key]}</span>
          </div>
        )}
      >
        {props => (
          <HorizontalStackedBar
            y={d => d["date"]}
            keys={Object.keys(cityTemperature[0]).filter(d => d !== "date")}
            colors={[
              colors.turquoise.light,
              colors.blue.light,
              colors.purple.light
            ]}
            margin={{ top: 35, left: 60, right: 40, bottom: 20 }}
            data={[...cityTemperature.slice(0, 10)]}
            {...props}
          />
        )}
      </Chart>

      <Source>This is a source</Source>
    </ChartContainer>
  ));

storiesOf("Charts", module)
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Vertical Grouped Bar", () => (
    <ChartContainer>
      <Title>This is a title</Title>
      <Description>This is a short description</Description>
      <Chart height={350} renderTooltip={d => <div>Tooltip</div>}>
        {props => (
          <VerticalGroupedBar
            data={[...cityTemperature.slice(0, 10)]}
            x={d => d["date"]}
            keys={Object.keys(cityTemperature[0]).filter(d => d !== "date")}
            colors={[
              colors.turquoise.light,
              colors.blue.light,
              colors.purple.light
            ]}
            margin={{ top: 50, left: 25, right: 10, bottom: 30 }}
            {...props}
          />
        )}
      </Chart>
      <Source>This is a source</Source>
    </ChartContainer>
  ));

storiesOf("Maps", module)
  .addDecorator(
    styles({
      maxWidth: "850px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Pindrop Map", () => {
    return (
      <LoadData url="https://na-data-projects.s3.amazonaws.com/data/epp/embedded_certifications.json">
        {data => {
          return (
            <ChartContainer>
              <Title>This is a title</Title>
              <Description>This is a description</Description>
              <Chart
                maxWidth={850}
                aspectRatio={0.6}
                renderTooltip={() => <div>Tooltip</div>}
              >
                {props => (
                  <Pindrop
                    data={data.viz__map}
                    geometry="us"
                    projection="albersUsa"
                    mapStroke="#f5f5f5"
                    {...props}
                  />
                )}
              </Chart>
              <Source>This is a source</Source>
            </ChartContainer>
          );
        }}
      </LoadData>
    );
  });

storiesOf("Maps", module)
  .addDecorator(
    styles({
      maxWidth: "850px",
      width: "100%",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("U.S. Choropleth", () => {
    return (
      <LoadData url="https://na-data-projects.s3.amazonaws.com/data/epp/undermining_pell_iv.json">
        {data => {
          return (
            <ChartContainer>
              <Title>This is a title for the map</Title>
              <Description>This is a description</Description>
              <Chart aspectRatio={0.6} renderTooltip={() => <div>Tooltip</div>}>
                {props => (
                  <Choropleth
                    geometry="us"
                    projection="albersUsa"
                    data={data.viz__2}
                    valueAccessor={d => +d["average_net_price"]}
                    idAccessor={d => d.id}
                    mapStroke="#f5f5f5"
                    {...props}
                  />
                )}
              </Chart>

              <Source>This is a source</Source>
            </ChartContainer>
          );
        }}
      </LoadData>
    );
  });

storiesOf("Maps", module)
  .addDecorator(
    styles({
      maxWidth: "850px",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("World Choropleth", () => {
    return (
      <LoadData url="https://na-data-projects.s3.amazonaws.com/data/epp/undermining_pell_iv.json">
        {data => {
          return (
            <ChartContainer>
              <Title>This is a title for the map</Title>
              <Description>
                These maps are completely responsive. Try resizing your browser.
              </Description>
              <Chart aspectRatio={0.7} renderTooltip={() => <div>Tooltip</div>}>
                {props => (
                  <Choropleth
                    geometry="world"
                    projection="mercator"
                    data={data.viz__2}
                    valueAccessor={d => +d["average_net_price"]}
                    mapStroke="#f5f5f5"
                    {...props}
                  />
                )}
              </Chart>
              <Source>This is a source</Source>
            </ChartContainer>
          );
        }}
      </LoadData>
    );
  });

storiesOf("Maps", module)
  .addDecorator(
    styles({
      maxWidth: "850px",
      margin: "1rem auto",
      padding: "0 1rem"
    })
  )
  .add("Cartogram", () => {
    return (
      <LoadData url="https://na-data-projects.s3.amazonaws.com/data/epp/undermining_pell_iv.json">
        {data => {
          return (
            <ChartContainer>
              <Title>This is a title for the map</Title>
              <Description style={{ paddingBottom: "2rem" }}>
                These maps are completely responsive. Try resizing your browser.
              </Description>
              <Cartogram
                data={data.viz__2}
                margin={{ top: 10, left: 0, right: 0, bottom: 10 }}
                mapStroke="#f5f5f5"
                valueAccessor={d => +d["average_net_price"]}
                renderTooltip={() => <div>Tooltip</div>}
              />
              <Source style={{ paddingTop: "2rem" }}>This is a source</Source>
            </ChartContainer>
          );
        }}
      </LoadData>
    );
  });

storiesOf("Timeline", module).add("Timeline", () => {
  const url =
    "https://na-data-projects.s3.amazonaws.com/data/isp/proxy_warfare.json";
  return (
    <LoadData url={url}>
      {data => {
        const _data = data.timeline.map((val, i) => ({
          ...val,
          date: new Date(val.date),
          dateString: val.date
        }));
        return <Timeline title="test" divisionWidth={30} data={_data} />;
      }}
    </LoadData>
  );
});

storiesOf("Data Table", module)
  .addDecorator(
    styles({
      width: "100%"
    })
  )
  .add("Data Table", () => {
    return (
      <ChartContainer full>
        <DataTableWithSearch
          showPagination={true}
          columns={[
            { Header: "Date", accessor: "date" },
            { Header: "New York", accessor: "New York" },
            { Header: "San Francisco", accessor: "San Francisco" },
            { Header: "Austin", accessor: "Austin" }
          ]}
          data={[...cityTemperature.slice(0, 30)]}
          defaultPageSize={10}
        />
      </ChartContainer>
    );
  });

storiesOf("Components", module)
  .addDecorator(
    styles({
      padding: "0 0.5rem"
    })
  )
  .add("Search", () => {
    return <Search onChange={val => console.log(val)} />;
  });

storiesOf("Components", module)
  .addDecorator(
    styles({
      padding: "0 0.5rem"
    })
  )
  .add("Select", () => {
    return (
      <Select
        options={["option 1", "option 2", "option 3"]}
        onChange={val => console.log(val)}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("Slider", () => {
    return (
      <Slider
        label="Label"
        min={0}
        max={10}
        step={1}
        value={5}
        onChange={val => console.log(val)}
      />
    );
  });

storiesOf("Components", module)
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
          { id: "2", label: "option 2" },
          { id: "3", label: "option 3" }
        ]}
        onChange={val => console.log(val)}
        title="Title"
      />
    );
  });

storiesOf("Components", module)
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
        onChange={val => console.log(val)}
      />
    );
  });

storiesOf("Components", module)
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
          },
          {
            id: "3",
            text: "option 3"
          }
        ]}
        active="2"
        onChange={val => console.log(val)}
      />
    );
  });
