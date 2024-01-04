import React, { PropsWithChildren, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { useParams, useLocation } from "react-router-dom";
import { CombinedState, Lesson, LessonItemResponseData } from "@/typings";
import "./index.less";
import mapDispatchToProps from "@/store/action/cart";
import NavHeader from "@/components/NavHeader";
import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getLesson } from "@/api/home";
interface Params {
  id: string;
}
interface StaticContext {
  statusCode?: number | undefined;
}
type Props = PropsWithChildren<
  RouteComponentProps<Params, StaticContext, Lesson> &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

// interface Props {}
function Detail(props: Props) {
  let location = useLocation();
  let [lesson, setLesson] = useState<Lesson>({} as Lesson);
  const addCartItem = (lesson: Lesson) => {
    props.addCartItem(lesson);
  };
  let { id } = useParams();
  useEffect(() => {
    (async () => {
      let lesson: Lesson = location.state;
      if (!lesson) {
        let result = await getLesson<LessonItemResponseData>(id);
        if (result!.success) {
          lesson = result!.data;
        }
      }
      setLesson(lesson);
    })();
  }, []);
  return (
    <>
      <div className="home-details">
        <NavHeader history={props.history}>Lesson Details</NavHeader>
        <Card
          hoverable={true}
          style={{ width: "100%" }}
          cover={<img alt={lesson.title} src={lesson.poster} />}
        >
          <Card.Meta
            title={lesson.title}
            description={`价格: ${lesson.price}`}
          />
        </Card>
        <Button
          className="my-cart"
          type="primary"
          icon={<ShoppingCartOutlined />}
          size="large"
          onClick={() => addCartItem(lesson)}
        >
          加入购物车
        </Button>
      </div>
    </>
  );
}
const mapStateToProps = (state: CombinedState): CombinedState => state;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
