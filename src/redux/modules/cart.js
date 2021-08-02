// @역할 : 장바구니 담기
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";


// initial State 
const initialState = {
  // persist 적용을 위한 cart
  cart: [],
  type: null,
}

// redux
const search = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    // 카트 담기
    addCartRx : (state, action) => {
      let index = state.cart.findIndex((cart) => cart.foodId === action.payload.foodId)
      if (index !== -1) {
        window.alert('이미 담았잖아!!!');
        return;
      }else{
        state.cart.unshift(action.payload);
        window.alert('과식은 건강에 해롭습니다.');
      };
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

    // 푸드 up카운팅
    setUpAmount : (state, action) => {
      const index = state.cart.findIndex((cart) => cart.foodId === action.payload);
      state.cart[index].amount += 0.5;
    },

    // 푸드 down카운팅
    setDownAmount : (state, action) => {
      const index = state.cart.findIndex((cart) => cart.foodId === action.payload);
      state.cart[index].amount -= 0.5;
    },

    // 기록하기 => type 넘겨주기
    cartOut  : (state, action) => {
      state.type = action.payload;
    },

  }
});

export const {addCartRx, deleteCartRx, setUpAmount, setDownAmount, cartOut} = search.actions;

export default search;