import axios from "axios";
import jwtDecode from "jwt-decode";
import { store } from "store";
import { userAction } from "store";

export const refreshToken = () => {
  const token = localStorage.fbIdToken;
  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log({
      // firebase의 기본 토큰 유효기간은 1시간
      "남은 토큰 유효시간(sec)": (decodedToken.exp * 1000 - Date.now()) / 1000,
    });
    if (decodedToken.exp * 1000 - Date.now() < 0) {
      store.dispatch(userAction.logout() as any);
      window.location.href = "/join/signin";
      alert("ログイン有効期間切れのためログアウトされました。");
    } else {
      store.dispatch(userAction.setUser() as any);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      store.dispatch(userAction.setUser() as any);
      console.log({ "token refreshed": token });
    }
  }
};
