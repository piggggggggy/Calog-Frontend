import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
// modules
import { deleteCartRx } from '../redux/modules/cart';
// elements & components
import { Grid, Text } from '../elements';
// icons
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 리덕스에서 오는 장바구니 목록
 * @담당자 : 박용태
*/

const UnderBar = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const cart_list = useSelector((state) => state.cart.cart);
  const [barOnOff, barSet] = useState(false);
// useEffect

  // 열고 닫는 
  const toggleCart = () => {
    if (barOnOff === false) {
      barSet(true);
    }else{
      barSet(false);
    }
  };

  // 카트 내용 삭제
  const deleteCart = (foodId) => {
    dispatch(deleteCartRx(foodId));
  };

  return (
    <React.Fragment>
      <CartContainer 
      style={{ transform: `translate(0, ${barOnOff ? '0%' : 'calc(100% - 11vh)'})` }}
        >

          <Grid _onClick={toggleCart} display="flex" jc="center" align-items="center" height="2.3vh" width="20px" margin="1.2vh auto" cursor>
            {barOnOff ? 
            <IoIosArrowDown size="20px" color="#757575"/>
            : <IoIosArrowUp size="20px" color="#757575"/> }
          </Grid>
          
          {/* 즐겨찾기 항목 (가라데이터) */}
          <Grid padding="4px 5% 3% 5%" display="flex" fw="wrap">
            {cart_list.map((cart, idx) => {
              return (
                <CartButton key={idx}>
                  <Text line-height="18px" size="13px" color="#2A2A2A" padding="0" margin="0">
                    {cart.name}
                  </Text>
                  <div onClick={()=>{deleteCart(cart.foodId)}}><MdCancel size="13px" color="#404040"/></div>
                </CartButton>
              )
            })}
          </Grid>
          
          <CalcBox>
            <div onClick={()=>{history.push('/cart')}}>계산하러가기</div>
          </CalcBox>

        </CartContainer>
    </React.Fragment>
  );
}

UnderBar.defaultProps = {

}

const CartContainer = styled.div`
  width: 100%;
  min-height: 12.5%;
  position: fixed;
  bottom: 9%;
  border: none;
  border-top-left-radius: 44px;
  border-top-right-radius: 44px;
  box-shadow: 0px -5px 22px -8px rgba(0, 0, 0, 0.14);
  background: #fff;
  z-index: 20;
  transition: 1s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CalcBox = styled.div`
  width: 100%;
  padding: 5vh 20px 2.8vh 20px;

  & > div {
    width: 100%;
    height: 6.25vh;
    background: #FFE899;
    border: none;
    border-radius: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const CartButton = styled.div`
  height: 4vh;
  padding: 5px 8px;
  background: #E4E4E4;
  border-radius: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  gap: 3px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export default UnderBar;