import React, {useEffect, useState} from "react";

import Page from "../wrappers/Page";
import Login from "./Login";
import Register from "./Register";

const User = () => {
  const [register, setRegister] = useState(true);

  const onChange = () => {
    setRegister(!register);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page title="My account">
      <div className="user">
        <div className="company-logo">
          <h1 className="company-logo__title">Ellnot</h1>
        </div>
        <div className="user-main">
          {register ? <Login onClick={onChange} /> : <Register onClick={onChange} />}
        </div>
      </div>
    </Page>
  );
};

export default User;
