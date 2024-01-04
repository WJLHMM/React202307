import React, { PropsWithChildren } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { History } from "history";
import "./index.scss";
// console.log("NavHEADER", __filename);
// const navigate = useNavigate();
// navigate('xxxx')

// type Props = PropsWithChildren<RouteComponentProps>;
type Props = PropsWithChildren<{
  history: History;
}>;

function NavHeader(props: Props) {
  return (
    <header className="nav-header">
      <LeftOutlined onClick={() => props.history.goBack()} />
      {props.children}
    </header>
  );
}

export default NavHeader;
