import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

// modules
import { delCartAll } from "./cart";

// sentry
import * as Sentry from '@sentry/react';


const initialState = {
  custom: [
  //   {
  //   name: "",
  //   foodList: [
  //     {
  //         amount: 0,
  //         foodId: 2,
  //         forOne: 200,
  //         measurement: "g",
  //         kcal: 0,
  //         name: "양념치킨"
  //     }
  //    ]
  // },
  // {
  //   name: "",
  //   foodList: [
  //     {
  //         amount: 0,
  //         foodId: 2,
  //         forOne: 200,
  //         measurement: "g",
  //         kcal: 0,
  //         name: "양념치킨"
  //     }
  //    ]
  // },
]
};

export const CustomSV = (name, foodList) => {
    console.log({name, foodList});
    return function(dispatch, getState, {history}){
        async function customize() {
            const res = await instance.post('/api/customize/meal', {name, foodList});
            // console.log(res);
            dispatch(addCustom({name, foodList}));
            dispatch(delCartAll());
        };
        customize()
        .catch((err)=>{console.log(err);});
    };
};

export const GetCustomList = () => {
    return function(dispatch, getState, {history}){
        async function getcustomize() {
            const res = await instance.get('/api/customize/meal');
            // console.log(res)
            dispatch(SetCustom(res.data));
        };
        getcustomize()
        .catch((err)=>{console.error(err)});
    }
};

export const DeleteCustom = (mealId) => {
  return function(dispatch, getState, {history}) {
    instance
      .delete(`/api/customize/meal/${mealId}`)
      .then((res) => {
        console.log(res);
        dispatch(deleteCustom(mealId));
      })
  }
};



//리덕스
const custom = createSlice({
  name: "custom",
  initialState,
  reducers: {
    addCustom: (state, action) => {
      const custom = { name: action.payload.name, foodList: action.payload.foodList }; 
      state.custom.push(custom);
    },

    setCustom: (state, action) => {
      state.custom = action.payload;
    },

    deleteCustom: (state, action) => {
      const deleted_list = state.custom.filter((custom, idx) => {
        if (custom.mealId !== action.payload) {
          return custom;
        };
      });
      state.custom = deleted_list;
    },

  },
});

export const {SetCustom, addCustom, deleteCustom} = custom.actions;
export default custom;