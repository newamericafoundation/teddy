import React from "react";

const Image = ({ image }) => (
  <div>
    <img src={image} />
  </div>
);

const ContentLeft = props => {
  const { hasImage, data } = props;
  if (hasImage) {
    return <Image image={data.image} />;
  } else {
    return (
      <div className={`dv-Timeline__content dv-Timeline__content-left`}>
        <span className="dv-Timeline__content-label">{data.dateString}</span>
        <h1 id="dv-Timeline__content-title">{data.title}</h1>
        <div>
          {data.tags.split(",").map(tag => (
            <span className="dv-Timeline__content-tag">{tag}</span>
          ))}
        </div>
      </div>
    );
  }
};

const ContentRight = props => {
  const { hasImage, data } = props;

  if (hasImage) {
    return (
      <div className="dv-Timeline__content dv-Timeline__content-right">
        <span className="dv-Timeline__content-label">{data.dateString}</span>
        <h1 className="dv-Timeline__content-title">{data.title}</h1>
        <p className="dv-Timeline__content-description">{data.description}</p>
        {data.tags.split(",").map(tag => (
          <span className="dv-Timeline__content-tag">{tag}</span>
        ))}
      </div>
    );
  } else {
    return (
      <div className="dv-Timeline__content dv-Timeline__content-right">
        <p className="dv-Timeline__content-description">{data.description}</p>
      </div>
    );
  }
};

const ArrowLeft = ({ updatePoint, data }) => (
  <div
    className="dv-Timeline__ArrowLeft"
    onClick={() => data.id !== 0 && updatePoint(data.id - 1)}
    style={{ cursor: data.id === 0 ? "not-allowed" : "pointer" }}
  >
    <svg viewBox="0 0 39 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path
          d="M8.597 0c16.568 0 30 13.431 30 30 0 16.569-13.432 30-30 30H0V0h8.597z"
          fill="#EEE"
        />
        <path
          d="M18.5 25.55l-5 4.5 5 4.5"
          stroke="#333"
          strokeLinecap="square"
          strokeWidth="2"
        />
      </g>
    </svg>
  </div>
);

const ArrowRight = ({ updatePoint, data, highestPoint }) => (
  <div
    className="dv-Timeline__ArrowRight"
    onClick={() => data.id !== highestPoint && updatePoint(data.id + 1)}
    style={{ cursor: data.id === highestPoint ? "not-allowed" : "pointer" }}
  >
    <svg viewBox="0 0 39 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path
          d="M30.403 60c-16.568 0-30-13.431-30-30 0-16.569 13.432-30 30-30H39v60h-8.597z"
          fill="#EEE"
        />
        <path
          d="M20.5 34.45l5-4.5-5-4.5"
          stroke="#333"
          strokeLinecap="square"
          strokeWidth="2"
        />
      </g>
    </svg>
  </div>
);

export default class ContentArea extends React.Component {
  constructor(props) {
    super(props);
    this.content = null;
  }

  componentWillReceiveProps() {}

  componentDidUpdate() {
    this.content.classList.add("dv-Timeline-fade");
    this.content.addEventListener("animationend", () => {
      this.content.classList.remove("dv-Timeline-fade");
    });
  }

  render() {
    const { updatePoint, activeData, highestPoint } = this.props;
    return (
      <div className="dv-Timeline__ContentArea">
        <div
          className="dv-Timeline__ContentArea-group"
          ref={el => (this.content = el)}
        >
          <ContentLeft
            data={activeData}
            hasImage={activeData.image ? true : false}
          />
          <ContentRight
            data={activeData}
            hasImage={activeData.image ? true : false}
          />
        </div>
        <ArrowLeft updatePoint={updatePoint} data={activeData} />
        <ArrowRight
          updatePoint={updatePoint}
          data={activeData}
          highestPoint={highestPoint}
        />
      </div>
    );
  }
}
