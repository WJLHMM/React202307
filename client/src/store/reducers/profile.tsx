import { AnyAction } from "redux";
import { ProfileState, LOGIN_TYPES } from "@/typings/state";
import * as actionTypes from "@/store/action-types";

//ProfileState的初始值
const initialState: ProfileState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null,
};

function ProfileReducer(
  state: ProfileState = initialState,
  action: AnyAction
): ProfileState {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload && action.payload.success) {
        return {
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload,
          error: null,
        };
      } else {
        return {
          loginState: LOGIN_TYPES.UN_LOGINED,
          user: null,
          error: action.payload,
        };
      }
      break;
    case actionTypes.LOGOUT:
      return {
        loginState: LOGIN_TYPES.UN_LOGINED,
        user: null,
        error: null,
      };
      break;
    default:
  }
  return state;
}

export default ProfileReducer;
