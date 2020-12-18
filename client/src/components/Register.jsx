import Axios from "axios";
import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

function Register(props) {
  const [userDetails, setUserDetails] = useState({
    _id: "",
    _v: "",
    name: "",
    email: "",
    password: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setUserDetails((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  }

  function handleSubmit(event) {
    if (
      document.getElementById("password").value ===
      document.getElementById("confirm").value
    ) {
      Axios.post(`http://localhost5000/register/`, userDetails)
        .then(() => {
          setIsRegistered(true);
          event.preventDefault();
        })
        .catch((e) => {
          e.response.status === 400 || e.response.status === 11000
            ? setError(e.message)
            : props.handleError(e.response.status);
        });
    } else {
      setError("confirm password and password are not same");
    }
  }

  return (
    <main className="register-main">
      <div className="container">
        {isRegistered && <Redirect to="/" />}
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
                  for="name"
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
                </div>
              </div>

              <div className="form-group register">
                <label
                  for="email"
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
                </div>
              </div>

              <div className="form-group register">
                <label
                  for="password"
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
                </div>
              </div>

              <div className="form-group register">
                <label for="confirm" className="cols-sm-2 control-label">
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
                </div>
              </div>
              {error && <span style={{ color: "red" }}>{error}</span>}

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

export default Register;
