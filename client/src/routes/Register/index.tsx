import React, { PropsWithChildren } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./index.less";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
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

function Register(props: Props) {
  const [form] = Form.useForm();
  // const [messageApi, contextHolder] = message.useMessage();
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {//这里不传参，如果传承实际是value
  const handleSubmit = () => {
    event.preventDefault();
    event.stopPropagation();
    form
      .validateFields()
      .then((values) => {
        props.register(values);
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
    // messageApi.open({//这里需要react 18以后才能触发
    //   type: "error",
    //   content: errorInfo.errorFields[0].errors[0],
    // });
  };
  return (
    <>
      <NavHeader history={props.history}>注册</NavHeader>
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
            //   // await sleep(0);
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
        <Form.Item
          label="ConfirmPassword"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input the same pin as password!",
            },
            {
              validator: (_, value) => {
                const password = form.getFieldValue("password");
                if (password === value) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: "两次输入的密码需要一致",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="确认密码"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: " Pls fill your email address!",
            },
            // {
            //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g,
            //   message: "pls input the right email",
            // },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="邮箱"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交注册
          </Button>
          <Link to={"/login"}>登录</Link>
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
