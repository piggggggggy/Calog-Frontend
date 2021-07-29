import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// 토큰 저장 형식
// document.cookie = `MY_COOKIE=${res.data.token};`;
// instance.get('/api/xxx').then().catch
const initialState = {
  user_info: {email: "email", nickname: "nickname"},
  is_login: false,
};

export const LoginDB = (user_info) => {
    console.log("click LoginDB")
    //  {email:"jeehyuk97@daum.net", nickname:"sungsu"}
    return function(dispatch, getState, {history}){
        instance
        .get('/api/login')
        .then((res) => {
            console.log("res of loginDB", res);
            // dispatch(SetUser(user_info));
        })
        .catch((err) => {
            console.log("err of loginDB", err);
        })
    }
}

//리덕스
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user_info = action.payload;
      state.is_login = true;
    },
    LogOut: (state, action) => {
        state.user_info = action.payload;
        state.is_login = false;
    }
  },
});

export const {SetUser} = user.actions
export default user;