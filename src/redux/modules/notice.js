import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
//cadmin@calories.com
//zkffhfltm1@
const initialState = {
  list: [],
};

export const getNoticeSV = () => {
    return function(dispatch, getState, {history}){
        instance
        .get('/api/notice')
        .then((res) => {
            dispatch(SetList(res.data.notice))
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const postNoticeSV = (noticelist) => {
    return function(dispatch, getState, {history}){
        instance
        .post('/api/notice', noticelist)
        .then((res) => {
              history.push("/notice");
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const putNotiSV = (updatelist, noticeId) => {
    return function(dispatch, getState, {history}){
        console.log(updatelist, noticeId)
        instance
        .put(`/api/notice/${noticeId}`, updatelist)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const deleteNotiSV = (noticeId) => {
    return function(dispatch, getState, {history}){
        instance
        .delete(`/api/notice/${noticeId}`, {data:{password:"zkffhfltm1@"}})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const getNotiDetailSV = (noticeId) => {
    return function(dispatch, getState, {history}){
        instance
        .get(`/api/notice/${noticeId}`)
        .then((res) => {
            console.log(res.data.notice);
            dispatch(SetListOne(res.data.notice));
        })
        .catch((err) => {
            console.log(err);
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
    }
  },
  DeleteNoti: (state, action) => {
        state.list = action.payload;
}
});

export const {SetList, SetListOne, DeleteNoti} = notice.actions
export default notice;