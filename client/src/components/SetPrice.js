import React from "react";
import {Link} from "react-router-dom";

function SetPrice() {
  return (
    <section className="set-price">
      <div className="set">
        <Link to="/under-10" className="set__link">
          <h3 className="set__text">
            UNDER <span className="set__price">£10</span>
          </h3>
        </Link>
      </div>
      <div className="set">
        <Link to="/under-15" className="set__link">
          <h3 className="set__text">
            UNDER <span className="set__price">£15</span>
          </h3>
        </Link>
      </div>
      <div className="set">
        <Link to="/under-20" className="set__link">
          <h3 className="set__text">
            UNDER <span className="set__price">£20</span>
          </h3>
        </Link>
      </div>
      <div className="set">
        <Link to="/under-25" className="set__link">
          <h3 className="set__text">
            UNDER <span className="set__price">£25</span>
          </h3>
        </Link>
      </div>
    </section>
  );
}

export default SetPrice;
