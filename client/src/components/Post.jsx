import Header from "./Header";
import Footer from "./Footer";
import React from "react";

function Post(props) {
  return (
    <div className="container">
      <Header />
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Footer />
    </div>
  );
}

export default Post;
