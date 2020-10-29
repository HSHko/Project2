import { createStore } from "redux";
import { combineReducers } from "redux";
import sidebar, * as sidebars from "./sidebar";

// 스토어를 만들고, 내보내줌
export { sidebars };

export function configureStore() {
  // const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const modules = combineReducers({
    sidebar,
  });

  // const store = createStore(modules, devTools);
  const store = createStore(modules);
  return store;
}
