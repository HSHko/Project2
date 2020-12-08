import axios from "axios";
import NextRouter from "next/router";
import { NextPageContext } from "next";
import * as nookies from "nookies";
import cookieCutter from "cookie-cutter";
import { getCookie } from "util/getCookie";

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
  errors: object;
  isAuthenticated: boolean;
  credentials: object;
  likes: [];
  notifications: [];
}

const initialState: State = {
  isLoading: false,
  errors: {},
  isAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export const setAuthorizationHeader = (token) => {
  // localStorage.setItem("fbIdToken", token);
  cookieCutter.set("fbIdToken", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log("token cookie & axios headers setted");
};

export const logout = () => (dispatch) => {
  // localStorage.removeItem("fbIdToken");
  cookieCutter.set("fbIdToken", "", { expires: new Date(0) });
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  console.log("token expired");
  window.location.reload();
};

export const setUser = (userDetailsQry) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: userDetailsQry.data,
  });
};

export const signUp = (userData) => async (dispatch) => {
  try {
    console.log({ "signup submit data": userData });
    dispatch({ type: SET_LOADING });
    const signUpQry = await axios.post("/api/signup", userData);

    dispatch({ type: CLEAR_ERRORS });
    NextRouter.push("/join/signin");
  } catch (err) {
    console.error({ err });
    const res = err.response.data;
    let errors: any = {};

    // if (res.signId) errors.signId = ""
    if (res.email) errors.email = "正しいEメール入力してください。";
    if (res.password) {
      errors.password = "正しいパスワードをく入力してください。";
      errors.password += "パスワードは6文字以上を入力してください。";
    }

    if (res.confirm_password)
      errors.confirm_password = "パスワードが一致していないです。";

    if (res.code) {
      let msg = "";
      switch (res.code) {
        case "registered":
          msg = "既に登録されているIDです。";
          errors.sign_id = msg;
          break;
        case "auth/email-already-in-use":
          msg = "既に登録されているEメールです。";
          errors.email = msg;
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

export const signIn = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });

    const signInQry = await axios.post("/api/signin", userData);
    setAuthorizationHeader(signInQry.data.token);

    const userDetailsQry = await axios.post("/api/userdetails");
    dispatch(setUser(userDetailsQry));

    dispatch({ type: CLEAR_ERRORS });
    // window.location.reload();
  } catch (err) {
    console.error(err);
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

export default function fun(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
        isLoading: false,
      };
    case SET_AUTHENTICATED:
      console.log(action.type);
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      console.log(action.type);
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_USER:
      console.log(action.type);
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    // case UNLIKE_SCREAM:
    //   return {
    //     ...state,
    //     likes: state.likes.filter(
    //       (like) => like.screamId !== action.payload.screamId,
    //     ),
    //   };
    // case MARK_NOTIFICATIONS_READ:
    //   state.notifications.forEach((not) => (not.read = true));
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(setUser());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(setUser());
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
