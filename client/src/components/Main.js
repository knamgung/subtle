import React, { Component } from "react";
import logo from "../assets/logos/blue-logo-01.svg";
import sketch from "../sketches/sketchMain";
import P5Wrapper from "react-p5-wrapper";

import apollo from "../assets/stack/frontend/apollo.png";
import ml5 from "../assets/stack/frontend/ml5.png";
import p5 from "../assets/stack/frontend/p5.png";
import react from "../assets/stack/frontend/react.png";
import tensorflow from "../assets/stack/frontend/tensorflow.png";

import express from "../assets/stack/backend/express.png";
import graphql from "../assets/stack/backend/graphql.svg";
import mongodb from "../assets/stack/backend/mongodb.png";
import mongoose from "../assets/stack/backend/mongoose.png";

export default class Main extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            width: "100%",
            height: "20em",
            backgroundImage: `url("../assets/hero.jpg")`,
            backgroundSize: "cover",

            backgroundRepeat: "no-repeat"
          }}
        >
          <img src={logo} className="nav__logo"></img>
        </div>
        <div className="main__content">
          <HowItWorks></HowItWorks>
          <div className="main__demo">
            <h2 className="main__title">PoseNet Demo</h2>

            <P5Wrapper sketch={sketch}></P5Wrapper>
          </div>
          <StackCards></StackCards>
        </div>
      </div>
    );
  }
}

const HowItWorks = () => {
  return (
    <div>
      <h2>How To Use</h2>
      <div>
        <div>
          <h5>Upload Photos</h5>
          <p>
            Any single person portraits
            <br />
            .jpg | .jpeg | .png
          </p>
        </div>
        <div>
          <h5>Analyze</h5>
          <p>
            Wait for Subtle to finish
            <br />
            analyzing
          </p>
        </div>

        <div>
          <h5> Done!</h5>
          <p>
            Save your current Analysis
            <br />
            Start Again!
          </p>
        </div>
      </div>
    </div>
  );
};

const StackCards = () => {
  return (
    <div className="stack">
      <div className="stack__card front-end">
        <h2 className="stack__title front-end--title">Front End</h2>
        <div className="stack__each">
          <div className="stack__icon apollo">
            <img src={apollo} className="stack__img"></img>
            <h5 className="stack__desc front-end--desc">Apollo</h5>
          </div>
          <div className="stack__icon ml5">
            <img src={ml5} className="stack__img"></img>
            <h5 className="stack__desc front-end--desc">ml5.js</h5>
          </div>
          <div className="stack__icon p5">
            <img src={p5} className="stack__img"></img>
            <h5 className="stack__desc front-end--desc">p5.js</h5>
          </div>
          <div className="stack__icon react">
            <img src={react} className="stack__img"></img>
            <h5 className="stack__desc front-end--desc">React</h5>
          </div>
          <div className="stack__icon tensorflow">
            <img src={tensorflow} className="stack__img"></img>
            <h5 className="stack__desc front-end--desc">TensorFlow.js</h5>
          </div>
        </div>
      </div>
      <div className="stack__card back-end">
        <h2 className="stack__title back-end--title">Back End</h2>
        <div className="stack__each">
          <div className="stack__icon express">
            <img src={express} className="stack__img"></img>
            <h5 className="stack__desc back-end--desc">express.js</h5>
          </div>
          <div className="stack__icon graphql">
            <img src={graphql} className="stack__img"></img>
            <h5 className="stack__desc back-end--desc">GraphQL</h5>
          </div>
          <div className="stack__icon mongodb">
            <img src={mongodb} className="stack__img"></img>
            <h5 className="stack__desc back-end--desc">MongoDB</h5>
          </div>
          <div className="stack__icon mongoose">
            <img src={mongoose} className="stack__img"></img>
            <h5 className="stack__desc back-end--desc">Mongoose</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
