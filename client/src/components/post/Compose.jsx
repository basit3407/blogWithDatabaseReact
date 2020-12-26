import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {addPost} from "../../actions/postActions"

export default function Compose() {
  const [post, setPost] = useState({ title: "", content: "" });


  function handleSubmit(e) {

    addPost(post,userId);

    
    e.preventDefault();

    
    
      
        

        error.stat === 409
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
      {!loggedIn && <Redirect to="/" />}
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

const getErrors =(state)=>state.errors;


