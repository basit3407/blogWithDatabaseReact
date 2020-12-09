import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";

function Compose() {
  const [post, setPost] = useState({ title: "", content: "" });
  const [isDone, setisDone] = useState(false);
  const [isSubmitted, setISSubmitted] = useState(false);

  function handleSubmit(event) {
    axios
      .post("http://localhost:5000/", post)
      .then((res) => console.log(res.data));
    event.preventDefault();
    setPost({ title: "", content: "" });
    setisDone(false);
    setISSubmitted(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  }

  return (
    <main>
      {isSubmitted && <Redirect to="/" />}
      <div className="container">
        <Header />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {isDone && <label>Title</label>}
            {isDone && (
              <input
                onChange={handleChange}
                className="form-control"
                name="title"
                value={post.title}
              ></input>
            )}

            <label>Post</label>
            <textarea
              onClick={() => setisDone(true)}
              onChange={handleChange}
              className="form-control"
              name="content"
              rows={isDone ? "5" : "1"}
              cols="30"
              value={post.content}
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit" name="button">
            Publish
          </button>
        </form>
        <Footer />
      </div>
    </main>
  );
}

export default Compose;
