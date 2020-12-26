/* eslint-disable import/no-anonymous-default-export */
import {
  SET_LOGIN_STATUS,
  SET_CURRENT_USER,
  SET_POSTS,
} from "../actions/types";

const initialState = { loggedIn: false, userId: "", posts: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
}
