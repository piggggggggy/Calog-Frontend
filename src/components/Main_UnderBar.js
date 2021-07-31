import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// elements & components
import { Grid } from '../elements';
// icons
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';


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
  const { width, height, children } = props;
  const [barOnOff, barSet] = useState(false);
// useEffect

  const toggleCart = () => {
    if (barOnOff === false) {
      barSet(true);
    }else{
      barSet(false);
    }
  };

  // const OnOff = () => {
  //   return (
  //     barOnOff ? "top: '87.5%'" : "bottom: '9%'"
  //   )
  // };

  // const style = {
  //   height,
  //   barOnOff
  // };

  // const styles = { 
  //   transform: `translate(${x}px, ${y}px)` }; 
  //   return ( <div style={styles}></div> );

  // const styles = {
  //   transform: `translateY(${barOnOff ? '-50%' : '12.5%'}});`
  // }

  const kk = () => {
    if (barOnOff) {
      return '-50%'
    }else{
      return '12.5%'
    }
  };

  return (
    <React.Fragment>
      <CartContainer 
        // style={styles}
      style={{ 
        transform: `translateY(${kk});`,
        // transform: "translateY(80%);"
        // height: `${barOnOff ? '500px': '12.5%'}`,
        // top: `${barOnOff ?  '' : '87.5%'}`,
        // bottom: `${barOnOff ? '9%' : ''}`
        }}
        >
          <Grid _onClick={toggleCart} display="flex" jc="center" align-items="center" height="20px" width="20px" margin="10px auto" cursor>
            {barOnOff ? 
            <IoIosArrowDown size="20" color="#757575"/>
            : <IoIosArrowUp size="20" color="#757575"/> }
          </Grid>
          <CalcBox 
          // style={{ display: `${barOnOff ? 'block': 'none'}` }}
          >
            <div>계산하러가기</div>
          </CalcBox>
        </CartContainer>
    </React.Fragment>
  );
}

UnderBar.defaultProps = {

}

// const BarContainer = styled.div`

// `;

const CartContainer = styled.div`
  width: 100%;
  /* height: 12.5%; */
  height: 500px;
  position: fixed;
  bottom: 9%;
  border: none;
  border-top-left-radius: 44px;
  border-top-right-radius: 44px;
  box-shadow: 0px -5px 22px -8px rgba(0, 0, 0, 0.14);
  background: #fff;
  z-index: 20;
  transition: 1s ease;
`;

const CalcBox = styled.div`
  /* display: none; */
  position: absolute;
  bottom: 0;
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

export default UnderBar;