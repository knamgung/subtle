import React, { Component } from "react";

import Results from "./components/Results";
import Sketch from "./sketches/sketch.js";
import "./styles/App.css";
import Main from "./components/Main";
import History from "./components/History.js";
import Navbar from "./components/Navbar";
import Analyze from "./components/Analyze";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    pics: null,
    picHistory: null,
    analyzing: false,
    allAnalyzed: null
  };

  sketchThis = pics => {
    this.setState({
      pics
    });
  };

  sketchedImage = (picHistory, history) => {
    this.setState(
      {
        picHistory,
        analyzing: false
      },
      () => {
        history.push("/results");
      }
    );
  };

  saveAnalysis = analysis => {
    this.setState({
      allAnalyzed: [analysis]
    });
  };

  startAnalyzing = () => {
    this.setState({
      analyzing: true
    });
  };

  render() {
    let { pics, picHistory, analyzing, allAnalyzed } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={props => {
              return (
                <div>
                  <Navbar whichPage={false}></Navbar>
                  <Main></Main>
                </div>
              );
            }}
          ></Route>

          <Route
            path="/analyze"
            exact
            render={props => {
              return (
                <div>
                  {analyzing ? (
                    <div>
                      <Navbar whichPage={true}></Navbar>
                      <Sketch
                        pics={pics}
                        history={props.history}
                        sketchedImage={this.sketchedImage}
                      ></Sketch>
                    </div>
                  ) : (
                    <div>
                      <Navbar whichPage={true}></Navbar>{" "}
                      <Analyze
                        sketchThis={this.sketchThis}
                        startAnalyzing={this.startAnalyzing}
                      ></Analyze>
                    </div>
                  )}
                </div>
              );
            }}
          ></Route>
          <Route
            path="/history"
            render={props => {
              return (
                <div>
                  <Navbar whichPage={true}></Navbar>{" "}
                  <History allAnalyzed={allAnalyzed} {...props}></History>
                </div>
              );
            }}
          ></Route>
          <Route
            path="/results"
            render={props => {
              return (
                <div>
                  <Navbar whichPage={true}></Navbar>{" "}
                  <Results
                    picHistory={picHistory}
                    saveAnalysis={this.saveAnalysis}
                    {...props}
                  ></Results>
                </div>
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
