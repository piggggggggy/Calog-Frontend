// @역할 : 음식 데이터에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";

// 전역 > 서버 배포
import instance from "./instance";

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
export const addUserFoodDB = (name, kcal, carbo, sugars, protein, fat, fattyAcid, transFattyAcid, unFattyAcid, cholesterol, natrium) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/customize/newFood',
        {name:name, kcal:kcal, protein:protein, fat:fat, carbo:carbo, sugars:sugars, natrium:natrium, cholesterol:cholesterol, fattyAcid:fattyAcid, transFattyAcid:transFattyAcid, unFattyAcid:unFattyAcid})
      .then((res) => {
        console.log(res)
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
};

// initial State 
const initialState = {
}

// redux
const food = createSlice({
  name: "food",
  initialState,
  reducers: {

    
  }
});

export const {} = food.actions;

export default food;