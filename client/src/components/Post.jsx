import Header from "./Header";
import Footer from "./Footer";
import React from "react";
import { useParams } from "react-router";

function Post(props) {
  const { postTitle } = useParams();
  return (
    <div className="container">
      <Header />
      <h1>{postTitle}</h1>
      {/* <p>{props.content}</p> */}
      <Footer />
    </div>
  );
}

export default Post;
