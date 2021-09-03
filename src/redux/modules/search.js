// @역할 : 검색결과 출력, 검색결과 필터링, 장바구니 담기
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";
//전역 > 서버 배포
import instance from "./instance";

//loading
import {isLoaded} from './record';

// sentry
import * as Sentry from '@sentry/react';

// middleware 
// DB에서 검색결과 가져오기
export const searchKeywordDB = (data) => {
  if (data.keyword === '') {
    window.alert('키워드를 입력하세요!');
    return;
  }
  return function (dispatch, getState, {history}) {
    dispatch(isLoaded(false))
    instance
      .get(`/api/home/search/${data.keyword}`)
      .then((res) => {
        
        const new_data = {...data, data: res.data.food};
        dispatch(searchKeyword(new_data));
        
        history.push(`/loading/search/${data.keyword}`);
        dispatch(isLoaded(true))
        
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      }) 

  }
};

  // detail foodinfo 가져오기
export const getDetailDB = (foodId) => {
  return function (dispatch, getState, {history}) {
    dispatch(isLoaded(false))
    instance
      .get(`/api/home/search/detail/${foodId}`)
      .then((res) => {
        dispatch(getDetail(res.data.foodDetail));
        dispatch(isLoaded(true))
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      })
  }
};

  // 키워드별 조회수 기록
export const countKeywordDB = (keyword) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/home/search/mostUsed',{keyword: keyword})
      .then((res) => {
        dispatch(addMostUsedKey(keyword));
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      })
  }
};

  // 인기검색어 조회
export const getMostUsedKeyDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('/api/home/mostUsedKey')
      .then((res) => {
        dispatch(getMostUsedKey(res.data.mostUsedKey));
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      })
  }
};

  // 추천 검색어 가져오기
export const getRecommendedDB = () => {
  return function (dispatch, getState, {history}) {
    dispatch(isLoaded(false));
    instance
      .get('/api/home/recommend')
      .then((res) => {
        dispatch(getRecommended(res.data.recommendFood));
        dispatch(isLoaded(true));
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
      })
  }
};


// initial State 
const initialState = {
  // 상세 정보
  detail: [],
  // 검색 결과 리스트 (원본)
  list : [],
  // 정렬 및 필터링된 결과
  filtered_list: [],
  // 인기검색어
  most: [],
  // 추천검색어
  recommend: []
}

// redux
const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    // 검색하기
    searchKeyword : (state, action) => {
      if(action.payload.data === undefined) {
        state.list = [];
        state.filtered_list = [];
      } else {
        state.list = action.payload.data;
        const filtered = action.payload.data.filter((food, idx) => {
          if (parseInt(food.kcal) >= action.payload.data.min && parseInt(food.kcal) <= action.payload.data.max){
            return food;
          };
        });
        state.filtered_list = filtered;
      }
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
    },
    exactSort : state => {
      state.filtered_list = state.list;
    },

    // 상세페이지 조회
    getDetail : (state, action) => {
      state.detail = action.payload;
    },
    
    // 인기검색어 get
    getMostUsedKey : (state, action) => {
      state.most = action.payload;
    },

    // 인기검색어 추가
    addMostUsedKey : (state, action) => {
      let index = state.most.findIndex((most) => most.keyword === action.payload);
      if (index === -1) {
        state.most.push({keyword: action.payload, times: 1});
      } else {
        state.most[index].times += 1;
      }
      const desMost = state.most.sort((a, b) => {
        return b.times - a.times;
      });
      state.most = desMost;
    },

    // 추천검색어 받기
    getRecommended : (state, action) => {
      // console.log(action.payload)
      state.recommend = action.payload;
    },

    // 유저가 직접 등록한 칼로리
    addUserFood : (state, action) => {
      state.detail = action.payload;
    }, 

    // 디테일 삭제
    delDetail : (state, action) => {
      state.detail = []
    },
  }
});

export const {
  searchKeyword, 
  getMostUsedKey, 
  addMostUsedKey, 
  rangeFilter, 
  ascendingSort, 
  descendingSort, 
  koreanSort, 
  exactSort, 
  getScrollData, 
  getDetail,
  getRecommended,
  addUserFood,
  delDetail
} = search.actions;

export default search;