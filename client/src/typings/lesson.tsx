export interface Lesson {
  //每条课程的数据接口
  order: number; //顺序
  title: string; //标题
  video: string; //视频
  poster: string; //海报
  url: string; //url地址
  price: string; //价格
  category: string; //分类
  id: string;
}

export interface Lessons {
  //整个lesson组件数据接口
  loading: boolean; //正在加载为true，其它为false
  list: Lesson[]; //课程列表
  hasMore: boolean; //是否需要加载更多，
  offset: number; //下一次从数据库 获取数据从那个开始
  limit: number; //每次数据库获取数据数
}

export interface LessonResponseData {
  success: boolean;
  data: {
    hasmore: boolean;
    list: Lesson[];
  };
}
export interface LessonItemResponseData {
  success: boolean;
  data: Lesson;
}
