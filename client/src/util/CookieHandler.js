// 다음을 참고해서 만듦:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

export default class CookieHandler {
  #cookies;

  // document.cookie == key=value;key=value;key=value;key=value;key=value;key=value;key=value
  constructor(cookies) {
    this.#cookies = cookies || document.cookie;
  }

  getAll() {
    return this.#cookies;
  }

  get(name) {
    const cookies = this.#cookies;
    const value = `;${cookies}`;
    const parts = value.split(`;${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return undefined;
  }

  // =====================================================================================
  // path
  // URL path(경로)의 접두사로, 이 경로나 이 경로의 하위 경로에 있는 페이지만 쿠키에 접근 가능
  // ex. path=/admin 인 경우 /admin과 /admin / something에선 볼 수 있지만, /home 이나 /adminpage에선 볼 수 없음
  // 미설정인 경우 현재 url로 설정. 특별한 경우가 아니라면 path=/ 로 설정하면 좋음
  // =====================================================================================
  // expires와 max-age
  // expires(유효 일자)나 max-age(만료 기간) 옵션이 지정되어있지 않으면,
  // 브라우저가 닫힐 때 쿠키도 함께 삭제됩니다.이런 쿠키를 "세션 쿠키(session cookie)"라고 부릅니다.
  // expires 나 max-age 옵션을 설정하면 브라우저를 닫아도 쿠키가 삭제되지 않습니다.
  //
  // document.cookie = "user=John; max-age=3600";    1시간 뒤에 쿠키가 삭제됩니다.
  // document.cookie = "user=John; max-age=0";       만료 기간을 0으로 지정하여 쿠키를 바로 삭제함
  // =====================================================================================
  // secure
  // 이 옵션을 설정하면 HTTPS로 통신하는 경우에만 쿠키가 전송됩니다.
  set(name, value, options) {
    options = {
      path: options.path || "/",
      maxAge: options.maxAge || "94608000", // max-age=31536000 => 1year
    };
    document.cookie = `${name}=${value};path=${options.path};max-age=${options.maxAge}`;
    this.#cookies = document.cookie;
  }

  remove(name, options) {
    options = {
      path: options.path || "/",
    };
    document.cookie = `${name}=expunge;path=${options.path};max-age=0`;
    this.#cookies = document.cookie;
  }
}

// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import { store } from "store";
// import { userAction } from "store";

// export const refreshToken = (preStore) => {
//   const token = getCookie("fbIdToken", document.cookie);
//   if (token) {
//     const decodedToken: any = jwtDecode(token);
//     console.log({
//       // firebase의 기본 토큰 유효기간은 1시간
//       "남은 토큰 유효시간(sec)": (decodedToken.exp * 1000 - Date.now()) / 1000,
//     });
//     if (Date.now() - decodedToken.exp * 1000 > 0) {
//       store.dispatch(userAction.logout() as any);
//       window.location.href = "/join/signin";
//       alert("ログイン有効期間切れのためログアウトされました。");
//     } else {
//       userAction.setAuthorizationHeader(token);
//       store.dispatch(userAction.setUser(preStore.userDetails) as any);
//       // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       console.log({ "token refreshed": token });
//     }
//   }
// };
