import React, { useEffect, forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import { Lesson, Lessons } from "@/typings";
import { MenuOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Skeleton } from "antd";

interface Props {
  children?: any;
  lessons?: any;
  getLessons?: any;
  container?: any;
}

// function LessonList(props: Props, lessonListRef: any) {
function LessonList(props: Props) {
  // const [_, forceUpdate] = useState(0);
  const [start, setStart] = useState(0);
  let rem = parseInt(document.documentElement.style.fontSize);
  useEffect(() => {
    if (props.lessons.list.length == 0) {
      props.getLessons();
    }
    // props.container.current.addEventListener("scroll", () => {
    //   localStorage.setItem(
    //     "lessonListIndex",
    //     props.container.current.scrollTop
    //   );
    //   forceUpdate((x) => x + 1);
    // });
    props.container.current.addEventListener("scroll", () => {
      // console.log("rem", rem);
      if (props.container.current) {
        let scrollTop = props.container.current.scrollTop;
        //轮播图=200px h6 38.53px   = 238/75=3.17  4.4747显示每张卡片的高度
        if (scrollTop - 3.17 * rem > 0) {
          let start = Math.floor((scrollTop - 4.76 * rem) / (6.7 * rem)); //
          setStart(start);
        }
      }
    });
  }, []);
  // let start = 0; //开始真正渲染的其实索引 从它开始向下渲染所需数据，其它的都用空div撑开
  // let rem = parseInt(document.documentElement.style.fontSize);
  // // console.log("rem", rem);
  // if (props.container.current) {
  //   let scrollTop = props.container.current.scrollTop;
  //   //轮播图=200px h6 38.53px   = 238/75=3.17  4.4747显示每张卡片的高度
  //   if (scrollTop - 3.17 * rem > 0) {
  //     start = Math.floor((scrollTop - 4.76 * rem) / (6.7 * rem)); //
  //   }
  // }
  return (
    <section>
      <h6>
        <MenuOutlined /> 全部课程
      </h6>
      <Skeleton
        loading={props.lessons.list.length == 0 && props.lessons.loading}
        active
        paragraph={{ rows: 8 }}
      >
        {props.lessons.list.map((item: Lesson, index: number) =>
          index >= start && index < start + 3 ? (
            // 这里注意路由v6的state传递方法
            <Link key={item.id} to={`/detail/${item.id}`} state={item}>
              <Card
                hoverable={true}
                style={{ width: "100%" }}
                cover={<img alt={item.title} src={item.poster} />}
              >
                <Card.Meta
                  title={item.title}
                  description={`价格: ${item.price}`}
                />
              </Card>
            </Link>
          ) : (
            <div key={index} style={{ height: `${6.7 * rem}px` }}></div>
          )
        )}
      </Skeleton>
      {props.lessons.hasMore ? (
        <Button
          onClick={props.getLessons}
          loading={props.lessons.loading}
          type="primary"
          block
        >
          {props.lessons.loading ? "" : "加载更多"}
        </Button>
      ) : (
        <Alert
          style={{ textAlign: "center" }}
          message="我是有底线的哦"
          type="warning"
        />
      )}
    </section>
  );
}

// export default forwardRef(LessonList);
export default LessonList;
