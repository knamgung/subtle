import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logos/white-logo.svg";
import profile from "../assets/icons/profile.svg";

export default class Navbar extends Component {
  render() {
    let { whichPage } = this.props;
    if (whichPage) {
      return (
        <div className="nav">
          <Link to="/">
            <img src={logo} className="nav__logo"></img>
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
            <img src={logo} className="navMain__logo"></img>
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

const ProfileIcon = () => {
  return (
    <NavLink to="/results" activeClassName="is-active-logo">
      <svg
        version="1.1"
        id="Layer_1"
        className="nav__profile"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 258.75 258.75"
        style={{ enableBackground: "new 0 0 258.75 258.75;" }}
        xmlSpace="preserve"
      >
        <g>
          <circle cx="129.375" cy="60" r="60" />
          <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z" />
        </g>
      </svg>
    </NavLink>
  );
};
