import React, {Fragment, useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import {validateEmail} from "../../utils/validateEmail";

const Register = ({onClick}) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {customer, getEmail, checkEmail, emailUnique, error, clearErrors} = authContext;
  const {setAlert} = alertContext;

  const [customerEmail, setCustomerEmail] = useState(customer);

  const {email} = customerEmail;
  let navigate = useNavigate();
  console.log(onClick);

  const onChange = e => {
    setCustomerEmail({[e.target.name]: e.target.value});
    getEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (customerEmail === "" || !validateEmail(email)) {
      setAlert("Please enter a valid email", "danger");
    } else {
      checkEmail(customerEmail);
      customer.email = email;
    }
  };

  useEffect(() => {
    clearErrors();
    if (emailUnique) {
      setTimeout(() => {
        navigate("/myaccount/signup");
      }, 1000);
    } else if (error === "User already exists") {
      setAlert("Email address already in use", "danger");
    }

    // eslint-disable-next-line
  }, [emailUnique, error]);

  return (
    <Fragment>
      <section className="register">
        <ul className="register__list">
          <li className="register__item not-active" name="sign-in" onClick={onClick}>
            Sign in
          </li>
          <li className="register__item ">Register</li>
        </ul>
        <form className="register-form">
          <label htmlFor="email" className="register-form__label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="register-form__input"
            required
          />
          <Link to="/myaccount/signup">
            <input
              type="submit"
              value="Continue"
              onClick={handleSubmit}
              className="login-form__submit"
            />
          </Link>
        </form>
      </section>
      <p className="copyright">&copy; 2023 Ellnot Company</p>
    </Fragment>
  );
};

export default Register;
