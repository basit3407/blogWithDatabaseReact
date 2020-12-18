import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Compose(props) {
  const [post, setPost] = useState({ title: "", content: "" });
  const [isSubmitted, setISSubmitted] = useState(false);
  const { _id } = useParams();
  const { handleError } = props;

  const url = `http://localhost:5000/user/${_id}/add`;

  function handleSubmit(event) {
    axios
      .post(`${url}/new`, post)
      .then(() => {
        setISSubmitted(true);
      })
      .catch((err) => {
        console.error(err.response);

        err.response.status === 409
          ? confirmAlert({
              title: "Confirm to Submit",
              message:
                "This title alredy exisits, Do you still want to submit it??",
              buttons: [
                {
                  label: "Yes",
                  onClick: () => {
                    axios
                      .post(`${url}/duplicate`, post)
                      .then(() => {
                        setISSubmitted(true);
                      })
                      .catch((err) => {
                        handleError(err.reponse.status);
                      });
                  },
                },
                {
                  label: "No",
                  onClick: () => setISSubmitted(false),
                },
              ],
            })
          : handleError(err.reponse.status);
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
