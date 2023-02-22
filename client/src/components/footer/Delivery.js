import React, {Fragment, useEffect} from "react";

const Delivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="delivery">
        <h1 className="delivery__title">Delivery and Collection</h1>
        <div className="door">
          <h3 className="door__title">To your door</h3>
          <section className="section">
            <h4 className="section__title">Standard Delivery</h4>
            <p className="section__details">Delivered within 5 working days</p>
            <p className="section__details">
              <span className="section__span">£4 Free</span> on orders over £50+
            </p>
          </section>
          <section className="section">
            <h4 className="section__title">Next &amp; Nominated day</h4>
            <p className="section__details">
              Order by 10pm on weekdays or by 5pm on weekends for next day
            </p>
            <span className="section__span">£5</span>
          </section>
          <section className="section">
            <h4 className="section__title">Time Slot</h4>
            <p className="section__details">Pick up a time that suits you 7 days in advance</p>
            <span className="section__span">£6</span>
          </section>
        </div>
        <div className="pick-up">
          <h3 className="pick-up__title">Pick it up</h3>
          <section className="section">
            <h4 className="section__title">Collect from Ellnot</h4>
            <p className="section__details">Ready to collect within 5 working days</p>
            <span className="section__span">£1 Free on orders £20+</span>
          </section>
          <section className="section">
            <h4 className="section__title">Collect from a local shop</h4>
            <p className="section__details">
              Over a 1000 locations including John Lewis, ASDA and Collect+
            </p>
            <p className="section__details--little">
              Ready to collect within 5 working days. Order by 6pm for next day collection
            </p>
            <span className="section__span">£4 Free on orders £45+ / £3 next day</span>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Delivery;
