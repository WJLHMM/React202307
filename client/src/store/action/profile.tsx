import * as actionTypes from "@/store/action-types";
import { validator } from "@/api/profile";
import { push } from "connected-react-router";
import { RegisterPayload, LoginPayload } from "@/typings/profile";
import { RegisterResponseData, LoginResponseData } from "@/typings/response";
import { register, login } from "@/api/profile";
import { message } from "antd";

export default {
  loginValidator() {
    return {
      type: actionTypes.VALIDATE,
      payload: validator(),
    };
  },
  logout() {
    //注意这里需要给返回的函数定义一个类型，否则Profile Element 会报错
    return function (dispatch: any): any {
      sessionStorage.removeItem("access_token");
      dispatch(push("/login"));
    };
  },
  register(value: RegisterPayload): any {
    return function (dispatch: any, getState: any) {
      register<RegisterResponseData>(value)
        .then((result) => {
          console.log("result", result);
          if (result && result!.success) {
            dispatch(push("/login"));
          } else {
            console.log("result=", result);
            message.error(`注册为未成功，返回值为${result}`);
          }
        })
        .catch((e) => {
          console.log(e);
          message.error(`注册未成功--${e.message}`); //这里接受从api register 捕捉的错误，显示错误原因
        });
    };
  },
  login(value: LoginPayload): any {
    return function (dispatch: any, getState: any) {
      (async function () {
        try {
          let result: LoginResponseData = await login<LoginResponseData>(value);
          if (result!.success) {
            message.info("您已登录成功");
            sessionStorage.setItem("access_token", result.data);
            dispatch(push("/profile"));
          } else {
            message.error(`登录未成功1${result}`);
          }
        } catch (e: any) {
          message.error(`登录未成功: ${e!.message}`);
        }
      })();
    };
  },
  changeAvatar(avatarUrl: string) {
    return {
      type: actionTypes.CHANGE_AVATAR,
      payload: avatarUrl,
    };
  },
};
