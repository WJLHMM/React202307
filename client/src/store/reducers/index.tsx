import { AnyAction, combineReducers, ReducersMapObject, Reducer } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import home from "./home";
import mine from "./mine";
import profile from "./profile";
import { CombinedState } from "@/typings/state";
import history from "../history";

let reducer: ReducersMapObject<CombinedState, AnyAction> = {
  home,
  mine,
  profile,
  router: connectRouter(history),
};
const rootReducer: Reducer<CombinedState, AnyAction> =
  combineReducers<CombinedState>(reducer);

// export type CombinedState = {
//   [key in keyof typeof reducer]: ReturnType<(typeof reducer)[key]>;
// };

export default rootReducer;
