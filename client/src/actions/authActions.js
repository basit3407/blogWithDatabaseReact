import axios from "axios";
import { GET_ERRORS, SET_LOGIN_STATUS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/register", userData)
    .then(() => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/login", userData)
    .then((res) => {
      // Set loggedIn Status
      if (res.status === 200) {
        dispatch(setLoginStatus(true));
        dispatch(setCurrentUser(res.data));
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
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
