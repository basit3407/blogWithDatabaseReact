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

function App() {
  const [error, setError] = useState(false);

  function handleErrors(error) {
    error && setError(true);
  }

  return (
    <main>
      {error && <Redirect to="/Error500" />}
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} handleError={handleErrors} />}
        />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route
          exact
          npm
          path="/post/:postTitle"
          render={(props) => <Post {...props} handleError={handleErrors} />}
        />
        <Route
          path="/compose"
          render={(props) => <Compose {...props} handleError={handleErrors} />}
        />
        <Route exact path="/Error500" component={Error500} />
        <Route path="*" component={Error404} />
      </Switch>
    </main>
  );
}

export default App;
