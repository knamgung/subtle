import React, { Component } from "react";
import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "./sketches/sketch.js";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Analyze from "./components/Analyze";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    pics: null
  };

  sketchThis = pics => {
    this.setState({
      pics
    });
  };

  sketchedImage = picHistory => {
    this.setState({
      picHistory
    });
  };

  render() {
    let { pics } = this.state;
    console.log("PICA", pics);
    return (
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route
            path="/analyze"
            exact
            render={() => {
              return (
                <div>
                  <Analyze
                    sketchThis={this.sketchThis}
                    sketchedImage={this.sketchedImage}
                  ></Analyze>
                </div>
              );
            }}
          ></Route>
          <Route
            path="/sketch"
            render={() => {
              return <Sketch pics={pics}></Sketch>;
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
