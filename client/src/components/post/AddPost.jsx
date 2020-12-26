import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";
import { addPost, addDuplicateConfirm } from "../../actions/postActions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getErrors } from "../auth/Register";

export default function AddPost() {
  const [post, setPost] = useState({ title: "", content: "" });

  const history = useHistory();
  const error = useSelector(getErrors);
  const loggedIn = useSelector(getLoggedIn);
  const userId = useSelector(getUserId);

  if (!loggedIn) history.push("/login");

  const handleSubmit = (event) => {
    addPost(post, userId, "new", history);
    if (error.status === 409)
      addDuplicateConfirm("add", post, userId, history, undefined);
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  };

  return (
    <main>
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>

            <input
              onChange={handleChange}
              className="form-control"
              name="title"
              value={post.title}
            ></input>
            <span style={{ color: "red" }}>{error.title}</span>

            <label>Content</label>
            <textarea
              onChange={handleChange}
              className="form-control"
              name="content"
              rows="5"
              cols="30"
              value={post.content}
            ></textarea>
            <span style={{ color: "red" }}>{error.content}</span>
          </div>
          <button className="btn btn-primary" type="submit" name="button">
            Publish
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
}

const getLoggedIn = (state) => state.auth.loggedIn;
const getUserId = (state) => state.auth.userId;
