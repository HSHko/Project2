import axios from "axios";
import Router from "next/router";

export const SET_LOADING = "user/SET_LOADING" as const;
export const SET_ERRORS = "user/SET_ERRORS" as const;
export const CLEAR_ERRORS = "user/CLEAR_ERRORS" as const;
export const SET_USER = "user/SET_USER" as const;
export const SET_AUTHENTICATED = "user/SET_AUTHENTICATED" as const;
export const SET_UNAUTHENTICATED = "user/SET_UNAUTHENTICATED" as const;
export const MARK_NOTIFICATIONS_READ = "user/MARK_NOTIFICATIONS_READ" as const;
export const LIKE_SCREAM = "user/LIKE_SCREAM" as const;
export const UNLIKE_SCREAM = "user/UNLIKE_SCREAM" as const;

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

const setAuthorizationHeader = (token) => {
  const fbIdToken = `Bearer ${token}`;
  localStorage.setItem("fbIdToken", fbIdToken);
  axios.defaults.headers.common["Authorization"] = fbIdToken;
};

export const getUserData = () => async (dispatch) => {
  try {
    const userQry = await axios.get("/api/userdetails");
    dispatch({
      type: SET_USER,
      payload: userQry.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const signIn = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });

    const signInQry = await axios.post("/api/signin", userData);
    setAuthorizationHeader(signInQry.data.token);

    await getUserData();

    dispatch({ type: CLEAR_ERRORS });
    Router.push("/");
  } catch (err) {
    const res = err.response.data;
    let errors: any = {};

    if (res.email) errors.email = "Eメールを正しく入力してください。";
    if (res.password) errors.password = "パスワードを正しく入力してください。";

    if (res.code) {
      let msg = "";
      switch (res.code) {
        case "auth/user-not-found":
          msg = "登録されていないユーザメールです。";
          errors.email = msg;
          break;
        case "auth/wrong-password":
          msg = "パスワードを確認してください。";
          errors.password = msg;
          break;
        case "auth/too-many-requests":
          msg =
            "このアカウントは多数のログイン失敗のため一時的にロックされました。";
          msg += "\n時間をおいて再度ログインしてください。";
          break;
        default:
          msg = "未設定エラーです。";
          msg += `\nERROR CODE: ${res.code}`;
          break;
      }
      alert(msg);
    }

    dispatch({
      type: SET_ERRORS,
      payload: errors,
    });
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch({ trpe: SET_LOADING });

    const signUpQry = await axios.post("/api/signup", userData);
    setAuthorizationHeader(signUpQry.data.token);

    await getUserData();

    dispatch({ type: CLEAR_ERRORS });
    Router.push("/");
  } catch (err) {
    const res = err.response.data;
    let errors: any = {};

    if (res.email) errors.email = "Eメールを正しく入力してください。";
    if (res.password) errors.password = "パスワードを正しく入力してください。";
    if (res.confirmPassword)
      errors.confirmPassword = "パスワードが一致したいません。";

    if (res.code) {
      let msg = "";
      switch (res.code) {
        case "registered":
          msg = "すでに登録されているメールです。";
          errors.email = msg;
          break;
        default:
          msg = "未設定エラーです。";
          msg += `\nERROR CODE: ${res.code}`;
          break;
      }
      alert(msg);
    }

    dispatch({
      type: SET_ERRORS,
      payload: errors,
    });
  }
};

type Action = ReturnType<typeof logout>;

export const logout = () => (dispatch) => {
  localStorage.removeItem("fbIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export default function fun(state: State = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      console.log(action.type);
      return {
        ...state,
        isLoading: true,
      };
    case SET_ERRORS:
      console.log(action.type);
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };
    case CLEAR_ERRORS:
      console.log(action.type);
      return {
        ...state,
        errors: null,
        isLoading: false,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
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
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId,
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};
