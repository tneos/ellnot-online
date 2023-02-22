import React from "react";
import {Link} from "react-router-dom";

import Page from "./wrappers/Page";

function Sales() {
  return (
    <Page title="Home">
      <section className="sales">
        <div className="sales__container">
          <div className="sales__text">
            <h3 className="sales__title">Up to 50% off</h3>
            <h3 className="sales__offer">Save on your first order with signup</h3>
            <Link to="/clothing/sales" className="sales__link">
              <h3 className="sales__all">SHOP ALL SALE</h3>
            </Link>
          </div>
          <div className="sales__options">
            <div className="sales__options--1">
              <h3 className="options-text">
                15%
                <br />
                OFF
              </h3>
            </div>
            <div className="sales__options--2">
              <h3 className="options-text">
                30%
                <br />
                OFF
              </h3>
            </div>
            <div className="sales__options--3">
              <h3 className="options-text">
                50%
                <br />
                OFF
              </h3>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default Sales;
