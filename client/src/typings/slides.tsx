export interface Slides {
  id: string;
  url: string;
}

export interface SlidesResponseData {
  success: boolean;
  data: Slides[];
}
