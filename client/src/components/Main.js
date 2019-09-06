import React, { Component } from "react";
import sketch from "../sketches/sketchMain";
import P5Wrapper from "react-p5-wrapper";
import { Link } from "react-router-dom";

import apollo from "../assets/stack/frontend/apollo.png";
import ml5 from "../assets/stack/frontend/ml5.png";
import p5 from "../assets/stack/frontend/p5.png";
import react from "../assets/stack/frontend/react.png";
import tensorflow from "../assets/stack/frontend/tensorflow.png";

import express from "../assets/stack/backend/express.png";
import graphql from "../assets/stack/backend/graphql.svg";
import mongodb from "../assets/stack/backend/mongodb.png";
import mongoose from "../assets/stack/backend/mongoose.png";

import upload from "../assets/icons/upload.svg";
import checkmark from "../assets/icons/checkmark.svg";
import analyze from "../assets/icons/analyze.svg";

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="main__hero">
          <div className="main__hero--logo">
            <h3>Subtle.</h3>
            <p>detect the shots of your images</p>
          </div>
        </div>
        <div className="main__content">
          <HowItWorks></HowItWorks>
          <div className="main__demo">
            <h2 className="main__demo--title">PoseNet Demo</h2>

            <P5Wrapper sketch={sketch}></P5Wrapper>
          </div>

          <StackCards></StackCards>
          <div className="main__start">
            <Link to="/analyze">
              <button className="main__button">Start Analysis!</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const HowItWorks = () => {
  return (
    <div className="how">
      <h2 className="how__title main__title">How Subtle Works</h2>
      <div className="how__steps">
        <div className="how__card">
          <img src={upload} className="how__icon" alt="upload__icon" />
          <div className="how__text">
            <h5 className="how__sub">Upload Photos</h5>
            <p className="how__desc">
              Any single person portraits
              <br />
              .jpg | .jpeg | .png
            </p>
          </div>
        </div>
        <div className="how__card">
          <img src={analyze} className="how__icon" alt="analyze__icon" />
          <div className="how__text">
            <h5 className="how__sub">Analyze</h5>
            <p className="how__desc">
              Wait for Subtle to finish
              <br />
              analyzing
            </p>
          </div>
        </div>

        <div className="how__card">
          <img src={checkmark} className="how__icon" alt="checkmark__icon" />
          <div className="how__text">
            <h5 className="how__sub">Done!</h5>
            <p className="how__desc">
              Save your current Analysis
              <br />
              Start Again!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StackCards = () => {
  return (
    <div className="stack">
      <h2 className="stack__header main__title">Stack</h2>
      <div className="stack__allCards">
        <div className="stack__card front-end">
          <h2 className="stack__title front-end--title">Front End</h2>
          <div className="stack__each">
            <div className="stack__icon apollo">
              <img src={apollo} className="stack__img" alt="stack-apollo"></img>
              <h5 className="stack__desc front-end--desc">Apollo</h5>
            </div>
            <div className="stack__icon ml5">
              <img src={ml5} className="stack__img" alt="stack-ml5"></img>
              <h5 className="stack__desc front-end--desc">ml5.js</h5>
            </div>
            <div className="stack__icon p5">
              <img src={p5} className="stack__img" alt="stack-p5"></img>
              <h5 className="stack__desc front-end--desc">p5.js</h5>
            </div>
            <div className="stack__icon react">
              <img src={react} className="stack__img" alt="stack-react"></img>
              <h5 className="stack__desc front-end--desc">React</h5>
            </div>
            <div className="stack__icon tensorflow">
              <img
                src={tensorflow}
                className="stack__img"
                alt="stack-tensorflow"
              ></img>
              <h5 className="stack__desc front-end--desc">TensorFlow.js</h5>
            </div>
          </div>
        </div>
        <div className="stack__card back-end">
          <h2 className="stack__title back-end--title">Back End</h2>
          <div className="stack__each">
            <div className="stack__icon express">
              <img
                src={express}
                className="stack__img"
                alt="stack-express"
              ></img>
              <h5 className="stack__desc back-end--desc">express.js</h5>
            </div>
            <div className="stack__icon graphql">
              <img
                src={graphql}
                className="stack__img"
                alt="stack-graphql"
              ></img>
              <h5 className="stack__desc back-end--desc">GraphQL</h5>
            </div>
            <div className="stack__icon mongodb">
              <img
                src={mongodb}
                className="stack__img"
                alt="stack-mongoDB"
              ></img>
              <h5 className="stack__desc back-end--desc">MongoDB</h5>
            </div>
            <div className="stack__icon mongoose">
              <img
                src={mongoose}
                className="stack__img"
                alt="stack-mongoose"
              ></img>
              <h5 className="stack__desc back-end--desc">Mongoose</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
