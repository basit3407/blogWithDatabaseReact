import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Post from "./components/Post";
import Compose from "./components/Compose";
import Error from "./components/Error";

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/post/:postTitle" component={Post} />
        <Route path="/compose" exact component={Compose} />
        <Route path="*" component={Error} />
      </Switch>
    </main>
  );
}

export default App;
