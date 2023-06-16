import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-5">
      <Link to={`/`} className="link-underline px-3">
        Home
      </Link>
      <Link to={`/about`} className="link-underline px-3">
        About
      </Link>
    </footer>
  );
};

export default Footer;
