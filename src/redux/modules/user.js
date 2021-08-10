import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import axios from "axios";
//카트, 히스토리, bmr, 기록 삭제 액션
import {delCartAll} from './cart';
import { delRecentAll } from "./recent";
import {bmrChk} from './record';


const initialState = {
  user_info: {email: "email", nickname: "nickname"},
  is_login: false,
  email_dupli: false,
  nick_dupli: false,
};

export const LoginSV = (user_info) => {
    console.log("click LoginDB")
    const {email, password} = user_info
    return function(dispatch, getState, {history}){
        async function loginsv() {
            const res_token = await instance.post('/api/user/login', {email, password});
            console.log(res_token);
            const res_user_info = await axios({
                method: "get",
                url: "http://54.180.133.171/api/user/me",
                // url: "https://2k1.shop/api/user/me",
                // url: "http://52.78.155.48/api/user/me",
                headers: { authorization: `Bearer ${res_token.data.token}` }
            });
            document.cookie = `TOKEN=${res_token.data.token};`;
            dispatch(SetUser(res_user_info.data.user));
            window.location.href = '/dashboard'
        };
        loginsv()
        .catch((err)=>{
            console.log(err);
            window.alert("이메일 또는 비밀번호가 일치하지 않습니다.")
        });
    };
};

export const SignupSV = (user_info) => {
    console.log("click SignupDB")
    const {email, nickname, password} = user_info
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/register', {email, nickname, password})
        .then((res) => {
            console.log("res of SignupDB", res);
        })
        .catch((err) => {
            console.log("err of SignupDB", err);
        })
    };
};

export const EmailDuplicate = (email) => { //undefined 도 됨
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/duplicate-email', {email})
        .then((res) => {
            console.log("res of email dupli", res);
            if(res.status===201){
                dispatch(EmailDupli(true));
            }
        })
        .catch((err) => {
            dispatch(EmailDupli(false));
        })
    };
};

export const NickDuplicate = (nickname) => {
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/duplicate-nickname', {nickname})
        .then((res) => {
            if(res.status===201){
                dispatch(NickDupli(true));
            }
        })
        .catch((err) => {
            dispatch(NickDupli(false));
        })
    };
};

export const LoginCheck = () => { //토큰 없어도 응답 옴
    return function(dispatch, getState, {history}){
        instance
        .get('/api/user/me')
        .then((res) => {
            let _bmr = res.data.user.bmr[(res.data.user.bmr.length)-1].bmr
            console.log("res of login check", res);
            if(!res.data.user){
                return;
            };
            dispatch(SetUser(res.data.user));
            dispatch(bmrChk(_bmr))
            console.log("디스패치 성공!");
        })
        .catch((err) => {
            console.log("err of login check", err);
        })
    };
};

export const _logOut = () => {
    return function(dispatch, getState, {history}){
        document.cookie = `TOKEN=; expires=${new Date("2020-3-22").toUTCString()}`;
        dispatch(LogOut()); // action payload 가 undefined 괜찮은지
        sessionStorage.clear();
        window.location.replace('/')
    };
};

export const BodySpectSV = (gender, weight, height, age) => {
    return function(dispatch, getState, {history}){
        console.log(gender, weight, height, age)
        instance
        .post('/api/user/bodySpec', {gender, weight, height, age})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
};

export const BodySpectModify = (gender, weight, height, age) => {
    return function(dispatch, getState, {history}){
        console.log(gender, weight, height, age)
        instance
        .put('/api/user/bodySpec/edit', {gender, weight, height, age})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
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
        state.user_info = null;
        state.is_login = false;
        sessionStorage.clear();
    },
    EmailDupli: (state, action) => {
        state.email_dupli = action.payload;
    },
    NickDupli: (state, action) => {
        state.nick_dupli = action.payload;
    },
    // BodySpect: (state, action) => {
    //     state.user_info = action.payload;
    // };
  },
});

export const {SetUser, LogOut, EmailDupli, NickDupli} = user.actions
export default user;