import React from "react";
import {Link} from "react-router-dom";

function Offers() {
  return (
    <section className="offers">
      <h3 className="section-title">Up to 70% Spring Sales</h3>
      <div className="offers__container">
        <div className="card">
          <Link className="card__link" to="/clothing/jeans">
            <img className="card__img" src="../img/jeans.jpg" alt="jeans pic" />
            <h4 className="card__title">Jeans</h4>
          </Link>
        </div>

        <div className="card">
          <Link className="card__link" to="/clothing/cardigans">
            <img className="card__img" src="../img/jumpers.jpg" alt="jumpers pic" />
            <h4 className="card__title">Cardigans</h4>
          </Link>
        </div>

        <div className="card">
          <Link className="card__link" to="/shoes-accessories/boots">
            <img className="card__img" src="../img/boots.jpg" alt="boots pic" />
            <h4 className="card__title">Boots</h4>
          </Link>
        </div>

        <div className="card">
          <Link className="card__link" to="/shoes-accessories/handbags">
            <img className="card__img" src="../img/bags.jpg" alt="bags pic" />
            <h4 className="card__title">Bags</h4>
          </Link>
        </div>

        <div className="card">
          <Link className="card__link" to="/clothing/dresses">
            <img className="card__img" src="../img/dresses.jpg" alt="dresses pic" />
            <h4 className="card__title">Dresses</h4>
          </Link>
        </div>

        <div className="card">
          <Link className="card__link" to="/shoes-accessories/accessories">
            <img className="card__img" src="/img/accessories.jpg" alt="accessories pic" />
            <h4 className="card__title">Accessories</h4>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Offers;
