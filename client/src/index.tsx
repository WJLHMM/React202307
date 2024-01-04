import React, { lazy, Suspense } from "react";
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

const Profile = lazy(
  () =>
    import(
      /* webpackChunkName: "Profile" */
      /*webpackPrefetch: true*/
      "./routes/Profile"
    )
);
// import Profile from "./routes/Profile";
const Register = lazy(
  () =>
    import(
      /* webpackChunkName: "Register" */
      /*webpackPrefetch: true*/
      "./routes/Register/index"
    )
);
// import Register from "./routes/Register";
const Login = lazy(
  () =>
    import(
      /* webpackChunkName: "Login" */
      /*webpackPrefetch: true*/ "./routes/Login"
    )
);
// import Login from "./routes/Login";
const Mine = lazy(
  () =>
    import(
      /* webpackChunkName: "Mine" */
      /*webpackPrefetch: true*/
      "./routes/Mine"
    )
);
const Detail = lazy(
  () =>
    import(
      /* webpackChunkName: "Mine" */
      /*webpackPrefetch: true*/
      "./routes/Detail"
    )
);
const Cart = lazy(
  () =>
    import(
      /* webpackChunkName: "Mine" */
      /*webpackPrefetch: true*/
      "./routes/Cart"
    )
);
// import Mine from "./routes/Mine";
// import Detail from "./routes/Detail";
// const Tabs = lazy(() => import(/* webpackChunkName: "Tabs" */
/*webpackPrefetch: true*/
// "./components/Tabs"));
import Tabs from "./components/Tabs";
// import "lib-flexible";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mine" element={<Mine />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Tabs />
          </Suspense>
        </HashRouter>
      </ConfigProvider>
    </ConnectedRouter>
    {/* <h1>Hello </h1> */}
  </Provider>,
  document.getElementById("root")
);
