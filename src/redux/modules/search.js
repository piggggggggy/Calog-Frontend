// @역할 : 검색결과 출력, 검색결과 필터링, 장바구니 담기
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";
//전역 > 서버 배포
import instance from "./instance";

// middleware 
// DB에서 검색결과 가져오기
export const searchKeywordDB = (data) => {
  return function (dispatch, getState, {history}) {
    instance
      .get(`/api/home/search/${data.keyword}`)
      .then((res) => {
        console.log(res)
        const new_data = {...data, data: res.data}
        dispatch(searchKeyword(new_data));
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
  filtered_list: [],
}

// redux
const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    // 검색하기
    searchKeyword : (state, action) => {
      state.list = action.payload.data
      state.filtered_list = state.list.filter((food, idx) => {
        if (food.kcal >= action.payload.min && food.kcal <= action.payload.max){
          return food;
        };
      });
    },
    // 칼로리 Range 필터
    rangeFilter : (state, action) => {
      const filtered = state.list.filter((food, idx) => {
        if (food.kcal >= action.payload.min && food.kcal <= action.payload.max){
          return food;
        };
      });
      state.filtered_list = filtered;
    },
    // 칼로리 오름차순 필터
    ascendingSort : state => {
     const kcalSorted = state.filtered_list.sort((a, b) => {
      return a.kcal - b.kcal;
     });

     state.filtered_list = kcalSorted;
    },
    // 칼로리 내림차순 필터
    descendingSort : state => {
      const kcalSorted = state.filtered_list.sort((a, b) => {
        return b.kcal - a.kcal;
      });
      state.filtered_list = kcalSorted;
    },
    // 한글 순 필터
    koreanSort : state => {
      const koreanSorted = state.filtered_list.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
      state.filtered_list = koreanSorted;
    }

  }
});

export const {searchKeyword, rangeFilter, ascendingSort, descendingSort, koreanSort} = search.actions;

export default search;