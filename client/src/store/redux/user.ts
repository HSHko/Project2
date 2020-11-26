import axios from "axios";
import { uiAction } from "store";

const SET_LOADING = "user/SET_LOADING" as const;
const CLEAR_LOADING = "ui/CLEAR_LOADING" as const;
const SET_ERRORS = "user/SET_ERRORS" as const;
const CLEAR_ERRORS = "user/CLEAR_ERRORS" as const;
const SET_USER = "user/SET_USER" as const;
const SET_AUTHENTICATED = "user/SET_AUTHENTICATED" as const;
const SET_UNAUTHENTICATED = "user/SET_UNAUTHENTICATED" as const;
const MARK_NOTIFICATIONS_READ = "user/MARK_NOTIFICATIONS_READ" as const;
const LIKE_SCREAM = "user/LIKE_SCREAM" as const;
const UNLIKE_SCREAM = "user/UNLIKE_SCREAM" as const;

export const set_user = () => ({
  type: SET_USER,
});

interface State {
  isLoading: boolean;
  errors: any;
  authenticated: boolean;
  credentials: any;
  likes: any;
  notifications: any;
}

const initialState = {
  isLoading: false,
  errors: {},
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function fun(state: State = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      console.log(action.type);
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      console.log(action.type);
      return {
        ...state,
        errors: null,
      };
    case SET_LOADING:
      console.log(action.type);
      return {
        ...state,
        isLoading: true,
      };
    case CLEAR_LOADING:
      console.log(action.type);
      return {
        ...state,
        isLoading: false,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        state,
      };
    case SET_USER:
      console.log(action.type);
      return {
        authenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(like => like.screamId !== action.payload.screamId),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}

const setAuthorizationHeader = token => {
  const fbIdToken = `Bearer ${token}`;
  localStorage.setItem("fbIdToken", fbIdToken);
  axios.defaults.headers.common["Authorization"] = fbIdToken;
};

export const getUserData = () => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    const userQry = await axios.get("/api/user");
    dispatch({
      type: SET_USER,
      payload: userQry.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const login = (userData, history) => async dispatch => {
  try {
    dispatch({ type: uiAction.SET_LOADING });
    const apiQry = await axios.post("/api/login", userData);
    setAuthorizationHeader(apiQry.data.token);
    console.log(apiQry.data.token);
    await dispatch(getUserData());
    dispatch({ type: uiAction.CLEAR_ERRORS });
    history.push("/");
  } catch (err) {
    dispatch({
      type: uiAction.SET_ERRORS,
      payload: err,
    });
  }
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("fbIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post("/notifications", notificationIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch(err => console.log(err));
};
