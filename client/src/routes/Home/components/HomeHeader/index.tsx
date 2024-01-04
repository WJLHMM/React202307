import React, { useState, CSSProperties } from "react";
import classnames from "classnames";
import { BarsOutlined } from "@ant-design/icons";
import { Transition } from "react-transition-group";
import "./index.less";
import "./index.scss";
const duration = 1000; //动画的持续时间

//CSSProperties 其实就是行内样式的对象定义
const defaultStyle: CSSProperties = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

interface Props {
  currentCategory: string; //当前选中的分类 此数据会放在redux仓库中
  setCurrentCategory: (currentCategory: string) => any; //改变仓库中的分类
  refreshLessons: Function;
}

interface TransitionStyles {
  entering: CSSProperties;
  entered: CSSProperties;
  exiting: CSSProperties;
  exited: CSSProperties;
  unmounted: CSSProperties;
}

const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

function HomeHeader(props: Props) {
  let [isMenuShow, setIsMenuShow] = useState(false);
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = event.target as HTMLUListElement;
    // let target = event.target;
    let category: string | undefined;
    category = target.dataset.category;

    if (category) {
      //这里做个判断 以防止类型报错 TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
      // Type 'undefined' is not assignable to type 'string'.
      props.setCurrentCategory(category);
      props.refreshLessons();
    }
    setIsMenuShow(false);
    // console.log("taget=", target, category);
    // console.log("taget=", target);
  };
  // console.log("Props=", props);
  return (
    <header className="home-header">
      <div className="logo-header">
        Header
        <BarsOutlined
          onClick={() => {
            setIsMenuShow(!isMenuShow);
          }}
        />
      </div>
      <Transition in={isMenuShow} timeout={duration}>
        {(state: keyof TransitionStyles) => (
          // console.log("state=", state),
          <ul
            className="category"
            onClick={setCurrentCategory}
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <li
              data-category="all"
              className={classnames({
                active: props.currentCategory === "all",
              })}
            >
              所有的
            </li>
            <li
              data-category="react"
              className={classnames({
                active: props.currentCategory === "react",
              })}
            >
              React方面的
            </li>
            <li
              data-category="vue"
              className={classnames({
                active: props.currentCategory === "vue",
              })}
            >
              Vue方面的
            </li>
          </ul>
        )}
      </Transition>
    </header>
  );
}

export default HomeHeader;
