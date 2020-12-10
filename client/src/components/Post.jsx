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
import "react-confirm-alert/src/react-confirm-alert.css"; //

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
  const [error, setError] = useState(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
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

  function handleClickEdit() {
    console.log("edit");
    console.log(selectedPost);
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
        <h1>{selectedPost.title}</h1>
        <p>{selectedPost.content}</p>
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
        <Footer />
      </div>
    </main>
  );
}

export default Post;
