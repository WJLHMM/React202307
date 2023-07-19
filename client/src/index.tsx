import React from "react";
import ReactDOM from "react-dom";
// import { Switch, Route, Redirect, Navigate  } from "react-router-dom"; Switch Redirct在V6中全部删除，
import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/common.less"; //这里放公共的样式
import { ConnectedRouter } from "connected-react-router";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale/zh_CN";
import history from "./store/history";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Mine from "./routes/Mine";
// import Detail from "./routes/Detail";
import Tabs from "./components/Tabs";
// import "lib-flexible";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <HashRouter>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mine" element={<Mine />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Tabs />
        </HashRouter>
      </ConfigProvider>
    </ConnectedRouter>
    {/* <h1>Hello </h1> */}
  </Provider>,
  document.getElementById("root")
);
