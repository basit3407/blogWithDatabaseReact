import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Compose(props) {
  const [post, setPost] = useState({ title: "", content: "" });
  const [isSubmitted, setISSubmitted] = useState(false);
  const { handleError } = props;

  function handleSubmit(event) {
    axios
      .post("http://localhost:5000/", post)
      .then(() => {
        setISSubmitted(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          confirmAlert({
            title: "Confirm to Submit",
            message:
              "This title alredy exisits, Do you still want to submit it??",
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                  axios
                    .post("http://localhost:5000/duplicatetitle", post)
                    .then(() => {
                      setISSubmitted(true);
                    })
                    .catch((err) => handleError(err.response.status));
                },
              },
              {
                label: "No",
                onClick: () => setISSubmitted(false),
              },
            ],
          });
        } else {
          handleError(err.response.status);
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

            <label>Content</label>
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
      </div>
      <Footer />
    </main>
  );
}

export default Compose;
