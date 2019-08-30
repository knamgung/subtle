import React, { Component } from "react";

export default class History extends Component {
  render() {
    let { saveAnalysis, allAnalyzed } = this.props;
    return (
      <div className="history">
        <h1>History</h1>
        <p>Collection of your previous subtle analysis!</p>
        <HistoryCards allAnalyzed={allAnalyzed}></HistoryCards>
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
            {hist.title} | {hist.img.length} Photos
          </h5>
          <p className="prev__date">{hist.date}</p>
        </div>
        <div className="prev__preview">
          {hist.img.map(img => (
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
