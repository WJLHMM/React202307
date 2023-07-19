import React, { PropsWithChildren, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { CombinedState } from "@/typings/state";
import { ProfileState, LOGIN_TYPES } from "@/typings/state";
import "./index.less";
import mapDispatchToProps from "@/store/action/profile";
import NavHeader from "@/components/NavHeader";
import { Button, Descriptions, Alert } from "antd";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

// interface Props {}
function Profile(props: Props) {
  useEffect(() => {
    props.validator();
  }, []);
  let content;
  console.log("props=", props);
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null;
  } else if (props.loginState === LOGIN_TYPES.LOGINED) {
    let {
      user: {
        data: { username },
      },
    } = props as any;
    let {
      user: {
        data: { email },
      },
    } = props as any;
    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="用户名">{username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
          {/* <Descriptions.Item label="用户名">{username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{email}</Descriptions.Item> */}
        </Descriptions>
        <Button type="primary" danger onClick={props.logout}>
          退出
        </Button>
      </div>
    );
  } else {
    content = (
      <>
        <Alert
          type="warning"
          message="未登录"
          description="您尚未登录，请您注册或者登录"
        ></Alert>
        <div>
          <Button type="dashed" onClick={() => props.history.push("/login")}>
            登录
          </Button>
          <Button type="dashed" onClick={() => props.history.push("/register")}>
            注册
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <section>
        <NavHeader history={props.history}>个人中心</NavHeader>
        {content}
      </section>
    </>
  );
}
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
