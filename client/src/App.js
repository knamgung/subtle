import React, { Component } from "react";
import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import Results from "./components/Results";
import Sketch from "./sketches/sketch.js";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Analyze from "./components/Analyze";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    pics: null,
    picHistory: null,
    analyzing: false
  };

  sketchThis = pics => {
    this.setState({
      pics
    });
  };

  sketchedImage = (picHistory, history) => {
    console.log(history);
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

  startAnalyzing = () => {
    this.setState({
      analyzing: true
    });
  };

  render() {
    let { pics, picHistory, analyzing } = this.state;
    console.log("PICA", pics, picHistory);
    return (
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route
            path="/analyze"
            exact
            render={props => {
              return (
                <div>
                  {analyzing ? (
                    <Sketch
                      pics={pics}
                      history={props.history}
                      sketchedImage={this.sketchedImage}
                    ></Sketch>
                  ) : (
                    <Analyze
                      sketchThis={this.sketchThis}
                      startAnalyzing={this.startAnalyzing}
                    ></Analyze>
                  )}
                </div>
              );
            }}
          ></Route>
          {/* <Route
            path="/sketch"
            render={() => {
              return (
                <Sketch pics={pics} sketchedImage={this.sketchedImage}></Sketch>
              );
            }}
          ></Route> */}
          <Route
            path="/results"
            render={props => {
              return <Results picHistory={picHistory}></Results>;
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
