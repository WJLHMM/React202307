import { AnyAction, ReducersMapObject, Reducer } from "redux";
import { combineReducers } from "redux-immer";
import { produce } from "immer";
import { connectRouter, RouterState } from "connected-react-router";
import home from "./home";
import mine from "./mine";
import profile from "./profile";
import cart from "./cart";
import { CombinedState } from "@/typings/state";
import history from "../history";

let reducer: ReducersMapObject<CombinedState, AnyAction> = {
  home,
  mine,
  profile,
  cart,
  router: connectRouter(history),
};
const rootReducer: Reducer<CombinedState, AnyAction> = combineReducers(
  produce,
  reducer
);

// export type CombinedState = {
//   [key in keyof typeof reducer]: ReturnType<(typeof reducer)[key]>;
// };

export default rootReducer;
