import React, { Component } from "react";

export default class Results extends Component {
  render() {
    let { picHistory } = this.props;
    return (
      <div>
        <ResultSet picHistory={picHistory}></ResultSet>
      </div>
    );
  }
}

const ResultSet = ({ picHistory }) => {
  let renderResults = picHistory.map(pic => {
    return (
      <div
        className="photo__card"
        style={{
          backgroundImage: `url(${pic.imgSrc})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }}
      >
        <h3>{pic.result}</h3>
      </div>
    );
  });

  return <div className="photo">{renderResults}</div>;
};
