import React, {Fragment, useEffect} from "react";

const Returns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="returns">
        <img src="../../../img/returns.jpg" alt="returns pic" className="returns__image" />
        <div className="returns__description">
          <h3 className="returns__title">RETURNS POLICY</h3>
          <ul className="returns__list">
            <li className="returns__item">
              Items can be returned within 28 days of delivery or store purchase
            </li>
            <li className="returns__item">You'll need your original receipts or returns note</li>
            <li className="returns__item">
              Item should be clean, unworn, and with tags still attached
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Returns;
