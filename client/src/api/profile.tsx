import request from "./index";
import { RegisterPayload, LoginPayload } from "@/typings";

export function validator() {
  return request
    .get("/user/validator")
    .catch((error) => console.log("validator=.", error)); //注意这里需要处理一下，以防止页面报错，无法正常显示
}

export function register<T>(value: RegisterPayload) {
  return request
    .post<T, T>("/user/register", value)
    .then((res) => res)
    .catch((error) => {
      throw Error(error.response.data.message);
    });
  //这里抛出错误信息，使得action profile中register接受 从而显示出报错的原因同时以防止页面报错，无法正常显示，在onReject中也可以设置
}
export function login<T>(value: LoginPayload) {
  return request.post<T, T>("/user/login", value).then(
    (res) => res,
    (reason) => {
      throw Error(reason.response.data.message);
    }
  );
  //这里抛出错误信息，使得action profile中register接受 从而显示出报错的原因同时以防止页面报错，无法正常显示，在onReject中也可以设置
}
