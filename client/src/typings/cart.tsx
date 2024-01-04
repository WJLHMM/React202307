import { Lesson } from "./";
//购物车单个商品类型
export interface CartItem {
  lesson: Lesson;
  count: number;
  checked: boolean;
}
//购物车总类型
export type CartState = CartItem[];
