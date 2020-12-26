import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../actions/authActions";

export default function Login() {
  const [enteredDetails, setEnteredDetails] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setEnteredDetails((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginUser(enteredDetails);
    if (loggedIn) history.push(`user/${userId}/home`);
  }

  const error = useSelector(getErrors);
  const { loggedIn, userId } = useSelector(getLoginStatus);
  const history = useHistory();

  return (
    <div className="container">
      <div className="row">
        <aside className="col-sm-4">
          <div className="card">
            <article className="card-body">
              <Link
                to="/register"
                className="float-right btn btn-outline-primary"
              >
                Sign up
              </Link>
              <h4 className="card-title mb-4 mt-1">Sign in</h4>
              <p>
                <a
                  href="/auth/google"
                  className="btn btn-block btn-outline-info"
                >
                  <i className="fab fa-google"></i> Login via google
                </a>
                <a
                  href="/auth/facebook"
                  className="btn btn-block btn-outline-primary"
                >
                  <i className="fab fa-facebook-f"></i> Login via facebook
                </a>
              </p>
              <hr></hr>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    name="email"
                    value={enteredDetails.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email"
                    type="email"
                  ></input>
                </div>
                <span style={{ color: "red" }}>{error.email}</span>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={enteredDetails.password}
                    placeholder="******"
                    type="password"
                  ></input>
                </div>
                <span style={{ color: "red" }}>{error.password}</span>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                    <Link className="small" to="/forgot">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </form>
            </article>
          </div>
        </aside>
      </div>
    </div>
  );
}

const getErrors = (state) => state.errors;
const getLoginStatus = (state) => state.auth;
