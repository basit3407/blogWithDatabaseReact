import axios from "axios";
import { SET_POSTS } from "./types";
import { confirm } from "../confirmAlert/confirmAlert";
import { saveErrors } from "./authActions";

export const url = `/api/users/`;

// Add Post
export const addPost = (post, userId, p, history) => (dispatch) =>
  axios
    .post(`${url}${userId}/post/add/${p}`, post)
    .then((res) =>
      dispatch(setPosts(res.data)).then(() =>
        history.push(`/user/${userId}/home`)
      )
    )
    .catch((e) => dispatch(saveErrors(e.reponse.data)));

//Edit Post
export const editPost = (post, userId, p, postId) => (dispatch) =>
  axios
    .put(`${url}${userId}/post/${postId}/update/${p}`, post)
    .then((res) => dispatch(setPosts(res.data)))
    .catch((e) => dispatch(saveErrors(e.response.data)));

//Delte Post
export const deletePost = (userId, postId, history) => (dispatch) =>
  axios
    .delete(`${url}${userId}/post/${postId}`)
    .then((res) =>
      dispatch(res.data).then(() => history.push(`${url}${userId}/home`))
    )
    .catch((e) => saveErrors(e.reponse.data));

//Add duplicate confirm
export const addDuplicateConfirm = (id, post, userId, history, postId) => {
  if (
    confirm(
      "This post title alread exisits",
      "Do you still want to submit this post??"
    ) === "yes"
  ) {
    if (id === "add") addPost(post, userId, "duplicate", history);
    if (id === "edit") editPost(post, userId, "duplicate", postId);
  }
};

// Set posts
export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
};
