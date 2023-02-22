import React, {Fragment, useEffect} from "react";

const Students = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="students">
        <img src="../../../img/students.jpg" alt="students pic" className="students__image" />
        <div className="students__description">
          <h3 className="students__title">Student discount!</h3>
          <h1 className="students__offer">10% OFF</h1>
          <h3 className="students__duration">all year round</h3>
          <p className="students__details">
            Register or login and use your student ID when shopping. It's that easy to enjoy 10%
            off
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Students;
