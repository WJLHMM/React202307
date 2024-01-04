import React, { PropsWithChildren } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./index.less";
import { Form, Input, Button, message } from "antd";
import FormComponentProps from "antd/lib/form";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { ProfileState, CombinedState } from "@/typings/state";
import mapDispatchToProps from "@/store/action/profile";
import NavHeader from "@/components/NavHeader";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps &
    typeof FormComponentProps<RegisterPayload>
>;

function Register(props: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.form.validateFields(async (errors: any, values: RegisterPayload) => {
      if (errors) {
        message.error("表单验证失败!");
      } else {
        props.register(values);
      }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <>
      <NavHeader history={props.history}>用户注册</NavHeader>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入你的用户名!" }],
          })(
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入你的密码!" }],
          })(
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("confirmPassword", {
            rules: [{ required: true, message: "请输入你的确认密码!" }],
          })(
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="确认密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "请输入你的邮箱!" }],
          })(
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="email"
              placeholder="邮箱"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
          或者 <Link to="/login">立刻登录!</Link>
        </Form.Item>
      </Form>
    </>
  );
}

const WrappedRegister = Form.create({ name: "login" })(Register);
let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegister);
