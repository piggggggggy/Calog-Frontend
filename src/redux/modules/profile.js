import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

//loading
import { isLoaded } from "./record";

// sentry
import * as Sentry from "@sentry/react";

const initialState = {
  list: [],
};

export const getNoticeSV = () => {
  return function (dispatch, getState, { history }) {
    dispatch(isLoaded(false));
    instance
      .get("/api/notice")
      .then((res) => {
        dispatch(SetList(res.data.notice));
        dispatch(isLoaded(true));
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      });
  };
};

export const postNoticeSV = (noticelist) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/notice", noticelist)
      .then((res) => {
        history.push("/notice");
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      });
  };
};

//리덕스
const notice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    SetList: (state, action) => {
      state.list = action.payload;
    },
    SetListOne: (state, action) => {
      state.listone = action.payload;
    },
  },
  DeleteNoti: (state, action) => {
    state.list = action.payload;
  },
});

export const { SetList, SetListOne, DeleteNoti } = notice.actions;
export default notice;
