import React from "react";
import {EEC_HOMEPAGE} from "../../utilities/constants";
import {NavLink} from "react-router-dom";
import "./Footer.css";

// Footer bar that appears at the bottom of the page
function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="home-footer py-2 px-2">
      <div className="home-footer-div ml-3 mr-5">
        <a className="home-footer-nav-link no-underline" href="/contributors">
          Contributors
        </a>
      </div>

      <div className="home-footer-div">
        <a className="no-underline" href={EEC_HOMEPAGE}>OSU EEC Homepage</a>
      </div>

      <div className="home-footer-div pull-right">
        {`Copyright ${currentYear} | `}
        <NavLink className="home-footer-nav-link no-underline" to="/disclaimer">
          Disclaimer
        </NavLink>
      </div>
    </footer>
  );

}
export default Footer;