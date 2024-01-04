import { AnyAction } from "redux";
import { HomeState } from "@/typings";
import * as actionTypes from "@/store/action-types";
const initialState: HomeState = {
  currentCategory: "all",
  slides: [],
  lessons: { loading: false, list: [], hasMore: true, offset: 0, limit: 5 },
};

function HomeReducer(
  state: HomeState = initialState,
  action: AnyAction
): HomeState {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    case actionTypes.GET_SLIDES:
      if (action.error) {
        return state;
      } else {
        return { ...state, slides: action.payload.data };
      }
    case actionTypes.SET_LESSONS_LOADING:
      state.lessons.loading = action.payload;
      return state;
    case actionTypes.SET_LESSONS:
      state.lessons.loading = false;
      state.lessons.hasMore = action.payload.hasMore;
      state.lessons.list = [...state.lessons.list, ...action.payload.list];
      state.lessons.offset = state.lessons.offset + action.payload.list.length;
      return state;
    // case actionTypes.SET_LESSONS:
    //   return {
    //     ...state,
    //     lessons: {
    //       ...state.lessons,
    //       loading: false,
    //       list: [...state.lessons.list, ...action.payload.list],
    //       hasMore: action.payload.hasMore,
    //       offset: 0,
    //       limit: 5,
    //     },
    //   };
    case actionTypes.REFRESH_LESSONS:
      state.lessons.loading = false;
      state.lessons.hasMore = action.payload.hasMore;
      state.lessons.list = action.payload.list;
      state.lessons.offset = action.payload.list.length || 0;
      return state;
    default:
      return state;
  }
}

export default HomeReducer;
