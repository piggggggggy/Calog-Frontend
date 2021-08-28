// @역할 : 음식 데이터에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";

// 전역 > 서버 배포
import instance from "./instance";

// 추가 데이터 기록(운영진 추가용)
export const addDataDB = (name, kcal, forOne, measurement, carbo, sugars, protein, fat, fattyAcid, transFattyAcid, unFattyAcid, cholesterol, natrium) => {
  return function (dispatch, getState, {history}) {
    console.log(name, kcal, forOne, measurement, carbo, sugars, protein, fat, fattyAcid, transFattyAcid, unFattyAcid, cholesterol, natrium)
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
export const addUserFoodDB = (name, kcal, forOne, measurement, carbo, sugars, protein, fat, fattyAcid, transFattyAcid, unFattyAcid, cholesterol, natrium) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/customize/newFood',
        {name:name, forOne:forOne, kcal:kcal, measurement:measurement, protein:protein, fat:fat, carbo:carbo, sugars:sugars, natrium:natrium, cholesterol:cholesterol, fattyAcid:fattyAcid, transFattyAcid:transFattyAcid, unFattyAcid:unFattyAcid})
      .then((res) => {
        history.push('/')
      })
      .catch((err) => {
        window.alert('칼로리 추가에 오류가 있어요:(')
        history.push('/')
      }) 
  }
};

// initial State 
const initialState = {

  // 칼로리 직접 등록 후 장바구니 추가 체크 여부
  wantAddCart: false
}

// redux
const food = createSlice({
  name: "food",
  initialState,
  reducers: {

    // 칼로리 직접 등록 후 장바구니 추가 체크 여부
    wantCart : (state, action) => {
      state.wantAddCart = action.payload
    }
  }
});

export const {wantCart} = food.actions;

export default food;