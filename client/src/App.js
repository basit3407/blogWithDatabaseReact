import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Post from "./components/Post";
import Compose from "./components/Compose";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  const url = "http://localhost:5000/";

  function onSubmit(post) {
    axios.post(url, post).then((res) => console.log(res.data));
  }

  //   useEffect(() => axios.get(url).then((res) => setPosts(res.data)));

  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route
          path="/post"
          render={(props) => (
            <Post {...props} title={posts.title} content={posts.content} />
          )}
        />
        <Route
          path="/compose"
          render={(props) => <Compose {...props} onSubmit={onSubmit} />}
        />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
