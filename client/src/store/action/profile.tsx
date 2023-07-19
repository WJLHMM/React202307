import * as actionTypes from "@/store/action-types";
import { validator } from "@/api/profile";
import { push } from "connected-react-router";
import { RegisterPayload } from "@/typings/profile";
import { register } from "@/api/profile";
import { message } from "antd";

export default {
  validator() {
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
    return (dispatch: any, getState: any) => {
      (async function () {
        try {
          let result: any = await register(value);
          if (result.data.success) {
            dispatch(push("/login"));
          } else {
            message.error("注册为成功，资料填写有错误");
          }
        } catch (e) {
          message.error("注册为成功，资料填写有错误");
        }
      })();
    };
  },
};
