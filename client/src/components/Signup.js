import React, {useState, useContext, useEffect, Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";

import SubMenuContext from "../context/subMenu/subMenuContext";
import AuthContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";

import Page from "./wrappers/Page";

const Signup = () => {
  const subMenuContext = useContext(SubMenuContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {toggleSub1, toggleSub2, toggleSub3} = subMenuContext;
  const {customer, register, error, clearErrors, isAuthenticated} = authContext;
  const {setAlert} = alertContext;
  const [form, setForm] = useState(customer);

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      setAlert("Account created", "success");
    }
    if (error === "User already exists") {
      console.log(error);
      setAlert(error, "danger");
      window.scrollTo(0, 0);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const {title, firstName, lastName, email, email2, password, password2, day, month, year} = form;

  const activeSubMenu1 = () => {
    toggleSub1();
  };
  const activeSubMenu2 = () => {
    toggleSub2();
  };
  const activeSubMenu3 = () => {
    toggleSub3();
  };

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if (
      !title ||
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      email === "" ||
      !day ||
      !month ||
      !year
    ) {
      setAlert("Please enter all fields", "danger");
      window.scrollTo(0, 0);
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
      window.scrollTo(0, 0);
    } else if (email !== email2) {
      setAlert("Email addresses do not match", "danger");
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        register({
          title,
          firstName,
          lastName,
          email,
          password,
          day,
          month,
          year,
        });
      }, 100);

      window.scrollTo(0, 0);
    }
  };

  return (
    <Page title="Sign up">
      <Fragment>
        <nav className="nav-bar signup">
          <div className="logo logo-signup">
            <Link to="/" className="logo__title">
              Ellnot
            </Link>
          </div>
          <ul className="nav-list">
            <li className="nav-list__item item--1" onClick={activeSubMenu1}>
              WOMEN
            </li>
            <li className="nav-list__item item--2" onClick={activeSubMenu2}>
              GIRLS
            </li>
            <li className="nav-list__item item--3" onClick={activeSubMenu3}>
              SUMMER SHOP
            </li>
          </ul>
        </nav>
        <h1 className="signup-title">NEW CUSTOMER</h1>
        <form className="newCustomer" onSubmit={onSubmit}>
          <label htmlFor="title" className="newCustomer__label">
            Title
          </label>
          <select name="title" value={title} onChange={onChange} className="newCustomer__title">
            <option value="Please select">Please select</option>
            <option value="Miss">Miss.</option>
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
            <option value="Ms">Ms.</option>
            <option value="Mx">Mx.</option>
          </select>
          <label htmlFor="firstName" className="newCustomer__label">
            First name:
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            className="newCustomer__input"
          />
          <label htmlFor="lastName" className="newCustomer__label">
            Last name:
          </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            className="newCustomer__input"
          />
          <label htmlFor="customerEmail" className="newCustomer__label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            className="newCustomer__input"
          />
          <label htmlFor="customerEmail2" className="newCustomer__label">
            Confirm email address
          </label>
          <input
            type="text"
            name="email2"
            value={email2}
            onChange={onChange}
            className="newCustomer__input"
          />
          <label htmlFor="password" className="newCustomer__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="newCustomer__input"
          />
          <label htmlFor="password2" className="newCustomer__label">
            Confirm password
          </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            className="newCustomer__input"
          />
          <label className="newCustomer__label">Date of birth</label>
          <div className="d-o-b">
            <select name="day" value={day} onChange={onChange} className="d-o-b__input">
              <option value="0">Day</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <select name="month" value={month} onChange={onChange} className="d-o-b__input">
              <option value="0">Month</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select name="year" value={year} onChange={onChange} className="d-o-b__input">
              <option value="0">Year</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
              <option value="1999">1999</option>
              <option value="1998">1998</option>
              <option value="1997">1997</option>
              <option value="1996">1996</option>
              <option value="1995">1995</option>
              <option value="1994">1994</option>
              <option value="1993">1993</option>
              <option value="1992">1992</option>
              <option value="1991">1991</option>
              <option value="1990">1990</option>
              <option value="1989">1989</option>
              <option value="1988">1988</option>
              <option value="1987">1987</option>
              <option value="1986">1986</option>
              <option value="1985">1985</option>
              <option value="1984">1984</option>
              <option value="1983">1983</option>
              <option value="1982">1982</option>
              <option value="1981">1981</option>
              <option value="1980">1980</option>
              <option value="1979">1979</option>
              <option value="1978">1978</option>
              <option value="1977">1977</option>
              <option value="1976">1976</option>
              <option value="1975">1975</option>
              <option value="1974">1974</option>
              <option value="1973">1973</option>
              <option value="1972">1972</option>
              <option value="1971">1971</option>
              <option value="1970">1970</option>
              <option value="1969">1969</option>
              <option value="1968">1968</option>
              <option value="1967">1967</option>
              <option value="1966">1966</option>
              <option value="1965">1965</option>
              <option value="1964">1964</option>
              <option value="1963">1963</option>
              <option value="1962">1962</option>
              <option value="1961">1961</option>
              <option value="1960">1960</option>
              <option value="1959">1959</option>
              <option value="1958">1958</option>
              <option value="1957">1957</option>
              <option value="1956">1956</option>
              <option value="1955">1955</option>
              <option value="1954">1954</option>
              <option value="1953">1953</option>
              <option value="1952">1952</option>
              <option value="1951">1951</option>
              <option value="1950">1950</option>
              <option value="1949">1949</option>
              <option value="1948">1948</option>
              <option value="1947">1947</option>
              <option value="1946">1946</option>
              <option value="1945">1945</option>
              <option value="1944">1944</option>
              <option value="1943">1943</option>
              <option value="1942">1942</option>
              <option value="1941">1941</option>
              <option value="1940">1940</option>
              <option value="1939">1939</option>
              <option value="1938">1938</option>
              <option value="1937">1937</option>
              <option value="1936">1936</option>
              <option value="1935">1935</option>
              <option value="1934">1934</option>
              <option value="1933">1933</option>
              <option value="1932">1932</option>
              <option value="1931">1931</option>
              <option value="1930">1930</option>
              <option value="1929">1929</option>
              <option value="1928">1928</option>
              <option value="1927">1927</option>
            </select>
          </div>
          <input type="submit" value="Create account" className="newCustomer__submit" />
        </form>
      </Fragment>
    </Page>
  );
};

export default Signup;