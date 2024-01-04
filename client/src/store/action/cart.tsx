import { Lesson } from "@/typings";
import * as actionTypes from "@/store/action-types";
import { StoreDispatch, StoreGetState } from "@/store";
import { message } from "antd";
import { push } from "connected-react-router";
export default {
  addCartItem(lesson: Lesson) {
    return function (dispatch: StoreDispatch) {
      dispatch({ type: actionTypes.ADD_CART_ITEM, payload: lesson });
      message.info("成功添加到购物车");
    };
  },
  removeCartItem(id: string) {
    return {
      type: actionTypes.REMOVE_CART_ITEM,
      payload: id,
    };
  },
  clearCartItems() {
    return {
      type: actionTypes.CLEAR_CART_ITEMS,
    };
  },
  changeCartItemCount(id: string, count: number | null) {
    return {
      type: actionTypes.CHANGE_CART_ITEM_COUNT,
      payload: {
        id,
        count,
      },
    };
  },
  changeCheckedCartItems(checkedIds: string[]) {
    return {
      type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
      payload: checkedIds,
    };
  },
  settle() {
    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      dispatch({
        type: actionTypes.SETTLE,
      });
      dispatch(push("/"));
    };
  },
};
