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
    let fullCount = hist.resource.filter(info => {
      return info.resultValue === "fullBody";
    }).length;
    let upperCount = hist.resource.filter(info => {
      return info.resultValue === "upperBody";
    }).length;
    let faceCount = hist.resource.filter(info => {
      return info.resultValue === "faceShot";
    }).length;
    let facelessCount = hist.resource.filter(info => {
      return info.resultValue === "facelessFullBody";
    }).length;
    let midCount = hist.resource.filter(info => {
      return info.resultValue === "midBody";
    }).length;
    let lowerCount = hist.resource.filter(info => {
      return info.resultValue === "lowerBody";
    }).length;

    let renderResults = info => {
      let partInfo = hist.resource.filter(obj => {
        return obj.resultValue === info;
      });
      return (
        <div
          className={`results__card ${info}`}
          style={{
            backgroundImage: `url('./assets/body-part/${info}.png'`
          }}
        >
          <div className="results__img">{partInfo.length}</div>
        </div>
      );
    };

    return (
      <div className="prev">
        <div className="prev__info">
          <h5 className="prev__title">
            {hist.title} | {hist.resource.length} Photos
          </h5>
          <p className="prev__date">{hist.date}</p>
          <div className="prev__preview">
            {renderResults("faceShot")}
            {renderResults("upperBody")}
            {renderResults("midBody")}
            {renderResults("lowerBody")}
            {renderResults("fullBody")}
            {renderResults("facelessFullBody")}
            {renderResults("undetect")}
          </div>
        </div>
      </div>
    );
  });
  return <div>{allCards}</div>;
};

export default graphql(getHistories)(History);
