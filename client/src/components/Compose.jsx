import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";

function Compose() {
  const [post, setPost] = useState({ title: "", content: "" });
  const [isSubmitted, setISSubmitted] = useState(false);

  function handleSubmit(event) {
    axios
      .post("http://localhost:5000/", post)
      .then((res) => {
        console.log(res.data);
        setISSubmitted(true);
        setPost({ title: "", content: "" });
      })
      .catch((err) => {
        console.error("Error response:");
        console.error(err.response.data); // ***
        console.error(err.response.status); // ***
        console.error(err.response.headers); // ***
        if (err.response.status === 409) {
          alert("Sorry this title already exisits. please choose new title");
        }
      });

    event.preventDefault();
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
            <label>Title</label>

            <input
              onChange={handleChange}
              className="form-control"
              name="title"
              value={post.title}
            ></input>

            <label>Post</label>
            <textarea
              onChange={handleChange}
              className="form-control"
              name="content"
              rows="5"
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
