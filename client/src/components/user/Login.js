import React, {Fragment, useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {validateEmail} from "../../utils/validateEmail";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = ({onClick}) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {customer, login, error, clearErrors, isAuthenticated} = authContext;
  const {setAlert} = alertContext;
  const [loginForm, setLoginForm] = useState(customer);

  const {email, password} = loginForm;
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setAlert("Logged in", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (error === "Invalid credentials") {
      setAlert("Incorrect email or password", "danger");

      window.scrollTo(0, 0);
      clearErrors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated]);

  const onChange = e => setLoginForm({...loginForm, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
      window.scrollTo(0, 0);
    } else if (!validateEmail(email)) {
      setAlert("Please enter a valid email", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Fragment>
      <section className="login">
        <ul className="login__list">
          <li className="login__item">Sign in</li>
          <li className="login__item not-active" onClick={onClick}>
            Register
          </li>
        </ul>
        <form action="" className="login-form" onSubmit={onSubmit}>
          <label htmlFor="email" className="login-form__label">
            Email address
          </label>
          <input type="email" name="email" className="login-form__input" onChange={onChange} />
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login-form__input"
            onChange={onChange}
          />
          <input type="submit" value="Sign in" className="login-form__submit" />
          <button className="login-form__forgotten">Forgotten Password?</button>
        </form>
      </section>
      <p className="copyright">&copy; 2023 Ellnot Company</p>
    </Fragment>
  );
};

export default Login;
