import React, {Fragment, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Page from "../wrappers/Page";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const MyAccount = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {updateUser, deleteUser, logout, user} = authContext;
  const {setAlert} = alertContext;

  const [userData, setUserData] = useState(user);

  const {firstName, lastName, email, day, month, year} = userData;

  let navigate = useNavigate();

  const onChange = e => {
    setUserData({...userData, [e.target.name]: e.target.value});
  };
  // Update account
  const onUpdate = e => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setAlert("Your account is updated", "success");
    console.log("Your account is updated");
    setTimeout(() => {
      updateUser(userData);
      navigate("/");
    }, 1000);
  };
  // Delete account
  const onDelete = e => {
    window.scrollTo(0, 0);
    e.preventDefault();
    deleteUser(email);
    logout();
    setTimeout(() => {
      navigate("/");
    }, 2000);
    setAlert("Your account is deleted", "danger");
    console.log("Your account is deleted");
  };

  return (
    <Page title="My account">
      <Fragment>
        <div className="my-account">
          <h1 className="my-account__title">My Account</h1>
          <form className="my-account__form">
            <div className="my-account__div">
              <label htmlFor="firstName" className="my-account__label">
                First name:
              </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={onChange}
                className="my-account__input"
              />
            </div>
            <div className="my-account__div">
              <label htmlFor="lastName" className="my-account__label">
                Last name:
              </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={onChange}
                className="my-account__input"
              />
            </div>
            <div className="my-account__div">
              <label htmlFor="customerEmail" className="my-account__label">
                Email address
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={onChange}
                className="my-account__input"
              />
            </div>
            <div className="my-account__div">
              <label className="my-account__label">Date of birth</label>
              <div className="date-of-birth">
                <select
                  name="day"
                  value={day}
                  onChange={onChange}
                  className="date-of-birth__input"
                >
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
                <select
                  name="month"
                  value={month}
                  onChange={onChange}
                  className="date-of-birth__input"
                >
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
                <select
                  name="year"
                  value={year}
                  onChange={onChange}
                  className="date-of-birth__input"
                >
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
            </div>
            <div className="my-account__buttons">
              <input
                type="submit"
                onClick={onUpdate}
                value="Update account"
                className="my-account__update"
              />
              <input
                type="submit"
                onClick={onDelete}
                value="Delete account"
                className="my-account__delete"
              />
            </div>
          </form>
        </div>
      </Fragment>
    </Page>
  );
};

export default MyAccount;
