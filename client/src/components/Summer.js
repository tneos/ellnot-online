import React from "react";
import {Link} from "react-router-dom";

function Summer() {
  return (
    <section className="summer">
      <div className="box-1">
        <h3 className="box-1__title">Summer Must-Haves</h3>
        <p className="box-1__text">
          The sun is out and the deals are hotter than ever..
          <Link className="box-1__link" to="/collection/summer-items">
            <span className="box-1__details">DETAILS</span>
          </Link>
        </p>
        <div className="box-1__container"></div>
      </div>

      <div className="box-2">
        <h3 className="box-2__title">Shades Resort</h3>
        <p className="box-2__text">
          Stock up and save on the trendiest sunglasses
          <Link className="box-2__link" to="/shoes-accessories/sunglasses">
            <span className="box-2__details">DETAILS</span>
          </Link>
        </p>
        <div className="box-2__container"></div>
      </div>

      <div className="box-3">
        <h3 className="box-3__title">Hats-On</h3>
        <p className="box-3__text">
          When the summer vibes come callin', stock up on this classNameic
          <Link className="box-3__link" to="/shoes-accessories/hats">
            <span className="box-3__details">DETAILS</span>
          </Link>
        </p>
        <div className="box-3__container"></div>
      </div>
    </section>
  );
}

export default Summer;
