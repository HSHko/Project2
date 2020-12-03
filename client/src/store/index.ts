import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import backdropReducer, * as backdropAction from "./redux/backdrop";
import sidebarReducer, * as sidebarAction from "./redux/sidebar";
import userReducer, * as userAction from "./redux/user";
import uiReducer, * as uiAction from "./redux/ui";

// 액션모듈타입 참고:
// https://react-etc.vlpt.us/07.typescript-redux.html
// ducks 구조로 작성
export { sidebarAction, backdropAction, userAction, uiAction };

const rootReducer = combineReducers({
  sidebarReducer,
  backdropReducer,
  userReducer,
  uiReducer,
});

// redux의 TypeScript type
export type RootState = ReturnType<typeof rootReducer>;

// redux thunk 설명:
// https://velog.io/@eomttt/Redux-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-Thunk-Saga
function configureStore() {
  // const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  // const store = createStore(modules, devTools);
  const store = createStore(rootReducer, applyMiddleware(reduxThunk));
  return store;
}

export const store = configureStore();
