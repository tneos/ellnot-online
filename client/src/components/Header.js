import React from "react";

function Header() {
  return (
    <header className="social">
      <h3 className="social__info">Free Standard Delivery</h3>
      <h3 className="social__info">During sale delivery may take longer</h3>
      <div className="social__icons">
        <a href="https://www.facebook.com" target="_blank" className="social__link">
          <img className="social__img" src="/img/facebook.png" alt="facebook logo" />
        </a>
        <a href="https://www.twitter.com" target="_blank" className="social__link">
          <img className="social__img" src="../img/twitter.png" alt="twitter logo" />
        </a>
        <a href="https://www.instagram.com" target="_blank" className="social__link">
          <img className="social__img" src="../img/instagram.png" alt="instagram logo" />
        </a>
        <a href="https://www.youtube.com" target="_blank" className="social__link">
          <img className="social__img" src="../img/youtube.png" alt="youtube logo" />
        </a>
      </div>
    </header>
  );
}

export default Header;
