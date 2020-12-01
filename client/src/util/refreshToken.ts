import Axios from "axios";
import jwtDecode from "jwt-decode";
import { store } from "store";
import { userAction } from "store";

export const refreshToken = () => {
  const token = localStorage.fbIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(userAction.logout() as any);
      window.location.href = "/login";
    } else {
      store.dispatch({ type: userAction.SET_AUTHENTICATED });
      Axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(userAction.getUserData() as any);
    }
  }
};
