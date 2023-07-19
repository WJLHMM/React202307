import { composeWithDevTools } from "@redux-devtools/extension";
import {
  createStore,
  legacy_createStore,
  applyMiddleware,
  Store,
  AnyAction,
  compose,
} from "redux";
import promise from "redux-promise";
import thunk from "redux-thunk";
import logger from "redux-logger";
import history from "./history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";
import { CombinedState } from "@/typings/state";

// const composeEnhancers =
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux-thunk 中间件
// const enhancer = composeWithDevTools(
//   applyMiddleware(routerMiddleware(history), promise, thunk, logger)
// );

let store: Store<CombinedState, AnyAction> = applyMiddleware(
  routerMiddleware(history),
  promise,
  thunk,
  logger
)(legacy_createStore)(rootReducer);

// let store: Store<CombinedState, AnyAction> = composeWithDevTools(
//   applyMiddleware(routerMiddleware(history), promise, thunk, logger)
// )(legacy_createStore)(rootReducer);

// let store: Store<CombinedState, AnyAction> = legacy_createStore(
//   rootReducer,
//   composeWithDevTools(
//     applyMiddleware(routerMiddleware(history), promise, thunk, logger)
//   )
// );

export default store;
