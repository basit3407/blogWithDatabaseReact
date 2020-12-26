import axios from "axios";
import { GET_ERRORS, SET_LOGIN_STATUS, SET_CURRENT_USER } from "./types";
import { setPosts } from "./postActions";
import { url } from "./postActions";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`${url}register`, userData)
    .then(() => history.push("/login"))
    .catch((e) => dispatch(saveErrors(e.response.data)));
};

// Login
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${url}login`, userData)
    .then((res) => {
      // Set loggedIn Status
      if (res.status === 200) {
        dispatch(setLoginStatus(true));
        dispatch(setCurrentUser(res.data._id));
        dispatch(setPosts(res.data.posts));
      }
    })
    .catch((e) => dispatch(saveErrors(e.response.data)));
};

// Set logged in user
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// Logout
export const logoutUser = () => (dispatch) => {
  dispatch(setLoginStatus(false));
};

// Set login Status
export const setLoginStatus = (flag) => {
  return {
    type: SET_LOGIN_STATUS,
    payload: flag,
  };
};

// save Errors
export const saveErrors = (errors) => {
  return {
    type: GET_ERRORS,
    payload: errors,
  };
};
