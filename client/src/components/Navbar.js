import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logos/white-logo.svg";

export default class Navbar extends Component {
  render() {
    let { whichPage } = this.props;
    if (whichPage) {
      return (
        <div className="nav">
          <Link to="/">
            <img src={logo} className="nav__logo" alt="logo"></img>
          </Link>
          <div className="nav__links">
            <NavLink to="/analyze" activeClassName="is-active">
              <h3 className="nav__link nav__link--analyze">analyze</h3>
            </NavLink>
            <NavLink to="/history" activeClassName="is-active">
              <h3 className="nav__link nav__link--history">history</h3>
            </NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navMain">
          <Link to="/">
            <img src={logo} className="navMain__logo" alt="logo"></img>
          </Link>
          <div className="navMain__links">
            <NavLink to="/analyze" activeClassName="is-active">
              <h3 className="navMain__link navMain__link--analyze">analyze</h3>
            </NavLink>
            <NavLink to="/history" activeClassName="is-active">
              <h3 className="navMain__link navMain__link--history">history</h3>
            </NavLink>
          </div>
        </div>
      );
    }
  }
}
