import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Post from "./components/Post";
import Compose from "./components/Compose";
import Error404 from "./components/Error404";
import Error500 from "./components/Error500";
import { Redirect } from "react-router";

function App() {
  const [errorCode, setErrorCode] = useState(null);

  function handleErrors(errorStatusCode) {
    if (errorStatusCode === 404) {
      setErrorCode(404);
    } else {
      setErrorCode(500);
    }
  }

  return (
    <main>
      {errorCode === 404 && <Redirect to="/Error404" component={Error404} />}
      {errorCode === 500 && <Redirect to="/Error500" />}
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} handleError={handleErrors} />}
        />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route
          path="/post/:postTitle"
          render={(props) => <Post {...props} handleError={handleErrors} />}
        />
        <Route
          path="/compose"
          render={(props) => <Compose {...props} handleError={handleErrors} />}
        />
        <Route path="/Error500" component={Error500} />
        <Route path="*" component={Error404} />
      </Switch>
    </main>
  );
}

export default App;
