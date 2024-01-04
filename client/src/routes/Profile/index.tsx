import React, { PropsWithChildren, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { CombinedState } from "@/typings/state";
import { ProfileState, LOGIN_TYPES } from "@/typings/state";
import "./index.less";
import mapDispatchToProps from "@/store/action/profile";
import NavHeader from "@/components/NavHeader";
// import ProfileAvatarUpload from "./components/profileAvatarUpload";
import { Button, Descriptions, Alert, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
// interface Props {}
function Profile(props: Props) {
  useEffect(() => {
    props.loginValidator();
  }, []);
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.data is url from server
      let { success, data, resonseInfo } = info.file.response;
      if (success) {
        setLoading(false);
        props.changeAvatar(data);
      } else {
        message.error(resonseInfo);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  let content;
  // let userId = props.user!._id as User["id"];
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null;
  } else if (props.loginState === LOGIN_TYPES.LOGINED) {
    let {
      user: { username, email },
    } = props as any;
    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="个人头像">
            {/* <ProfileAvatarUpload {...props} /> */}
            <Upload
              name="avatar"
              listType="picture-circle"
              className="profileAvtarUpload avatar-uploader"
              showUploadList={false}
              action="http://localhost:8001/user/avatarUpload" //这里是相后台发请求
              beforeUpload={beforeUpload}
              onChange={handleChange}
              data={{ userId: props.user!.id }}
            >
              {props.user!.avatar ? (
                <img
                  src={props.user!.avatar}
                  alt="avatar"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Descriptions.Item>
          <Descriptions.Item label="用户名">{username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
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
