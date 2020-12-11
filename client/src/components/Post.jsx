import Header from "./Header";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import axios from "axios";
import Error from "./Error";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export function IconLabelButtons() {
  const classes = useStyles();
  return classes;
}

function Post() {
  const [selectedPost, setSelectedPost] = useState({});
  // const [editedPost, setEditedPost] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const { postTitle } = useParams();

  function handleClickDelete() {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you Sure",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`http://localhost:5000/post/${selectedPost._id}`)
              .then(() => {
                setDeleteClicked(true);
              });
          },
        },
        {
          label: "No",
          onClick: () => setDeleteClicked(false),
        },
      ],
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    setSelectedPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  }

  function handleClickEdit() {
    setEditClicked(true);
  }

  function handleClickUpdate() {
    axios
      .put(`http://localhost:5000/`, selectedPost)
      .then((res) => {
        console.log(res.data);

        axios
          .get(`http://localhost:5000/${selectedPost._id}`)
          .then((editedPost) => {
            console.log(editedPost.data);
            setSelectedPost(editedPost.data);
            setEditClicked(false);
          });
      })
      .catch((err) => {
        console.error("Error response:");
        console.error(err.response.data); // ***
        console.error(err.response.status); // ***
        console.error(err.response.headers); // ***
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
                    .put("http://localhost:5000/duplicatetitle", selectedPost)
                    .then((res) => {
                      console.log(res.data);

                      axios
                        .get(`http://localhost:5000/${selectedPost._id}`)
                        .then((editedPost) => {
                          console.log(editedPost.data);
                          setSelectedPost(editedPost.data);
                          setEditClicked(false);
                        });
                    });
                },
              },
              {
                label: "No",
                onClick: () => setEditClicked(true),
              },
            ],
          });
        }
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${postTitle}`)
      .then((res) => {
        setSelectedPost(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error("Error response:");
        console.error(err.response.data); // ***
        console.error(err.response.status); // ***
        console.error(err.response.headers); // ***
        setError(err.response.status);
      });
  }, [error, postTitle]);

  return (
    <main>
      {deleteClicked && <Redirect to="/" />}
      {error && <Redirect to="/Error404" component={Error} />}
      <div className="container">
        <Header />
        <h1>
          <input
            onChange={handleChange}
            // value={editClicked ? editClicked.title : selectedPost.title}
            value={selectedPost.title}
            style={{ border: "none", resize: "none" }}
            disabled={editClicked ? false : true}
            type="text"
            name="title"
          ></input>
        </h1>
        <p>
          <textarea
            onChange={handleChange}
            style={{ border: "none", resize: "none" }}
            disabled={editClicked ? false : true}
            type="text"
            value={selectedPost.content}
            // value={editClicked ? editClicked.content : selectedPost.content}
            name="content"
          ></textarea>
        </p>

        {editClicked ? (
          <Button
            onClick={handleClickUpdate}
            variant="contained"
            color="primary"
            size="small"
            className={IconLabelButtons.button}
            endIcon={<Icon>send</Icon>}
          >
            Update
          </Button>
        ) : (
          <span>
            <Button
              onClick={handleClickDelete}
              variant="contained"
              size="small"
              color="primary"
              className={IconLabelButtons.button}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              onClick={handleClickEdit}
              variant="contained"
              size="small"
              color="primary"
              className={IconLabelButtons.button}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </span>
        )}
        <Footer />
      </div>
    </main>
  );
}

export default Post;
