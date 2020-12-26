import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/about/About";
import Contact from "./components/about/Contact";
import Post from "./components/post/Post";
import Error500 from "./components/errors/Error500";
import Error404 from "./components/errors/Error404";
import { useHistory } from "react-router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import { getErrors } from "./components/auth/Register";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AddPost from "./components/post/AddPost";

function App() {
  const errors = useSelector(getErrors);

  const history = useHistory();
  if (errors.status === 404) history.push("/Error404");
  if (errors.status === 500) history.push("/Error500");

  return (
    <main>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/user/:userId/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/user/:userId/posts/:postId" component={Post} />
        <Route exact path="/user/:userId/addPost" component={AddPost} />
        <Route exact path="/Error500" component={Error500} />
        <Route path="*" component={Error404} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
