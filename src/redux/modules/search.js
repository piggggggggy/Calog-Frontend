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
      .catch((err) => {
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
    "foodId": "50",
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
    "foodId": "80",
    "id": "60fffc4bae3c10de04ef853c"
    },
    {
    "_id": "60fffc4bae3c10de04ef97a2",
    "NO": "5877",
    "name": "후라이드",
    "sort": "튀김류",
    "sortDetail": "치킨류",
    "forOne": 150,
    "measurement": "g",
    "grams": 150,
    "milliLiters": 0,
    "kcal": 350,
    "score": 0.75,
    "isLike": true,
    "foodId": "7",
    "id": "60fffc4bae3c10de04ef97a2"
    },
    {
    "_id": "60fffc4bae3c10de04ef853c",
    "NO": "1167",
    "name": "바사삭",
    "sort": "빵류",
    "sortDetail": "샌드위치류",
    "forOne": 170,
    "measurement": "g",
    "grams": 170,
    "milliLiters": 0,
    "kcal": 750,
    "score": 0.75,
    "foodId": "8",
    "id": "60fffc4bae3c10de04ef853c"
    },
    {
    "_id": "60fffc4bae3c10de04ef97a2",
    "NO": "5877",
    "name": "후라이드",
    "sort": "튀김류",
    "sortDetail": "치킨류",
    "forOne": 150,
    "measurement": "g",
    "grams": 150,
    "milliLiters": 0,
    "kcal": 800,
    "score": 0.75,
    "isLike": true,
    "foodId": "9",
    "id": "60fffc4bae3c10de04ef97a2"
    },
    {
    "_id": "60fffc4bae3c10de04ef853c",
    "NO": "1167",
    "name": "바사삭",
    "sort": "빵류",
    "sortDetail": "샌드위치류",
    "forOne": 170,
    "measurement": "g",
    "grams": 170,
    "milliLiters": 0,
    "kcal": 400,
    "score": 0.75,
    "foodId": "10",
    "id": "60fffc4bae3c10de04ef853c"
    },
    {
    "_id": "60fffc4bae3c10de04ef97a2",
    "NO": "5877",
    "name": "후라이드",
    "sort": "튀김류",
    "sortDetail": "치킨류",
    "forOne": 150,
    "measurement": "g",
    "grams": 150,
    "milliLiters": 0,
    "kcal": 700,
    "score": 0.75,
    "isLike": true,
    "foodId": "11",
    "id": "60fffc4bae3c10de04ef97a2"
    },
    {
    "_id": "60fffc4bae3c10de04ef853c",
    "NO": "1167",
    "name": "바사삭",
    "sort": "빵류",
    "sortDetail": "샌드위치류",
    "forOne": 170,
    "measurement": "g",
    "grams": 170,
    "milliLiters": 0,
    "kcal": 600,
    "score": 0.75,
    "foodId": "12",
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
  "foodId": "50",
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
  "foodId": "80",
  "id": "60fffc4bae3c10de04ef853c"
  },
  {
  "_id": "60fffc4bae3c10de04ef97a2",
  "NO": "5877",
  "name": "후라이드",
  "sort": "튀김류",
  "sortDetail": "치킨류",
  "forOne": 150,
  "measurement": "g",
  "grams": 150,
  "milliLiters": 0,
  "kcal": 350,
  "score": 0.75,
  "isLike": true,
  "foodId": "7",
  "id": "60fffc4bae3c10de04ef97a2"
  },
  {
  "_id": "60fffc4bae3c10de04ef853c",
  "NO": "1167",
  "name": "바사삭",
  "sort": "빵류",
  "sortDetail": "샌드위치류",
  "forOne": 170,
  "measurement": "g",
  "grams": 170,
  "milliLiters": 0,
  "kcal": 750,
  "score": 0.75,
  "foodId": "8",
  "id": "60fffc4bae3c10de04ef853c"
  },
  {
  "_id": "60fffc4bae3c10de04ef97a2",
  "NO": "5877",
  "name": "후라이드",
  "sort": "튀김류",
  "sortDetail": "치킨류",
  "forOne": 150,
  "measurement": "g",
  "grams": 150,
  "milliLiters": 0,
  "kcal": 800,
  "score": 0.75,
  "isLike": true,
  "foodId": "9",
  "id": "60fffc4bae3c10de04ef97a2"
  },
  {
  "_id": "60fffc4bae3c10de04ef853c",
  "NO": "1167",
  "name": "바사삭",
  "sort": "빵류",
  "sortDetail": "샌드위치류",
  "forOne": 170,
  "measurement": "g",
  "grams": 170,
  "milliLiters": 0,
  "kcal": 400,
  "score": 0.75,
  "foodId": "10",
  "id": "60fffc4bae3c10de04ef853c"
  },
  {
  "_id": "60fffc4bae3c10de04ef97a2",
  "NO": "5877",
  "name": "후라이드",
  "sort": "튀김류",
  "sortDetail": "치킨류",
  "forOne": 150,
  "measurement": "g",
  "grams": 150,
  "milliLiters": 0,
  "kcal": 700,
  "score": 0.75,
  "isLike": true,
  "foodId": "11",
  "id": "60fffc4bae3c10de04ef97a2"
  },
  {
  "_id": "60fffc4bae3c10de04ef853c",
  "NO": "1167",
  "name": "바사삭",
  "sort": "빵류",
  "sortDetail": "샌드위치류",
  "forOne": 170,
  "measurement": "g",
  "grams": 170,
  "milliLiters": 0,
  "kcal": 600,
  "score": 0.75,
  "foodId": "12",
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
      const filtered = state.list.filter((food, idx) => {
        if (food.kcal >= action.payload.min && food.kcal <= action.payload.max){
          return food;
        };
      });
      state.filtered_list = filtered;
    },
    // 칼로리 오름차순 필터
    ascendingSort : state => {
     const kcalSorted = state.list.sort((a, b) => {
      return a.kcal - b.kcal;
     });

     state.filtered_list = kcalSorted;
    },
    // 칼로리 내림차순 필터
    descendingSort : state => {
      const kcalSorted = state.list.sort((a, b) => {
        return b.kcal - a.kcal;
      });
 
      state.filtered_list = kcalSorted;
    },
    // 한글 순 필터
    koreanSort : state => {
      const koreanSorted = state.list.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
      state.filtered_list = koreanSorted;
    }

  }
});

export const {searchKeyword, rangeFilter, ascendingSort, descendingSort, koreanSort} = search.actions;

export default search;