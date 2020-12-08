import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Post from "./components/Post";
import Compose from "./components/Compose";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/post" component={Post} />
        <Route path="/compose" component={Compose} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
