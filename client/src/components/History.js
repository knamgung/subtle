import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getHistories } from "../queries/queries";

class History extends Component {
  render() {
    let {
      saveAnalysis,
      allAnalyzed,
      data: { loading, error, histories }
    } = this.props;
    console.log(this.props);

    if (loading) {
      return <h5>Loading</h5>;
    }
    if (error) {
      return <h5>Error</h5>;
    }

    return (
      <div className="history">
        <h1>History</h1>
        <p>Collection of your previous subtle analysis!</p>
        <HistoryCards allAnalyzed={histories}></HistoryCards>
      </div>
    );
  }
}

const HistoryCards = ({ allAnalyzed }) => {
  let allCards = allAnalyzed.map(hist => {
    console.log(hist);

    return (
      <div className="prev">
        <div className="prev__info">
          <h5 className="prev__title">
            {hist.title} | {hist.resource.length} Photos
          </h5>
          <p className="prev__date">{hist.date}</p>
        </div>
        <div className="prev__preview">
          {hist.resource.map(img => (
            <div className="icon">
              <img
                style={{
                  backgroundImage: `url(${img.imgSrc})`
                }}
                className="prev__img"
              ></img>
            </div>
          ))}
        </div>
      </div>
    );
  });
  return <div>{allCards}</div>;
};

export default graphql(getHistories)(History);
