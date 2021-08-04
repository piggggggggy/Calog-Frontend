// @역할 : 유저가 입력한 칼로리 기록에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";
//카트 삭제 액션
import {delCartAll} from './cart';
//전역 > 서버 배포
import instance from "./instance";
//postman test용
import axios from 'axios'

// middleware 
//dashboard - db에서 바디스펙 가져오기
export const getBodySpecDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
};

//dashboard - db에서 오늘의 칼로리 가져오기
export const getTodayRecordDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
};

//dashboard - db에서 운동리스트 가져오기
export const getWorkoutDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
}

//record - 기록하기
export const addRecordDB = (date, list, type, url, memo) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/record', {date:date, foodList:list, type:type, url:url, contents:memo})
      .then((res) => {
        window.alert('식사 기록되었어요! 칼로리즈와 함께 건강해져요💪🏻')
        dispatch(delCartAll())
        history.replace('/dashboard')
      })
      .catch((err) => {
        window.alert('게시글 업로드에 오류가 발생했어요! 관리자에게 문의해주세요😿')
      })
  }
}

//calendar - 전체 기록 불러오기
export const getAllRecordDB = (monthFormat) => {
  return function (dispatch, getState, {history}) {
    instance
      .get(`/api/calendar/${monthFormat}`)
      .then((res) => {
        const data_list = res.data.record
        dispatch(getAllRecord(data_list))
      })
      .catch((err) => {
        window.alert('게시글 로드에 문제가 발생했어요! 관리자에게 문의해주세요😿')
      }) 
  }
}

//calendar - 특정 일자 기록 불러오기
export const getRecordDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('')
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
  //캘린더 전체 목록
  calendar: [],
}

// redux
const record = createSlice({
  name: "record",
  initialState,
  reducers: {
    //dashboard_바디스펙 정보 가져오기
    getBodySpec : (state, action) => {

    },
    //dashboard_기록 칼로리 가져오기
    getRecord : (state, action) => {

    },
    //dashboard_운동 리스트 가져오기
    getWorkout : (state, action) => {

    },
    //calendar_한 달 칼로리 가져오기
    getAllRecord : (state, action) => {
      state.calendar = action.payload
    },
  }
});

export const {getBodySpec, getRecord, getWorkout, getAllRecord} = record.actions;

export default record;