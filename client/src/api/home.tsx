import request from "./index";
import { SlidesResponseData, LessonResponseData } from "@/typings";

export function getSlides() {
  return request
    .get<SlidesResponseData, SlidesResponseData>("/slides/list")
    .catch((error) => console.log("slidesList=.", error)); //注意这里需要处理一下，以防止页面报错，无法正常显示
}
export function getLessons<T>(
  currentCategory: string = "all",
  offset: number,
  limit: number
) {
  return request
    .get<T, T>(
      `/lessons/list?category=${currentCategory}&offset=${offset}&limit=${limit}`
    )
    .catch((error) => console.log("LessonList=.", error)); //注意这里需要处理一下，以防止页面报错，无法正常显示
}
export function getLesson<T>(id: string | undefined) {
  console.log("getLesson");
  return request
    .get<T, T>(`/lessons/${id}`)
    .catch((error) => console.log("Lesson=.", error)); //注意这里需要处理一下，以防止页面报错，无法正常显示
}
