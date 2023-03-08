import React from "react";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Useful Info</h3>
      <div className="footer__container">
        <ul className="footer__col">
          <Link to="delivery" className="footer__links">
            <li className="footer__item">Delivery</li>
          </Link>
          <Link to="/returns" className="footer__links">
            <li className="footer__item">Returns</li>
          </Link>
          <Link to="/students" className="footer__links">
            <li className="footer__item">Student Discount</li>
          </Link>
        </ul>
        <ul className="footer__col">
          <Link to="/myaccount" className="footer__links">
            <li className="footer__item">My Account</li>
          </Link>
          <Link to="/regulars" className="footer__links">
            <li className="footer__item">Regulars discount</li>
          </Link>
          <Link to="/about-us" className="footer__links">
            <li className="footer__item">About Us</li>
          </Link>
        </ul>
      </div>
      <p className="footer__copyright">&copy; 2023 Ellnot Company</p>
    </footer>
  );
}

export default Footer;
