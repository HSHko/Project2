import { createStore } from "redux";
import { combineReducers } from "redux";
import sideBar, * as sideBars from "./sideBar";
import dialog, * as dialogs from "./dialog";

// 스토어를 만들고, 내보내줌
export { sideBars, dialogs };

const rootReducer = combineReducers({
  sideBar,
  dialog,
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureStore() {
  // const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  // const store = createStore(modules, devTools);
  const store = createStore(rootReducer);
  return store;
}
