import React, { PropsWithChildren } from "react";
import { connect } from "react-redux";
// import { RouteComponentProps, StaticContext } from "react-router";
import { RouteComponentProps, withRouter } from "react-router";
import { CombinedState } from "@/typings/state";
import { HomeState } from "@/typings/state";
import "./index.less";
import HomeHeader from "./components/HomeHeader";
import mapDispatchToProps from "@/store/action/home";
// interface IParams {}
type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;
// interface Props {}
function Home(props: Props) {
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
      />
    </>
  );
}
const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
