// @역할 : 장바구니 담기
// @담당자 : 박용태

import { createSlice } from "@reduxjs/toolkit";


// initial State 
const initialState = {
  // persist 적용을 위한 cart
  cart: [],
}

// redux
const search = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    // 카트 담기
    addCartRx : (state, action) => {
      let index = state.cart.findIndex((c) => c.foodId === action.payload.foodId)
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

  }
});

export const {addCartRx, deleteCartRx} = search.actions;

export default search;