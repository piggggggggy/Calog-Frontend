// @역할 : 유저가 입력한 칼로리 기록에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";
//전역 > 서버 배포
import instance from "./instance";

// middleware 
//db에서 바디스펙 가져오기
export const getBodySpecDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('')
      .then((res) => {
        console.log(res)
      })
      .err((err) => {
        console.log(err)
      }) 
  }
};

//db에서 오늘의 칼로리 가져오기 가져오기(날짜 담아서 보내주기)
export const getRecordDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('')
      .then((res) => {
        console.log(res)
      })
      .err((err) => {
        console.log(err)
      }) 
  }
};

//db에서 운동리스트 가져오기
export const getWorkoutDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('')
      .then((res) => {
        console.log(res)
      })
      .err((err) => {
        console.log(err)
      }) 
  }
}

//기록하기
export const addRecordDB = (date, list, url) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/record', {date:date, food_list:list, url:url})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


// initial State 
const initialState = {
  //바디스펙
  body : [],
  //칼로리 기록
  record: [],
  //추천 운동 리스트
  workout: [],
}

// redux
const record = createSlice({
  name: "record",
  initialState,
  reducers: {
    //바디스펙 정보 가져오기
    getBodySpec : (state, action) => {

    },
    //기록 칼로리 가져오기
    getRecord : (state, action) => {

    },
    //운동 리스트 가져오기
    getWorkout : (state, action) => {

    },
  }
});

export const {getBodySpec, getRecord, getWorkout} = record.actions;

export default record;