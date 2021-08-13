// @역할 : 검색결과 출력, 검색결과 필터링, 장바구니 담기
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";
//전역 > 서버 배포
import instance from "./instance";

//loading
import {isLoaded} from './record';

// middleware 
// 즐겨찾기
export const addFavoriteDB = (data) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/favorite/add', {foodId: data.foodId})
      .then((res) => {
        // console.log(res);
        dispatch(addFavorite(data));
        window.alert("즐겨찾기 추가!");
      })
      .catch((err) => {
        console.log(err, "에러가 났읍니다.")
      }) 
  }
};

// 즐겨찾기 해제
export const deleteFavoriteDB = (foodId) => {
  return function (dispatch, getState, {history}) {
    instance
      .delete('/api/favorite/delete', {foodId: foodId})
      .then((res) => {
        // console.log(res);
        dispatch(deleteFavorite(foodId));
        window.alert("즐겨찾기 해제!");
      })
      .catch((err) => {
        console.log(err, "에러가 났읍니다.")
      }) 
  }
};

// 즐겨찾기 목록 가져오기
export const getFavoriteDB = () => {
  return function (dispatch, getState, {history}) {
    dispatch(isLoaded(false))
    instance
      .get('/api/favorite/list')
      .then((res) => {
        console.log(res);
        // return;
        dispatch(getFavorite(res.data.foodList));
        dispatch(isLoaded(true))
      })
      .catch((err) => {
        console.log(err, "에러가 났읍니다.")
      }) 
  }
};


// initial State 
const initialState = {
  //검색 결과 리스트
  list : [],
}

// redux
const favorite = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    // 즐겨찾기 추가
    addFavorite : (state, action) => {
      state.list.unshift(action.payload);
    },
    // 즐겨찾기 삭제
    deleteFavorite : (state, action) => {
      const deleted_list = state.list.filter((favo, idx) => {
        if (favo.foodId !== action.payload) {
          return favo
        };
      });
      state.list = deleted_list;
    },
    // 즐겨찾기 목록 가져오기
    getFavorite : (state, action) => {
      if (action.payload !== undefined) {
        state.list = action.payload;
      } else {
        state.list = [];
      }

    },

  }
});

export const {addFavorite, deleteFavorite, getFavorite} = favorite.actions;

export default favorite;