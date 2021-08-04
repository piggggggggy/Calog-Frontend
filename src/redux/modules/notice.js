import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
//cadmin@calories.com
//zkffhfltm1@
const initialState = {
  nick_dupli: false,
};

export const postNotice = (title, contents, date, password) => {
    return function(dispatch, getState, {history}){
        instance
        .post('/api/notice', {title, contents, date, password})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

//리덕스
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    NickDupli: (state, action) => {
        state.nick_dupli = action.payload;
    },
  },
});

export const {NickDupli} = user.actions
export default user;