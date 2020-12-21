import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Post from "./components/Post";
import Compose from "./components/Compose";
import Error500 from "./components/Error500";
import Error404 from "./components/Error404";
import { Redirect } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotEmail from "./components/ForgotPassword";

function App() {
  const [error, setError] = useState(null);

  function handleErrors(statusCode, message) {
    if (statusCode === 404 || statusCode === 500) setError(statusCode);
    else setError(message);
  }

  return (
    <main>
      {error === 404 && <Redirect to="/Error404" />}
      {error === 500 && <Redirect to="/Error500" />}
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Login {...props} handleError={handleErrors} error={error} />
          )}
        />
        <Route
          exact
          path="/register"
          render={(props) => (
            <Register {...props} handleError={handleErrors} error={error} />
          )}
        />
        <Route exact path="/forgot" component={ForgotEmail} />
        <Route
          exact
          path="/user/:_id/home"
          render={(props) => <Home {...props} handleError={handleErrors} />}
        />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route
          exact
          npm
          path="/user/:_id/posts/:postId"
          render={(props) => <Post {...props} handleError={handleErrors} />}
        />
        <Route
          exact
          path="/user/:_id/add"
          render={(props) => <Compose {...props} handleError={handleErrors} />}
        />
        <Route exact path="/Error500" component={Error500} />
        <Route path="*" component={Error404} />
      </Switch>
    </main>
  );
}

export default App;
