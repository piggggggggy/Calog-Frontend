import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

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
        instance
        .post('/api/user/login', {email, password})
        .then((res) => {
            console.log("res of loginDB", res);
            if(res.status===200){
                dispatch(LoginCheck());
                document.cookie = `TOKEN=${res.data.token};`;
                history.push('/dashboard')
                //로그인 체크해야할 듯. user info 부족
            } else{
                window.alert("값을 재입력해주세요!")
            }
        })
        .catch((err) => {
            console.log("err of loginDB", err);
        })
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
    console.log("click login check")
        instance
        .get('/api/user/me')
        .then((res) => {
            console.log("res of login check", res);
            if(!res.data.user){
                return;
            };
            dispatch(SetUser(res.data.user));
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
    };
}

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
}

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
        state.user_info = null;
        state.is_login = false;
    },
    EmailDupli: (state, action) => {
        state.email_dupli = action.payload;
    },
    NickDupli: (state, action) => {
        state.nick_dupli = action.payload;
    },
    // BodySpect: (state, action) => {
    //     state.user_info = action.payload;
    // }
  },
});

export const {SetUser, LogOut, EmailDupli, NickDupli} = user.actions
export default user;