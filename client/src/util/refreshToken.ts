import axios from "axios";
import jwtDecode from "jwt-decode";
import { store } from "store";
import { userAction } from "store";

export const refreshToken = () => {
  const token = localStorage.fbIdToken;
  if (token) {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(userAction.logout() as any);
      window.location.href = "/login";
    } else {
      store.dispatch({ type: userAction.SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      store.dispatch(userAction.setUser() as any);
      console.log({ "token refreshed": token });
    }
  }
};
