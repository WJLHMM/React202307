import { AnyAction } from "redux";
import { MineState } from "@/typings/state";
const initialState: MineState = {};

function MineReducer(
  state: MineState = initialState,
  action: AnyAction
): MineState {
  return state;
}

export default MineReducer;
