import React, { PropsWithChildren } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./index.less";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { ProfileState, CombinedState } from "@/typings/state";
import mapDispatchToProps from "@/store/action/profile";
import NavHeader from "@/components/NavHeader";
// import "@/utils/anyscValidatorWarning";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

function Login(props: Props) {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    event.preventDefault();
    event.stopPropagation();
    form
      .validateFields()
      .then((values) => {
        props.login(values);
      })
      .catch((errorInfo) => {
        message.error(errorInfo.errorFields[0].errors[0]);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error({
      type: "error",
      content: errorInfo.errorFields[0].errors[0],
    });
  };
  return (
    <>
      <NavHeader history={props.history}>登录</NavHeader>
      <Form
        form={form}
        className="login-form"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your Username!" },
            // { max: 12, message: "最大值12个字符" },
            // { min: 4, message: "最小值4个字符" },
            // {
            //   pattern: /^[a-zA-Z0-9_-]{6,12}$/g,
            //   message: "用户名8-16位数，只能包含字母，数字，下划线，减号",
            // },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="用户名"
            // onChange={async (event) => {
            //   event.preventDefault();
            //   event.stopPropagation();
            //   try {
            //     await form.validateFields();
            //   } catch (e) {
            //     // do nothing
            //   }
            // }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            // {
            //   pattern:
            //     /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/g,
            //   message:
            //     "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符",
            // },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Link to={"/register"}>注册</Link>
        </Form.Item>
      </Form>
    </>
  );
}
let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
