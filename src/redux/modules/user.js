import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_info: {email: "email", nickname: "nickname"},
  is_login: false,
};

export const SetUserCheck = (user_info) => {
    console.log("click setUserCheck")
    //  {email:"jeehyuk97@daum.net", nickname:"sungsu"}
    return function(dispatch, getState, {history}){
        dispatch(SetUser(user_info))
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