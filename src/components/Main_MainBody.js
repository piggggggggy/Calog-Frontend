import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Main_Card';
import RangeSlider from './Main_RangeSlider';
import UnderBar from './Main_UnderBar';
// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 검색결과 리스트 값 / 
 * @담당자 : 박용태
*/

const MainBody = (props) => {
// dispatch
// props

// useEffect

  return (
    <React.Fragment>
      <BodyContainer>

        <SearchGrid>
          <div>
            <input placeholder="어떤 칼로리가 궁금하신가요?"/>
            <div>
              <BiSearchAlt2 size="24px" color="#5F5F5F" />
            </div>
          </div>
        </SearchGrid>

        <Grid margin="auto" width="90%" >
          <RangeSlider 
            min={0}
            max={5000}
            onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
          />
        </Grid>

        <Grid margin="6vh 0 3vh 0" padding="0 25px" display="flex" jc="flex-end">
          <Grid display="flex" jc="flex-end" width="auto" cursor>
            <Text size="13px" color="#8C8C8C" lineheight="18px" margin="0 5px 0 0" padding="0">칼로리높은순</Text>
            <Grid width="16px" height="16px" display="flex" jc="center">
              <IoIosArrowDown size="14px" color="8C8C8C"/>
            </Grid>
          </Grid>
        </Grid>

        <CardContainer>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </CardContainer>

        {/* <CartContainer>
          <Grid display="flex" jc="center" align-items="center" height="20px" width="20px" margin="10px auto" cursor>
            <IoIosArrowUp size="20" color="#757575"/>
          </Grid>
          <CalcBox>
            <div>계산하러가기</div>
          </CalcBox>
        </CartContainer> */}
        <UnderBar>
          
        </UnderBar>

      </BodyContainer>
    </React.Fragment>
  );
}

MainBody.defaultProps = {

}

const BodyContainer = styled.div`
  max-width: 100%;
`;

const SearchGrid = styled.div`
  padding: 3% 25px 3% 25px;
  
  & > div {
    position: relative;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    width: 100%;
    border: 1px solid #F19F13;
    padding: 1.3vh 25px;
    border-radius: 31px;

    & > input {
      display: block;
      padding: 0;
      font-size: 13px;
      font-weight: 400;
      width: 100%;
      border: none;
      outline: none;
      line-height: 18px;
    }

    & > div {
      position: absolute;
      padding: 0.5vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      right: 1.4vw;
      top: 0.5vh;
    }
  }
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 0 25px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
`;

const CartContainer = styled.div`
  width: 100%;
  height: 12.5%;
  position: fixed;
  bottom: 9%;
  border: none;
  border-top-left-radius: 44px;
  border-top-right-radius: 44px;
  box-shadow: 0px -5px 22px -8px rgba(0, 0, 0, 0.14);
  background: #fff;
  z-index: 20;
`;

const CalcBox = styled.div`
  display: none;
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

export default MainBody;