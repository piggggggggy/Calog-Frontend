import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import axios from "axios";
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
        // instance
        // .post('/api/login')
        // .then((res) => {
        //     console.log("res of loginDB", res);
        //     // dispatch(SetUser(user_info));
        // })
        // .catch((err) => {
        //     console.log("err of loginDB", err);
        // })
        axios({
            method: "post",
            url: "http://52.78.116.106/api/user/login",
            data: {
                email: user_info.email,
                password: user_info.pwd,
            },
        })
        .then((res) => {
            console.log("res of SignupDB", res);
        })
        .catch((err) => {
            console.log("err of signupDB", err);
        })
    };
};

export const SignupDB = (user_info) => {
    console.log("click SignupDB")
    console.log(user_info)
    const user_infoDB = {email: user_info.email,nickname: user_info.nickname, password: user_info.pwd}
    return function(dispatch, getState, {history}){
        // instance
        // .post('/api/user/register', user_infoDB)
        // .then((res) => {
        //     console.log("res of SignupDB", res);
        // })
        // .catch((err) => {
        //     console.log("err of SignupDB", err);
        // })
        axios({
            method: "post",
            url: "http://52.78.116.106/api/user/register",
            data: {
                email: user_info.email,
                nickname: user_info.nickname,
                password: user_info.pwd,
            },
        })
        .then((res) => {
            console.log("res of SignupDB", res);
        })
        .catch((err) => {
            console.log("err of signupDB", err);
        })
    };
};

export const EmailDuplicate = (email) => {
    console.log("click email dupli")
    return function(dispatch, getState, {history}){
        console.log(email)
        instance
        .post('/api/user/duplicate-email', {email:email})
        .then((res) => {
            console.log("res of email dupli", res);
        })
        .catch((err) => {
            console.log("err of email dupli", err);
        })
    };
};

export const NickDuplicate = (nickname) => {
    console.log("click nickname dupli")
    return function(dispatch, getState, {history}){
        instance
        .post('/api/duplicate-nickname')
        .then((res) => {
            console.log("res of nickname dupli", res);
        })
        .catch((err) => {
            console.log("err of nickname dupli", err);
        })
    };
};

export const LoginCheck = () => {
    console.log("click login check")
    return function(dispatch, getState, {history}){
        instance
        .get('/api/me')
        .then((res) => {
            console.log("res of login check", res);
        })
        .catch((err) => {
            console.log("err of login check", err);
        })
    };
};

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

export const {SetUser, LogOut} = user.actions
export default user;