import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { GET_ERRORS } from "../../actions/types.";

export default function Register() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const error = useSelector(getErrors);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserDetails((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    document.getElementById("password").value ===
    document.getElementById("confirm").value
      ? registerUser(userDetails, history)
      : dispatch({
          type: GET_ERRORS,
          payload: {
            passwordMatch: "password should be equal to confirm password",
          },
        });

    event.preventDefault();
  };

  const history = useHistory();

  return (
    <main className="register-main">
      <div className="container">
        <div className="row main">
          <div className="panel-heading">
            <div className="panel-title text-center">
              <h1 className="title">Daily Journal</h1>
              <hr />
            </div>
          </div>
          <div className="main-login main-center">
            <form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="cols-sm-2 control-label register-label"
                >
                  Your Name
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control register-input"
                      name="name"
                      placeholder="Enter your Name"
                      value={userDetails.name}
                      onChange={handleChange}
                    />
                  </div>
                  <span style={{ color: "red" }}>{error.name}</span>
                </div>
              </div>

              <div className="form-group register">
                <label
                  htmlFor="email"
                  className="cols-sm-2 control-label register-label"
                >
                  Your Email
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control register-input"
                      name="email"
                      placeholder="Enter your Email"
                      value={userDetails.email}
                      onChange={handleChange}
                    />
                  </div>
                  <span style={{ color: "red" }}>{error.email}</span>
                </div>
              </div>

              <div className="form-group register">
                <label
                  htmlFor="password"
                  className="cols-sm-2 control-label register-label"
                >
                  Password
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control register-input"
                      name="password"
                      id="password"
                      value={userDetails.password}
                      onChange={handleChange}
                      placeholder="Enter your Password"
                    />
                  </div>
                  <span style={{ color: "red" }}>{error.password}</span>
                </div>
              </div>

              <div className="form-group register">
                <label htmlFor="confirm" className="cols-sm-2 control-label">
                  Confirm Password
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control register-input"
                      name="confirm"
                      id="confirm"
                      placeholder="Confirm your Password"
                    />
                  </div>
                  <span style={{ color: "red" }}>{error.passwordMatch}</span>
                </div>
              </div>

              <div className="form-group register">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block login-button"
                >
                  Register
                </button>
              </div>
              <div className="login-register">
                <Link to="/">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getErrors = (state) => state.errors;
