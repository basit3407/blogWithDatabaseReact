import Header from "../layout/Header";
import Footer from "../layout/Footer";
import React, { useEffect, useState, useRef } from "react";
import { Redirect, useParams } from "react-router";
import axios from "axios";
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

function Post(props) {
  const [selectedPost, setSelectedPost] = useState({
    title: "",
    content: "",
    _id: "",
    _v: "",
  });

  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const { _id, postId } = useParams();
  const { handleError, loggedIn } = props;
  const url = `http://localhost5000/user/${_id}/posts/${postId}`;

  function handleClickDelete() {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you Sure",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(url)
              .then(() => {
                setDeleteClicked(true);
              })
              .catch((error) => {
                handleError(error.reponse.status);
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

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const previousValue = usePrevious(selectedPost);

  function handleClickUpdate() {
    previousValue !== selectedPost
      ? axios
          .put(`${url}/update`, selectedPost)
          .then(() => {
            axios
              .get(`${url}/updated`)
              .then((editedPost) => {
                setSelectedPost(editedPost.data);
                setEditClicked(false);
              })
              .catch((err) => handleError(err.reponse.status));
          })
          .catch((err) => {
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
                          .put(`${url}/update/duplicate`, selectedPost)
                          .then(() => {
                            axios
                              .get(`${url}/updated`)
                              .then((editedPost) => {
                                setSelectedPost(editedPost.data);
                                setEditClicked(false);
                              })
                              .catch((err) => handleError(err.reponse.status));
                          })
                          .catch((err) => handleError(err.reponse.status));
                      },
                    },
                    {
                      label: "No",
                      onClick: () => setEditClicked(true),
                    },
                  ],
                })
              : handleError(err.reponse.status);
          })
      : setEditClicked(false);
  }

  useEffect(() => {
    axios
      .get(`${url}`)
      .then((res) => {
        setSelectedPost(res.data);
      })
      .catch((err) => handleError(err.response.status));
  }, [url, handleError]);

  return (
    <main>
      {!loggedIn && <Redirect to="/" />}
      {deleteClicked && <Redirect to="/" />}

      <Header />
      <div className="container">
        {editClicked ? (
          <div className="form-group">
            <label>Title</label>
            <input
              onChange={handleChange}
              value={selectedPost.title}
              type="text"
              name="title"
              className="form-control"
            ></input>
          </div>
        ) : (
          <h1>{selectedPost.title}</h1>
        )}

        {editClicked ? (
          <div className="form-group">
            <label>Content</label>
            <textarea
              onChange={handleChange}
              className="form-control"
              value={selectedPost.content}
              name="content"
              rows="5"
              columns="30"
            ></textarea>
          </div>
        ) : (
          <p>{selectedPost.content} </p>
        )}

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
      </div>
      <Footer />
    </main>
  );
}

export default Post;
