import { User } from "./state";

//注册接口 返回的响应体的类型
export interface RegisterResponseData {
  success: boolean;
  data: User;
}
export interface LoginResponseData {
  success: boolean;
  data: string;
}
