import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Compose() {
  const [post, setPost] = useState({ title: "", content: "" });
  const [isSubmitted, setISSubmitted] = useState(false);

  function handleSubmit(event) {
    axios
      .post("http://localhost:5000/", post)
      .then(() => {
        setISSubmitted(true);
        setPost({ title: "", content: "" });
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
                    .then((res) => {
                      console.log(res.data);
                      setISSubmitted(true);
                    });
                },
              },
              {
                label: "No",
                onClick: () => setISSubmitted(false),
              },
            ],
          });
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
