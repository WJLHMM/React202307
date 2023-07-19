import React, { PropsWithChildren } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "./index.less";
import { Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { ProfileState, CombinedState } from "@/typings/state";
import mapDispatchToProps from "@/store/action/profile";
import NavHeader from "@/components/NavHeader";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

function Register(props: Props) {
  const [form] = Form.useForm();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("hello");
    form
      .validateFields()
      .then((values) => {
        console.log("values=", values);
      })
      .catch((errorInfo) => {
        message.error(errorInfo.errorFields[0].errors[0]);
        //console.log("errorInfo=", errorInfo);
      });
  };
  return (
    <>
      <NavHeader history={props.history}>注册</NavHeader>
      <Form form={form} className="login-form" onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="Username"
          rules={[
            { required: true, message: "Please input your Username!" },
            // { max: 12, message: "最大值12个字符" },
            // { min: 4, message: "最小值4个字符" },
            {
              pattern: /^[a-zA-Z0-9_-]{8,16}$/g,
              message: "用户名8-16位数，只能包含字母，数字，下划线，减号",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              pattern:
                /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/g,
              message:
                "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="ConfirmPassword"
          name="ConfirmPassword"
          rules={[
            {
              required: true,
              message: "Please input the same pin as password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: " Pls fill your email address!",
            },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g,
              message: "pls input the right email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
// const WrappedRegister = Form.create({ name: "注册表单" })(Register);
let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
