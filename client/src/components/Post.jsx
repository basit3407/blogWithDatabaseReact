import Header from "./Header";
import Footer from "./Footer";
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
import Error404 from "./Error404";

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
  const [error404, setError404] = useState(false);
  const { postTitle } = useParams();
  const { handleError } = props;

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
              })
              .catch((error) => {
                handleError(error);
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
    // if title same no action
    if (previousValue !== selectedPost) {
      axios
        .put(`http://localhost:5000/`, selectedPost)
        .then(() => {
          axios
            .get(`http://localhost:5000/updatepost/${selectedPost._id}`)
            .then((editedPost) => {
              setSelectedPost(editedPost.data);
              setEditClicked(false);
            })
            .catch((err) => handleError(err));
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
                      .put("http://localhost:5000/duplicatetitle", selectedPost)
                      .then(() => {
                        axios
                          .get(
                            `http://localhost:5000/updatepost/${selectedPost._id}`
                          )
                          .then((editedPost) => {
                            setSelectedPost(editedPost.data);
                            setEditClicked(false);
                          })
                          .catch((err) => handleError(err));
                      })
                      .catch((err) => handleError(err));
                  },
                },
                {
                  label: "No",
                  onClick: () => setEditClicked(true),
                },
              ],
            });
          } else {
            handleError(err);
          }
        });
    } else {
      setEditClicked(false);
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${postTitle}`)
      .then((res) => {
        setSelectedPost(res.data);
      })
      .catch((err) =>
        err.response.status === 404 ? setError404(true) : handleError(err)
      );
  }, [postTitle, handleError]);

  return (
    <main>
      {deleteClicked && <Redirect to="/" />}
      {error404 && <Redirect to="/Error404" component={Error404} />}

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
