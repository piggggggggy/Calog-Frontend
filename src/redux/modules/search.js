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
        console.log(res);
        if (res.data === "") {
          window.alert('검색 결과가 없어요!');
        } else {
          
          const new_data = {...data, data: res.data};
          dispatch(searchKeyword(new_data));
        }
        
      })
      .catch((err) => {
        console.log(err, "에러가 났읍니다.")
      }) 
  }
};

  // detail foodinfo 가져오기
export const getDetailDB = (foodId) => {
  return function (dispatch, getState, {history}) {
    instance
      .get(`/api/home/search/detail/${foodId}`)
      .then((res) => {
        // console.log(res)
        dispatch(getDetail(res.data.foodDetail));
      })
      .catch((err) => {
        console.log(err, "에러가 났읍니다.")
      })
  }
};

  // 키워드별 조회수 기록
export const countKeywordDB = (keyword) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/home/search/mostUsed',{keyword: keyword})
      .then((res) => {
        console.log(res);
        dispatch(addMostUsedKey(keyword));
      })
      .catch((err) => {
        console.log(err, "에러가 났읍니다.");
      })
  }
};

  // 인기검색어 조회
export const getMostUsedKeyDB = () => {
  return function (dispatch, getState, {history}) {
    instance
      .get('/api/home/mostUsedKey')
      .then((res) => {
        // console.log(res);
        dispatch(getMostUsedKey(res.data.mostUsedKey));
      })
      .catch((err) => {
        console.log(err, "에러가 났읍니다.")
      })
  }
};


// initial State 
const initialState = {
  // 상세 정보
  detail: [],
  //검색 결과 리스트
  list : [],
  filtered_list: [],
  export_list: [],
  paging: { start: 0, end: 20, next: true},
  is_loading: false,
  // 인기검색어
  most: []
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

    // 무한스크롤
    getScrollData : state => {
      state.is_loading = true;
      let sliceData = state.filtered_list.slice(state.paging.start, state.paging.end);
      if (sliceData.length === 21) {
        let paging = {
          start: state.paging.start + 20,
          end: state.paging.end + 20,
          next: true
        };
        state.paging = paging;
        sliceData.pop();
        state.export_list = [...state.export_list, ...sliceData];
      } else {
        state.export_list = [...state.export_list, ...sliceData];
        state.paging.next = false;
      };
      state.is_loading = false;
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
    }

  }
});

export const {searchKeyword, getMostUsedKey, addMostUsedKey, rangeFilter, ascendingSort, descendingSort, koreanSort, exactSort, getScrollData, getDetail} = search.actions;

export default search;