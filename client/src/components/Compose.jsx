import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";

function Compose(props) {
  const [post, setPost] = useState({ title: "", content: "" });
  const [isDone, setisDone] = useState(false);

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
    <div className="container">
      <Header />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(post);
          setPost({ title: "", content: "" });
          setisDone(false);
        }}
      >
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
            // value={post.content}
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit" name="button">
          Publish
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Compose;
