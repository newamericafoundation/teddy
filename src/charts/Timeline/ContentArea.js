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
      <div className="dv-Timeline__content col-6 content-padding row align-self-center">
        <div className="dv-Timeline__content-center col-8 align-items-center">
          <span className="dv-Timeline__content-label">{data.date}</span>
          <h1 className="dv-Timeline__content-title">{data.title}</h1>
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
      <div className="dv-Timeline__content col-6 content-padding row align-self-center">
        <div className="dv-Timeline__content-center col-8 align-items-center">
          <span className="dv-Timeline__content-label">{data.date}</span>
          <h1 className="dv-Timeline__content-title">{data.title}</h1>
          <p className="dv-Timeline__content-description">{data.description}</p>
          {data.tags.split(",").map(tag => (
            <span className="dv-Timeline__content-tag">{tag}</span>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="dv-Timeline__content col-6 content-padding row">
        <div className="dv-Timeline__content-center col-8">
          <p className="dv-Timeline__content-description">{data.description}</p>
        </div>
      </div>
    );
  }
};

const ArrowLeft = () => (
  <div className="dv-Timeline__ArrowLeft">
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

const ArrowRight = () => (
  <div className="dv-Timeline__ArrowRight">
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
  }

  render() {
    const { data } = this.props;
    return (
      <div className="dv-Timeline__ContentArea row align-items-center">
        <ArrowLeft />
        <ContentLeft data={data} hasImage={data.image ? true : false} />
        <ContentRight data={data} hasImage={data.image ? true : false} />
        <ArrowRight />
      </div>
    );
  }
}
