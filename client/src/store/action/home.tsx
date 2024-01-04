import * as actionTypes from "@/store/action-types";
import { getSlides, getLessons } from "@/api/home";
import { StoreDispatch, StoreGetState } from "@/store";
import { LessonResponseData } from "@/typings";
export default {
  setCurrentCategory(currentCategory: string) {
    return {
      type: actionTypes.SET_CURRENT_CATEGORY,
      payload: currentCategory,
    };
  },
  getSlides() {
    return {
      type: actionTypes.GET_SLIDES,
      payload: getSlides(),
    };
  },
  getLessons() {
    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      (async function () {
        let {
          currentCategory,
          lessons: { hasMore, offset, limit, loading },
        } = getState().home;
        if (hasMore && !loading) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          let result = await getLessons<LessonResponseData>(
            currentCategory,
            offset,
            limit
          );
          dispatch({ type: actionTypes.SET_LESSONS, payload: result!.data });
        }
      })();
      // type: actionTypes.GET_LESSONS,
      // payload: getLessons(),
    };
  },
  refreshLessons() {
    return (dispatch: any, getState: any) => {
      (async function () {
        let {
          currentCategory,
          lessons: { limit, loading },
        } = getState().home;
        if (!loading) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          let result = await getLessons<LessonResponseData>(
            currentCategory,
            0,
            limit
          );
          dispatch({
            type: actionTypes.REFRESH_LESSONS,
            payload: result!.data,
          });
        }
      })();
    };
  },
};
