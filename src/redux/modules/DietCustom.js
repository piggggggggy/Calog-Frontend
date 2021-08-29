import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

// sentry
import * as Sentry from '@sentry/react';


const initialState = {
  custom: {
      name: "",
      foodList: [
        {
            amount: 0,
            foodId: 1,
            forOne: 150,
            measurement: "g",
            kcal: 0,
            name: "후라이드"
        },
        {
            amount: 0,
            foodId: 2,
            forOne: 200,
            measurement: "g",
            kcal: 0,
            name: "양념치킨"
        }
       ]
  }
};

export const CustomSV = (name, foodList) => {
    console.log({name, foodList});
    return function(dispatch, getState, {history}){
        async function customize() {
            const res = await instance.post('/api/customize/meal', {name, foodList});
            console.log(res);
            dispatch(SetCustom({name, foodList}));
        };
        customize()
        .catch((err)=>{console.log(err);});
    };
};

export const GetCustomList = () => {
    return function(dispatch, getState, {history}){
        async function getcustomize() {
            const res = await instance.get('/api/customize/meal');
            dispatch(SetCustom(res.data));
        };
        getcustomize()
        .catch((err)=>{console.log(err)});
    }
};



//리덕스
const custom = createSlice({
  name: "custom",
  initialState,
  reducers: {
    SetCustom: (state, action) => {
      state.custom = action.payload;
    },

  },
});

export const {SetCustom} = custom.actions;
export default custom;