// @역할 : 최근검색어
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

// sentry
import * as Sentry from "@sentry/react";

// 최신검색어 불러오기
export const getRecentDB = (keyword) => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/api/home/recentKey")
      .then((res) => {
        dispatch(getRecent(res.data));
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      });
  };
};

// 최신검색어 추가
export const searchRecentDB = (keyword) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/home/recentKey", { keyword: keyword })
      .then((res) => {
        dispatch(addRecent(keyword));
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      });
  };
};

// 최신검색어 제거
export const deleteRecentDB = (keyword) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete("/api/home/recentKey", { data: { keyword: keyword } })
      .then((res) => {
        dispatch(deleteRecent(keyword));
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      });
  };
};

// initial State
const initialState = {
  // persist 적용을 위한 recent
  recent: [],
};

// redux
const recent = createSlice({
  name: "recent",
  initialState,
  reducers: {
    // recent 가져오기
    getRecent: (state, action) => {
      state.recent = action.payload;
    },

    // 리덕스 비우기
    delRecentAll: (state, action) => {
      state.recent = [];
    },

    // recent 추가
    addRecent: (state, action) => {
      if (state.recent[0] === null) {
        state.recent = [action.payload];
      } else {
        let index = state.recent.findIndex((rec) => rec === action.payload);
        if (index !== -1) {
          state.recent = state.recent.filter((rec, idx) => {
            if (rec !== action.payload) {
              return rec;
            }
          });
          state.recent.unshift(action.payload);
        } else {
          if (state.recent.length === 10) {
            state.recent.pop();
            state.recent.unshift(action.payload);
          } else {
            state.recent.unshift(action.payload);
          }
        }
      }
    },

    // recent 제거
    deleteRecent: (state, action) => {
      let deleted_list = state.recent.filter((rec, idx) => {
        if (rec !== action.payload) {
          return rec;
        }
      });
      state.recent = deleted_list;
    },
  },
});

export const { getRecent, addRecent, deleteRecent, delRecentAll } =
  recent.actions;

export default recent;
