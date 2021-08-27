import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import axios from "axios";

// 액션
import {bmrChk, delDashboardAll} from './dashboard';
import {saveBlind} from './dashboard';
import { delCartAll } from "./cart";
import { delRecentAll } from "./recent";
import { delRecordAll } from "./record";

// sentry
import * as Sentry from '@sentry/react';


const initialState = {
  user_info: {
    email: "",
    nickname: "",
    gender: "",
    height: "",
    age: 0,
    bmr: [{bmr: 0, date: ""}],
},
  is_login: false,
  email_dupli: false,
  nick_dupli: false,
};

export const LoginSV = (user_info) => {
    const {email, password} = user_info
    return function(dispatch, getState, {history}){
        async function loginsv() {
            const res_token = await instance.post('/api/user/login', {email, password});
            const res_user_info = await axios({
                method: "get",

                // test
                url: "http://52.79.110.219/api/user/me",

                // deploy
                // url: "https://2k1.shop/api/user/me",
                headers: { authorization: `Bearer ${res_token.data.token}` }
            });

            document.cookie = `TOKEN=${res_token.data.token};`;

            const data = res_user_info.data.user
            dispatch(SetUser(data));

            //바디스펙 가져가기
            dispatch(saveBlind({weight:data.weightBlind, height:data.heightBlind, bmr:data.bmrBlind}))

            let _bmr = data.bmr[(res_user_info.data.user.bmr.length)-1].bmr
            if(!res_user_info.data.user){
                return;
            };
            dispatch(bmrChk(_bmr));
            history.replace('/loading/dashboard');
        };
        loginsv()
        .catch((err)=>{
            Sentry.captureException(`Catched Error : ${err}`);
            window.alert("이메일 또는 비밀번호가 일치하지 않습니다.")
        });
    };
};

export const SignupSV = (user_info) => {
    const {email, nickname, password} = user_info
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/register', {email, nickname, password})
        .then((res) => {
        })
        .catch((err) => {
            Sentry.captureException(`Catched Error : ${err}`);
            console.log("err of SignupDB", err);
        })
    };
};

export const EmailDuplicate = (email) => { //undefined 도 됨
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/duplicate-email', {email})
        .then((res) => {
            if(res.status===201){
                dispatch(EmailDupli(true));
            }
        })
        .catch((err) => {
            // Sentry.captureException(`Catched Error : ${err}`);
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
            // Sentry.captureException(`Catched Error : ${err}`);
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
            if(!res.data.user){
                return;
            };
            dispatch(SetUser(res.data.user));
            dispatch(bmrChk(_bmr))
        })
        .catch((err) => {
            // Sentry.captureException(`Catched Error : ${err}`);
            // Sentry.captureException(err);
            console.log("err of login check", err);
        })
    };
};

export const _logOut = () => {
    return async function(dispatch, getState, {history}){
        document.cookie = `TOKEN=; expires=${new Date("2020-3-22").toUTCString()}`;
        dispatch(LogOut()); // action payload 가 undefined 괜찮은지
        dispatch(delCartAll());
        dispatch(delRecentAll());
        dispatch(delRecordAll());
        dispatch(delDashboardAll());
        
        history.replace('/body');
    };
};

export const BodySpectSV = (gender, weight, height, age) => {
    return function(dispatch, getState, {history}){
        instance
        .post('/api/user/bodySpec', {gender, weight, height, age})
        .then((res) => {
            if(gender==="남자"){
                const bmr = Math.round(66.47 + ( 13.75 * weight + (5 * height) - (6.76 * age)));
                const user_info = {gender, weight, height, age, bmr};
                dispatch(bmrChk(bmr));
                dispatch(BodySpect(user_info));
                return;
            } else if (gender==="여자"){
                const bmr = Math.round(655.1 + ( 9.56 * weight + (1.85 * height) - (4.68 * age)));
                const user_info = {gender, weight, height, age, bmr};
                dispatch(bmrChk(bmr));
                dispatch(BodySpect(user_info));
            };
        })
        .catch((err) => {
            Sentry.captureException(`Catched Error : ${err}`);
            console.log(err);
        });
    }
};

export const ProfileSV = (url) => {
    return function(dispatch){
        instance
        .post('/api/user/update-profile-image', {url})
        .then((res) => {
            dispatch(Profile(url));
        })
        .catch((err)=>{console.log(err)});
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
        // sessionStorage.clear();
    },
    EmailDupli: (state, action) => {
        state.email_dupli = action.payload;
    },
    NickDupli: (state, action) => {
        state.nick_dupli = action.payload;
    },
    BodySpect: (state, action) => {
        // state.user_info = action.payload;
        state.user_info.gender = action.payload.gender;
        state.user_info.age = action.payload.age;
        state.user_info.height = action.payload.height;
        state.user_info.weight = action.payload.weight;
        state.user_info.bmr[0].bmr = action.payload.bmr;
    },
    Profile: (state, action) => {
        state.user_info.profile_image = action.payload;
    },

    
    // 최근삭제목록 리듀서
    // 삭제목록 저장하기
    recordDeleted: (state, action) => {
        state.user_info.deleteList = [action.payload];
    },
    // 삭제목록 날리기
    clearDeleted: state => {
        state.user_info.deleteList = [];
    },
    // 장바구니에서 삭제목록 올렸을 때 지우기
    removeDeleted: (state, action) => {
        const deleted_list = action.payload.list;
        const result = deleted_list.filter((del, idx) => {
            if (del.foodId !== action.payload.foodId) {
                return del;
            }
        })
        state.user_info.deleteList[0] = result;
    },

  },
});

export const {SetUser, LogOut, EmailDupli, NickDupli, BodySpect, Profile, recordDeleted, clearDeleted, removeDeleted} = user.actions;
export default user;