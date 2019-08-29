import React, { Component } from "react";

export default class Results extends Component {
  render() {
    let { picHistory } = this.props;
    return (
      <div>
        {picHistory ? (
          <ResultSet picHistory={picHistory}></ResultSet>
        ) : (
          <h5>Please Start an Analysis</h5>
        )}
      </div>
    );
  }
}

const ResultSet = ({ picHistory }) => {
  let bodyParts = {
    fullBody: [],
    faceShot: [],
    upperBody: [],
    facelessFullBody: [],
    midBody: [],
    lowerBody: [],
    undetect: []
  };

  picHistory.forEach(pic => {
    bodyParts[pic.resultValue].push(pic);
  });
  // let fullBody = picHistory.filter(pic => {
  //   return pic.result === "Full Body";
  // });

  // let faceShot = picHistory.filter(pic => {
  //   return pic.result === "Face Shot";
  // });

  // let upperBody = picHistory.filter(pic => {
  //   return pic.result === "Upper Body";
  // });

  // let facelessFullBody = picHistory.filter(pic => {
  //   return pic.result === "Faceless Full Body";
  // });

  // let midBody = picHistory.filter(pic => {
  //   return pic.result === "Mid Body";
  // });

  // let lowerBody = picHistory.filter(pic => {
  //   return pic.result === "Lower Body";
  // });

  // let undetect = picHistory.filter(pic => {
  //   return pic.result === "Undetectable";
  // });
  console.log(bodyParts);

  let renderResults = pics =>
    pics.map(pic => {
      return (
        <div
          className="results__card"
          style={{
            backgroundImage: `url(${pic.imgSrc})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="results__img">
            <img src={`./assets/body-part/${pic.resultValue}.png`}></img>
          </div>
        </div>
      );
    });

  console.log(bodyParts["midBody"].length);

  return (
    <div className="results">
      {bodyParts["faceShot"].length > 0 ? (
        <div className="results__type">
          <div className="results__section">
            <h3 className="results__section--title">Face Shots</h3>
            <p className="results__section--count">{`${bodyParts["faceShot"].length}/${picHistory.length}`}</p>
          </div>
          <div className="results__rendered">
            {renderResults(bodyParts["faceShot"])}
          </div>
        </div>
      ) : null}
      {bodyParts["fullBody"].length > 0 ? (
        <div className="results__type">
          <div className="results__section">
            <h3 className="results__section--title">Full Body Shots</h3>
            <p className="results__section--count">{`${bodyParts["fullBody"].length}/${picHistory.length}`}</p>
          </div>
          <div className="results__rendered">
            {renderResults(bodyParts["fullBody"])}
          </div>
        </div>
      ) : null}

      {bodyParts["upperBody"].length > 0 ? (
        <div className="results__type">
          <div className="results__section">
            <h3 className="results__section--title">Upper Body Shots</h3>
            <p className="results__section--count">{`${bodyParts["upperBody"].length}/${picHistory.length}`}</p>
          </div>
          <div className="results__rendered">
            {renderResults(bodyParts["upperBody"])}
          </div>
        </div>
      ) : null}
      {bodyParts["facelessFullBody"].length > 0 ? (
        <div className="results__type">
          <div className="results__section">
            <h3 className="results__section--title">
              Faceless Full Body Shots
            </h3>
            <p className="results__section--count">{`${bodyParts["facelessFullBody"].length}/${picHistory.length}`}</p>
          </div>
          <div className="results__rendered">
            {renderResults(bodyParts["facelessFullBody"])}
          </div>
        </div>
      ) : null}
      {bodyParts["lowerBody"].length > 0 ? (
        <div className="results__type">
          <div className="results__section">
            <h3 className="results__section--title">Lower Body Shots</h3>
            <p className="results__section--count">{`${bodyParts["lowerBody"].length}/${picHistory.length}`}</p>
          </div>
          <div className="results__rendered">
            {renderResults(bodyParts["lowerBody"])}
          </div>
        </div>
      ) : null}

      {bodyParts["midBody"].length > 0 ? (
        <div className="results__type">
          <div className="results__section">
            <h3 className="results__section--title">Mid Body Shots</h3>
            <p className="results__section--count">{`${bodyParts["midBody"].length}/${picHistory.length}`}</p>
          </div>
          <div className="results__rendered">
            {renderResults(bodyParts["midBody"])}
          </div>
        </div>
      ) : null}
      {bodyParts["undetect"].length > 0 ? (
        <div className="results__type">
          <div className="results__section">
            <h3 className="results__section--title">Undetectable Shots</h3>
            <p className="results__section--count">{`${bodyParts["undetect"].length}/${picHistory.length}`}</p>
          </div>
          <div className="results__rendered">
            {renderResults(bodyParts["undetect"])}
          </div>
        </div>
      ) : null}
    </div>
  );
};
