import { Request, Response } from "express";
import { Lesson, ILessonDocument } from "../models";

export async function createInitLesson() {
  const lessons = await Lesson.find();
  if (lessons.length == 0) {
    const lessons = [
      {
        order: 1,
        title: "1.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥100.00元",
        category: "react",
      },
      {
        order: 2,
        title: "2.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥200.00元",
        category: "react",
      },
      {
        order: 3,
        title: "3.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥300.00元",
        category: "react",
      },
      {
        order: 4,
        title: "4.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥400.00元",
        category: "react",
      },
      {
        order: 5,
        title: "5.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥500.00元",
        category: "react",
      },
      {
        order: 6,
        title: "6.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥100.00元",
        category: "vue",
      },
      {
        order: 7,
        title: "7.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥200.00元",
        category: "vue",
      },
      {
        order: 8,
        title: "8.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥300.00元",
        category: "vue",
      },
      {
        order: 9,
        title: "9.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥400.00元",
        category: "vue",
      },
      {
        order: 10,
        title: "10.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥500.00元",
        category: "vue",
      },
      {
        order: 11,
        title: "11.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥600.00元",
        category: "react",
      },
      {
        order: 12,
        title: "12.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥700.00元",
        category: "react",
      },
      {
        order: 13,
        title: "13.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥800.00元",
        category: "react",
      },
      {
        order: 14,
        title: "14.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥900.00元",
        category: "react",
      },
      {
        order: 15,
        title: "15.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        price: "¥1000.00元",
        category: "react",
      },
      {
        order: 16,
        title: "16.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥600.00元",
        category: "vue",
      },
      {
        order: 17,
        title: "17.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥700.00元",
        category: "vue",
      },
      {
        order: 18,
        title: "18.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥800.00元",
        category: "vue",
      },
      {
        order: 19,
        title: "19.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥900.00元",
        category: "vue",
      },
      {
        order: 20,
        title: "20.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        price: "¥1000.00元",
        category: "vue",
      },
    ];
    Lesson.create(lessons);
  }
}

export const lessonList = async (req: Request, res: Response) => {
  let { offset, limit, category } = req.query;
  let offsetNum = isNaN(Number(offset)) ? 0 : Number(offset); //偏移量
  let limitNum = isNaN(Number(limit)) ? 5 : Number(limit); //每页条数
  let findQuery;
  if (category === "all") {
    findQuery = {};
  } else {
    findQuery = { category };
  }
  let total: number = await Lesson.count(findQuery); //符合条件的总条数
  let list: ILessonDocument[] = await Lesson.find(findQuery)
    .sort({ order: 1 })
    .skip(offsetNum)
    .limit(limitNum);
  // let lessons: ILessonDocument[] = await Lesson.find();
  // res.json({ success: true, data: lessons });
  setTimeout(function () {
    res.json({
      success: true,
      data: { list, hasMore: total >= offsetNum + limitNum },
    });
  }, 200);
};
export const getLesson = async (req: Request, res: Response) => {
  let { id } = req.params;
  let lesson = await Lesson.findById(id);
  res.json({
    success: true,
    data: lesson,
  });
};
