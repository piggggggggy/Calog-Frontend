// @역할 : 음식 데이터에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";

// 전역 > 서버 배포
import instance from "./instance";

// redux
import {addCartRx} from './cart';

// 추가 데이터 기록(운영진 추가용)
export const addDataDB = (name, kcal, forOne, measurement, carbo, sugars, protein, fat, fattyAcid, transFattyAcid, unFattyAcid, cholesterol, natrium) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/home/addData',
        {name:name, forOne:forOne, kcal:kcal, measurement:measurement, protein:protein, fat:fat, carbo:carbo, sugars:sugars, natrium:natrium, cholesterol:cholesterol, fattyAcid:fattyAcid, transFattyAcid:transFattyAcid, unFattyAcid:unFattyAcid})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
};

// 추가 데이터 기록(유저 추가용)
export const addUserFoodDB = (name, kcal, forOne, measurement, carbo, sugars, protein, fat, fattyAcid, transFattyAcid, unFattyAcid, cholesterol, natrium, boolean) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/customize/newFood',
        {name:name, forOne:forOne, kcal:kcal, measurement:measurement, protein:protein, fat:fat, carbo:carbo, sugars:sugars, natrium:natrium, cholesterol:cholesterol, fattyAcid:fattyAcid, transFattyAcid:transFattyAcid, unFattyAcid:unFattyAcid})
      .then((res) => {
        history.push('/')
        if(boolean === "true") {
          const cartUnit = {
            foodId: res.data,
            name: name,
            forOne: forOne,
            measurement: measurement,
            kcal: Math.round(kcal * 10)/10,
            amount: 1,
          };
          dispatch(addCartRx(cartUnit));
        }
      })
      .catch((err) => {
        window.alert('칼로리 추가에 오류가 있어요:(')
        history.push('/')
      }) 
  }
};

// 유저가 직접 추가한 데이터 불러오기
export const getUserAddFoodDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('/api/customize/newFood')
      .then((res) => {
        const addedFood = res.data
        dispatch(getUserAddFood(addedFood))
      })
      .catch((err) => {
        window.alert('추가 칼로리에 오류가 있어요:(')
        history.push('/')
      }) 
  }
};

// 유저가 직접 추가한 데이터 삭제하기
export const delUserFoodDB = (mealId) => {
  return function (dispatch, getState, {history}) {
    instance
      .delete(`/api/customize/meal/${mealId}`)
      .then((res) => {
        dispatch(delUserFood(mealId))
      })
      .catch((err) => {
        window.alert('칼로리 삭제에 오류가 있어요:(')
        history.push('/')
      }) 
  }
};

// initial State 
const initialState = {

  // 유저가 등록한 칼로리 정보
  addFood: [],
}

// redux
const food = createSlice({
  name: "food",
  initialState,
  reducers: {

    // 유저가 직접 추가한 칼로리 정보
    getUserAddFood : (state, action) => {
      state.addFood = action.payload
    },

    // 직접 추가한 칼로리 삭제
    delUserFood : (state, action) => {
      let idx = state.addFood.findIndex((r) => r.mealId === action.payload)
      if (idx !== -1) {
        state.addFood.splice(idx, 1);
      }
    },
  }
});

export const {getUserAddFood, delUserFood} = food.actions;

export default food;