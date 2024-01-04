import React, {
  PropsWithChildren,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { CombinedState, HomeState } from "@/typings";
import "./index.less";
import HomeHeader from "./components/HomeHeader";
import HomeSlides from "./components/HomeSlides";
import LessonList from "./components/LessonList";
import mapDispatchToProps from "@/store/action/home";
import { store, loadMore, downRefresh } from "@/utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { setLocalStorageHomeScrllTop } from "@/utils";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

function Home(props: Props) {
  let homeContainerRef = useRef<HTMLDivElement>(null);
  // let lessonListRef = useRef(null);
  useEffect(() => {
    let homeElement = homeContainerRef.current as HTMLDivElement;
    loadMore(homeElement, props.getLessons);
    downRefresh(homeElement, props.refreshLessons);
    // setLocalStorageHomeScrllTop(homeElement);
    if (props.lessons.list.length > 0) {
      let storeScrollTop = parseFloat(
        localStorage.getItem("lessonListIndex") as string
      );
      console.log("storeScrollTop", storeScrollTop);
      homeElement.scrollTop = storeScrollTop > 670 ? storeScrollTop - 670 : 0;
    }
    return () => {
      console.log(
        "lessonListIndex",
        homeElement,
        homeElement.getBoundingClientRect()
      );
      // localStorage.setItem("lessonListIndex", homeElement.scrollTop + " ");
      homeElement.removeEventListener("scroll", () =>
        localStorage.setItem("lessonListIndex", homeElement.scrollTop + " ")
      );
    };
  }, []);
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
        refreshLessons={props.refreshLessons}
      />
      <div className="refresh-loading">
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </div>
      <div className="home-container" ref={homeContainerRef}>
        <HomeSlides
          // container={homeContainerRef}
          slides={props.slides}
          getSlides={props.getSlides}
        />
        <LessonList
          // ref={lessonListRef}
          container={homeContainerRef}
          lessons={props.lessons}
          getLessons={props.getLessons}
        />
      </div>
    </>
  );
}
const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home as any)
);
