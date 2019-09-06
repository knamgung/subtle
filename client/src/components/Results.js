import React, { Component } from "react";
import { graphql } from "react-apollo";
import { addHistory, getHistories } from "../queries/queries";
import _ from "lodash";
import loadingResult from "../assets/gifs/loadingResult.gif";

class Results extends Component {
  state = {
    title: null
  };

  setTitle = title => {
    this.setState({ title });
  };

  render() {
    let { picHistory, saveAnalysis, addHistory } = this.props;

    let data = this.props.getHistories;

    let { title } = this.state;

    if (data.loading) {
      return (
        <div className="process__div">
          <img
            className="process__gif"
            src={loadingResult}
            alt="loading-gif"
          ></img>
        </div>
      );
    }
    if (data.error) {
      return <h5>Error</h5>;
    }

    return (
      <div>
        {picHistory ? (
          <div className="result">
            <div className="result__title">
              <h1 className="result__header">Results</h1>
              <p className="result__desc">Save or start a new analysis</p>
            </div>
            <ResultSet
              picHistory={picHistory}
              setTitle={this.setTitle}
              historyData={data}
            ></ResultSet>
            <SaveButtons
              picHistory={picHistory}
              saveAnalysis={saveAnalysis}
              title={title}
              addHistory={addHistory}
              history={this.props.history}
              historyData={data}
            ></SaveButtons>
          </div>
        ) : (
          <h5>Please Start an Analysis</h5>
        )}
      </div>
    );
  }
}

const ResultSet = ({ picHistory, setTitle, historyData }) => {
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

  let renderResults = pics =>
    pics.map((pic, i) => {
      return (
        <div
          className="results__card"
          key={i}
          style={{
            backgroundImage: `url(${pic.imgSrc})`
          }}
        >
          <div className="results__img">
            <img
              src={`./assets/body-part/${pic.resultValue}.png`}
              alt={pic.result}
            ></img>
          </div>
        </div>
      );
    });

  return (
    <div className="result__final">
      <div className="results__title">
        <input
          className="results__title--input"
          onChange={e => {
            setTitle(e.target.value);
          }}
          placeholder={`Name your results here!`}
        ></input>
      </div>
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
    </div>
  );
};

const SaveButtons = ({
  picHistory,
  saveAnalysis,
  title,
  addHistory,
  history,
  historyData
}) => {
  let editedResource = [];
  picHistory.forEach(obj => {
    let results = {
      resultValue: obj.resultValue,
      result: obj.result
    };
    return editedResource.push(results);
  });

  return (
    <div className="button">
      <button
        className="button__cancel"
        onClick={() => {
          history.push("analyze");
        }}
      >
        Cancel
      </button>
      <button
        className="button__save"
        onClick={e => {
          let mapBool = historyData.histories.map(info => {
            if (info.title === title) {
              return true;
            } else {
              return false;
            }
          });

          if (mapBool.indexOf(true) > -1) {
            alert("Username already Taken");
            e.target.value = "";
          } else if (title === null) {
            alert("Please name your history");
          } else {
            addHistory({
              variables: {
                userId: "1",
                title: title,
                resource: editedResource
              },
              refetchQueries: [{ query: getHistories }]
            });
            history.push("history");
          }
        }}
      >
        Save!
      </button>
    </div>
  );
};

export default _.flowRight(
  graphql(addHistory, { name: "addHistory" }),
  graphql(getHistories, { name: "getHistories" })
)(Results);
