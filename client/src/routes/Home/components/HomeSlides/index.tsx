import React, { PropsWithChildren, useEffect } from "react";
import "./index.less";
import { Carousel } from "antd";
import { Slides } from "@/typings";

type Props = PropsWithChildren<{
  slides: Slides[];
  getSlides: () => void;
}>;

const contentStyle: React.CSSProperties = {
  height: "160px",
  width: "375px",
  lineHeight: "160px",
  textAlign: "center",
};
function HomeSlides(props: Props) {
  useEffect(() => {
    if (props.slides.length === 0) {
      props.getSlides();
    }
    // console.log("useEffect-props=", props.slides);
  }, []);
  return (
    <Carousel autoplay>
      {props.slides.map((item, idx) => {
        return (
          <div
            className="home-img-container"
            key={item.id}
            style={contentStyle}
          >
            <img src={item.url} alt={item.id} />
          </div>
        );
      })}
    </Carousel>
  );
}
export default HomeSlides;
