import React, {Fragment, useEffect} from "react";

const Regulars = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="regulars">
        <img src="../../../img/regulars.jpg" alt="regulars pic" className="regulars__image" />
        <div className="regulars__description">
          <h3 className="regulars__title">Get your regulars discount</h3>
          <h1 className="regulars__offer">15% OFF</h1>
          <h3 className="regulars__duration">everything</h3>
          <p className="regulars__details">
            It's our turn to treat you for being such a loyal customer. A well deserved discount of
            15% off your next purchase for every £200 spent. We will let you know when you're
            eligible just with an email. It's only a little thank you..
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Regulars;
