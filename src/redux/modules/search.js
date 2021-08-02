// @역할 : 검색결과 출력, 검색결과 필터링, 장바구니 담기
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";
//전역 > 서버 배포
import instance from "./instance";

// middleware 
// DB에서 검색결과 가져오기
export const searchKeywordDB = (keyword) => {
  return function (dispatch, getState, {history}) {
    instance
      .get(`/api/home/search/${keyword}`)
      .then((res) => {
        console.log(res)
      })
      .err((err) => {
        console.log(err, "에러가 났읍니다.")
      }) 
  }
};



// initial State 
const initialState = {
  //검색 결과 리스트
  list : [
    {
    "_id": "60fffc4bae3c10de04ef97a2",
    "NO": "5877",
    "name": "후라이드 치킨",
    "sort": "튀김류",
    "sortDetail": "치킨류",
    "forOne": 150,
    "measurement": "g",
    "grams": 150,
    "milliLiters": 0,
    "kcal": 435,
    "score": 0.75,
    "isLike": true,
    "foodId": "1",
    "id": "60fffc4bae3c10de04ef97a2"
    },
    {
    "_id": "60fffc4bae3c10de04ef853c",
    "NO": "1167",
    "name": "치킨 팟파이",
    "sort": "빵류",
    "sortDetail": "샌드위치류",
    "forOne": 170,
    "measurement": "g",
    "grams": 170,
    "milliLiters": 0,
    "kcal": 430,
    "score": 0.75,
    "foodId": "2",
    "id": "60fffc4bae3c10de04ef853c"
    },
    {
    "_id": "60fffc4bae3c10de04ef97a2",
    "NO": "5877",
    "name": "후라이드 양념 치킨",
    "sort": "튀김류",
    "sortDetail": "치킨류",
    "forOne": 150,
    "measurement": "g",
    "grams": 150,
    "milliLiters": 0,
    "kcal": 435,
    "score": 0.75,
    "isLike": true,
    "foodId": "3",
    "id": "60fffc4bae3c10de04ef97a2"
    },
    {
    "_id": "60fffc4bae3c10de04ef853c",
    "NO": "1167",
    "name": "고추바사삭",
    "sort": "빵류",
    "sortDetail": "샌드위치류",
    "forOne": 170,
    "measurement": "g",
    "grams": 170,
    "milliLiters": 0,
    "kcal": 430,
    "score": 0.75,
    "foodId": "4",
    "id": "60fffc4bae3c10de04ef853c"
    }
  ],
  filtered_list: [
    {
    "_id": "60fffc4bae3c10de04ef97a2",
    "NO": "5877",
    "name": "후라이드 치킨",
    "sort": "튀김류",
    "sortDetail": "치킨류",
    "forOne": 150,
    "measurement": "g",
    "grams": 150,
    "milliLiters": 0,
    "kcal": 435,
    "score": 0.75,
    "isLike": true,
    "foodId": "1",
    "id": "60fffc4bae3c10de04ef97a2"
    },
    {
    "_id": "60fffc4bae3c10de04ef853c",
    "NO": "1167",
    "name": "치킨 팟파이",
    "sort": "빵류",
    "sortDetail": "샌드위치류",
    "forOne": 170,
    "measurement": "g",
    "grams": 170,
    "milliLiters": 0,
    "kcal": 430,
    "score": 0.75,
    "foodId": "2",
    "id": "60fffc4bae3c10de04ef853c"
    },
    {
    "_id": "60fffc4bae3c10de04ef97a2",
    "NO": "5877",
    "name": "후라이드 양념 치킨",
    "sort": "튀김류",
    "sortDetail": "치킨류",
    "forOne": 150,
    "measurement": "g",
    "grams": 150,
    "milliLiters": 0,
    "kcal": 435,
    "score": 0.75,
    "isLike": true,
    "foodId": "3",
    "id": "60fffc4bae3c10de04ef97a2"
    },
    {
    "_id": "60fffc4bae3c10de04ef853c",
    "NO": "1167",
    "name": "고추바사삭",
    "sort": "빵류",
    "sortDetail": "샌드위치류",
    "forOne": 170,
    "measurement": "g",
    "grams": 170,
    "milliLiters": 0,
    "kcal": 430,
    "score": 0.75,
    "foodId": "4",
    "id": "60fffc4bae3c10de04ef853c"
    }
  ],
}

// redux
const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    // 검색하기
    searchKeyword : (state, action) => {
      state.list = action.payload
      state.filtered_list = action.payload
    },
    // 칼로리 Range 필터
    rangeFilter : (state, action) => {

    },
    // 칼로리 오름차순 필터
    ascendingSort : state => {

    },
    // 칼로리 내림차순 필터
    descendingSort : state => {

    },

  }
});

export const {searchKeyword} = search.actions;

export default search;