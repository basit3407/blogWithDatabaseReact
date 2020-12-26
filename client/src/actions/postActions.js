import axios from "axios";
import { GET_ERRORS } from "./types";

// Add new Post
export const addPost = (post, userId) => (dispatch) =>
  axios
    .post(`/api/users/${userId}/add/new`, post)
    .catch((e) => dispatch({ type: GET_ERRORS, payload: e.reponse.data }));
