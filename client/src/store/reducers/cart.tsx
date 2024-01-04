import { AnyAction } from "redux";
import { CartState } from "@/typings";
import * as actionTypes from "@/store/action-types";
import Item from "antd/es/list/Item";
let initialState: CartState = [];
export default function (
  state: CartState = initialState,
  action: AnyAction
): CartState {
  switch (action.type) {
    case actionTypes.ADD_CART_ITEM:
      //   let oldIndex = state.findIndex(
      //     (item) => item.lesson.id === action.payload.id
      //   );
      //   if (oldIndex == -1) {
      //     return [
      //       ...state,
      //       {
      //         checked: false,
      //         count: 1,
      //         lesson: action.payload,
      //       },
      //     ];
      //   } else {
      //     let lesson = state[oldIndex];
      //     return [
      //       ...state.slice(0, oldIndex),
      //       { ...lesson, count: lesson.count + 1 },
      //       ...state.slice(oldIndex + 1),
      //     ];
      //   }
      let oldItem = state.find(
        (item, idx) => item.lesson.id === action.payload.id
      );
      if (oldItem) {
        oldItem.count += 1;
      } else {
        state.push({ count: 1, lesson: action.payload, checked: false });
      }
      return state;
    case actionTypes.REMOVE_CART_ITEM:
      let removeIndex = state.findIndex(
        (item) => item.lesson.id === action.payload
      );
      return [...state.slice(0, removeIndex), ...state.slice(removeIndex + 1)];
    case actionTypes.CLEAR_CART_ITEMS:
      return [];
    case actionTypes.CHANGE_CART_ITEM_COUNT:
      state.map((item) => {
        if (item.lesson.id === action.payload.id) {
          item.count = action.payload.count;
        }
        return item;
      });
      return state;
    case actionTypes.CHANGE_CHECKED_CART_ITEMS:
      let checkedIds = action.payload;
      return state.map((item) => {
        if (checkedIds.includes(item.lesson.id)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
    case actionTypes.SETTLE:
      return state.filter((item) => !item.checked);
    default:
      return state;
  }
}
