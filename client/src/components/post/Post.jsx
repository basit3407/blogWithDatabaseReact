import Header from "../layout/Header";
import Footer from "../layout/Footer";
import React, { useState, useRef, useEffect } from "react";
import { Button, Icon } from "@material-ui/core";
import { DeleteIcon, EditIcon } from "@material-ui/icons";
import { IconLabelButtons } from "../../material ui/materialUI";
import { useHistory, useParams } from "react-router";
import {
  editPost,
  addDuplicateConfirm,
  deletePost,
} from "../../actions/postActions";
import { useSelector } from "react-redux";
import { getUser } from "../Home/Home";
import { getErrors } from "../auth/Register";
import { confirm } from "../../confirmAlert/confirmAlert";

export default function Post() {
  const [editClicked, setEditClicked] = useState(false);
  const [post, setPost] = useState({ title: "", content: "" });
  const { postId } = useParams();
  const { loggedIn, userId, posts } = useSelector(getUser);

  const history = useHistory();
  const errors = useSelector(getErrors);

  if (!loggedIn) history.push("/login");

  useEffect(() => {
    setPost(posts.find((post) => postId === post._id));
  }, [posts, postId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const handleClickDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this post",
        "click yes to proceed"
      ) === "yes"
    )
      deletePost(userId, postId, history);
  };

  const handleClickEdit = () => {
    setEditClicked(true);
  };

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const previousValue = usePrevious(post);

  const handleClickUpdate = () => {
    if (previousValue !== post) {
      editPost(post, userId, "original", postId);
      if (errors.status === 409)
        addDuplicateConfirm("edit", post, userId, undefined, postId);
    }
  };

  return (
    <main>
      <Header />
      <div className="container">
        {editClicked ? (
          <div className="form-group">
            <label>Title</label>
            <input
              onChange={handleChange}
              value={post.title}
              type="text"
              name="title"
              className="form-control"
            ></input>
          </div>
        ) : (
          <h1>{post.title}</h1>
        )}

        {editClicked ? (
          <div className="form-group">
            <label>Content</label>
            <textarea
              onChange={handleChange}
              className="form-control"
              value={post.content}
              name="content"
              rows="5"
              columns="30"
            ></textarea>
          </div>
        ) : (
          <p>{post.content} </p>
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
