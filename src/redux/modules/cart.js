// @역할 : 장바구니 담기
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


// initial State 
const initialState = {
  // persist 적용을 위한 cart
  cart: [],
  type: "아침",
  //카트 기록 날짜
  date: moment().format('YYYY-MM-DD'),
}

// redux
const search = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    // 카트 담기
    addCartRx : (state, action) => {
      // let index = state.cart.findIndex((cart) => cart.foodId === action.payload.foodId)
      // if (index !== -1) {
      //   window.alert('이미 장바구니에 담으셨어요!');
      //   return;
      // }else{
      //   state.cart.unshift(action.payload);
      //   // window.alert('과식은 건강에 해롭습니다.');
      // };
      state.cart.unshift(action.payload);
    },

    // 식단목록 무더기로 카트에 담기
    addCartCustomRx : (state, action) => {
      const custom_list = action.payload;
      console.log(custom_list);

      const set_custom_list = custom_list.filter((custom, idx) => {
        let index = state.cart.findIndex((cart) => cart.foodId === custom.foodId);
        if (index === -1) {
          return custom;
        }
      })
      console.log(set_custom_list);
      state.cart = [...state.cart,...set_custom_list];
      
    },

    // 카트 삭제
    deleteCartRx : (state, action) => {
      const deleted_list = state.cart.filter((cart, idx) => {
        if (cart.foodId !== action.payload) {
          return cart
        };
      });
      state.cart = deleted_list;
    },

    //카트 전체 삭제(type, date는 그대로 둬야함! >> 대시보드 연결 시 사용됨)
    delCartAll : state => {
      state.cart = []
    },

    // 푸드 up카운팅
    setUpAmount : (state, action) => {
      const index = state.cart.findIndex((cart) => cart.foodId === action.payload);
      if (state.cart[index].amount >= 0.5) {
        state.cart[index].amount += 0.5;
      } else {
        state.cart[index].amount = Number((state.cart[index].amount + 0.1).toFixed(1));
      }
      
    },

    // 푸드 down카운팅
    setDownAmount : (state, action) => {
      const index = state.cart.findIndex((cart) => cart.foodId === action.payload);
      if (state.cart[index].amount > 0.5) {
        state.cart[index].amount -= 0.5;
      } else if (state.cart[index].amount > 0.1) {
        state.cart[index].amount = Number((state.cart[index].amount - 0.1).toFixed(1));
      }
      
    },

    // 기록하기 => type 넘겨주기
    cartOut  : (state, action) => {
      state.type = action.payload;
      state.date = moment().format('YYYY-MM-DD')
    },

    //날짜 변경하기
    addDate : (state, action) => {
      state.date = action.payload
    },

    // 타입 변경하기
    chgType : (state, action) => {
      state.type = action.payload
    }
    
  }
});

export const {addCartRx, addCartCustomRx, deleteCartRx, delCartAll, setUpAmount, setDownAmount, cartOut, addDate, chgType} = search.actions;

export default search;