import { Slides, Lessons } from "./";

export interface HomeState {
  currentCategory: string;
  slides: Slides[];
  lessons: Lessons;
}
