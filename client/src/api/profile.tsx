import request from "./index";
import { RegisterPayload } from "@/typings/profile";

export function validator() {
  return request
    .get("/user/validator")
    .catch((error) => console.log("validator=.", error)); //注意这里需要处理一下，以防止页面报错，无法正常显示
}

export function register(value: RegisterPayload) {
  return request
    .post("/user/register", value)
    .catch((error) => console.log("register=.", error)); //注意这里需要处理一下，以防止页面报错，无法正常显示
}
