import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import sideBarReducer, * as sideBarAction from "./redux/sideBar";
import dialogReducer, * as dialogAction from "./redux/dialog";
import userReducer, * as userAction from "./redux/user";
import uiReducer, * as uiAction from "./redux/ui";

// 스토어를 만들고, 내보내줌
// 액션모듈타입 참고: https://react-etc.vlpt.us/07.typescript-redux.html
// type IncrementAction = ReturnType<typeof counterActions.increment>;
// type DecrementAction = ReturnType<typeof counterActions.decrement>;
// type Actions = IncrementAction | DecrementAction;
// 리덕스는 ducks 구조로 작성
export { sideBarAction, dialogAction, userAction, uiAction };

const rootReducer = combineReducers({
  sideBarReducer,
  dialogReducer,
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
