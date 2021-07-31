import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
// props
  const [barOnOff, barSet] = useState(false);
// useEffect

  const toggleCart = () => {
    if (barOnOff === false) {
      barSet(true);
    }else{
      barSet(false);
    }
  };

  return (
    <React.Fragment>
      <CartContainer 
      style={{ transform: `translate(0, ${barOnOff ? '0%' : '80%'})` }}
        >

          <Grid _onClick={toggleCart} display="flex" jc="center" align-items="center" height="20px" width="20px" margin="10px auto" cursor>
            {barOnOff ? 
            <IoIosArrowDown size="20px" color="#757575"/>
            : <IoIosArrowUp size="20px" color="#757575"/> }
          </Grid>
          
          <Grid padding="4px 5% 3% 5%" display="flex" fw="wrap">
            <CartButton>
              <Text line-height="18px" size="13px" color="#2A2A2A" padding="0" margin="0">
                피자마루 간장치킨
              </Text>
              <div><MdCancel size="13px" color="#404040"/></div>
            </CartButton>
            <CartButton>
              <Text line-height="18px" size="13px" color="#2A2A2A" padding="0" margin="0">
                삶은 겨란
              </Text>
              <div><MdCancel size="13px" color="#404040"/></div>
            </CartButton>
            <CartButton>
              <Text line-height="18px" size="13px" color="#2A2A2A" padding="0" margin="0">
                고추바사삭
              </Text>
              <div><MdCancel size="13px" color="#404040"/></div>
            </CartButton>
            <CartButton>
              <Text line-height="18px" size="13px" color="#2A2A2A" padding="0" margin="0">
                신라면
              </Text>
              <div><MdCancel size="13px" color="#404040"/></div>
            </CartButton>
            <CartButton>
              <Text line-height="18px" size="13px" color="#2A2A2A" padding="0" margin="0">
                알리오올리오
              </Text>
              <div><MdCancel size="13px" color="#404040"/></div>
            </CartButton>
            <CartButton>
              <Text line-height="18px" size="13px" color="#2A2A2A" padding="0" margin="0">
                뽀또
              </Text>
              <div><MdCancel size="13px" color="#404040"/></div>
            </CartButton>
          </Grid>
          
          <CalcBox>
            <div>계산하러가기</div>
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
  padding: 2.8% 20px;

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