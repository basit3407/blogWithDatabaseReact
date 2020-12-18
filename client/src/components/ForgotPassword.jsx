import React from "react";
import { Link } from "react-router-dom";

function ForgotEmail() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4 style={{ borderBottom: "1px solid #c5c5c5" }}>
            <i className="glyphicon glyphicon-user"></i>
            Account Access
          </h4>
          <div style={{ padding: "20px" }} id="form-olvidado">
            <form>
              <fieldset>
                <div className="form-group input-group">
                  <span className="input-group-addon">
                    {" "}
                    <i className="fa fa-envelope fa" aria-hidden="true"></i>
                  </span>
                  <input
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    type="email"
                    required=""
                    autofocus=""
                  ></input>
                </div>
                <div className="form-group input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-lock"></i>
                  </span>
                  <input
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value=""
                    required=""
                  ></input>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Access
                  </button>
                  <p className="help-block">
                    <Link
                      className="pull-right text-muted"
                      href=""
                      id="olvidado"
                    >
                      <small>Forgot your password?</small>
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
          <div style={{ display: "none" }} id="form-olvidado">
            <h4 className="">Forgot your password?</h4>
            <form>
              <fieldset>
                <span className="help-block">
                  Email address you use to log in to your account
                  <br></br>
                  We'll send you an email with instructions to choose Link new
                  password.
                </span>
                <div className="form-group input-group">
                  <span className="input-group-addon">@</span>
                  <input
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    type="email"
                    required=""
                  ></input>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  id="btn-olvidado"
                >
                  Continue
                </button>
                <p className="help-block">
                  <Link className="text-muted" to="/" id="acceso">
                    <small>Login</small>
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotEmail;
