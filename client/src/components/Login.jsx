import React, { useState } from "react";

function Login() {
  return (
    <div className="card">
      <article className="card-body">
        <a href="" className="float-right btn btn-outline-primary">
          Sign up
        </a>
        <h4 className="card-title mb-4 mt-1">Sign in</h4>
        <p>
          <a href="" className="btn btn-block btn-outline-info">
            {" "}
            <i className="fab fa-twitter"></i>   Login via Twitter
          </a>
          <a href="" className="btn btn-block btn-outline-primary">
            {" "}
            <i className="fab fa-facebook-f"></i>   Login via facebook
          </a>
        </p>
        <hr></hr>
        <form>
          <div className="form-group">
            <input
              name=""
              className="form-control"
              placeholder="Email or login"
              type="email"
            >
              {" "}
            </input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="******"
              type="password"
            >
              {" "}
            </input>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Login{" "}
                </button>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <a className="small" href="#">
                Forgot password?
              </a>
            </div>
          </div>
        </form>
      </article>
    </div>
  );
}

export default Login;
