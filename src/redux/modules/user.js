import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  user_info: "",
  is_login: false,
};

export const SetUserCheck = () => {
    console.log("click setUserCheck")
    const user_info = {username:"jeehyuk"}
    return function(dispatch, getState){
        dispatch(SetUser(user_info))
    }
}

//리덕스
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action) => {
    //   state.user_info = action.payload.username;
      state.is_login = true;
      state.user_info = action.payload.username;
    },

  },
});

export const {SetUser} = user.actions
export default user;