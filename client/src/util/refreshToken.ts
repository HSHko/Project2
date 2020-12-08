import axios from "axios";
import jwtDecode from "jwt-decode";
import { getCookie } from "util/getCookie";
import { store } from "store";
import { userAction } from "store";

export const refreshToken = (preStore) => {
  const token = getCookie("fbIdToken", document.cookie);
  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log({
      // firebase의 기본 토큰 유효기간은 1시간
      "남은 토큰 유효시간(sec)": (decodedToken.exp * 1000 - Date.now()) / 1000,
    });
    if (Date.now() - decodedToken.exp * 1000 > 0) {
      store.dispatch(userAction.logout() as any);
      window.location.href = "/join/signin";
      alert("ログイン有効期間切れのためログアウトされました。");
    } else {
      userAction.setAuthorizationHeader(token);
      store.dispatch(userAction.setUser(preStore.userDetails) as any);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log({ "token refreshed": token });
    }
  }
};
