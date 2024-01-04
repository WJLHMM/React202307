import { RouterState } from "connected-react-router";
import { HomeState, CartState } from "./";
export interface MineState {}
//当前用户信息
export interface User {
  id?: string;
  username: string;
  email: string;
  avatar: string;
}
export enum LOGIN_TYPES {
  UN_VALIDATE = "UN_VALIDATE", //尚未验证登录
  LOGINED = "LOGINED", //已登录
  UN_LOGINED = "UN_LOGINED", //的确没有登录
}
export interface ProfileState {
  //loginSate各种状态不同，所以放个枚举
  loginState: LOGIN_TYPES;
  user: User | null;
  error: User | null;
}

export interface CombinedState {
  home: HomeState;
  mine: MineState;
  profile: ProfileState;
  cart: CartState;
  router: RouterState;
}
