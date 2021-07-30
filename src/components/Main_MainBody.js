import React from 'react';
import styled from 'styled-components';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Main_Card';
import RangeSlider from './RangeSlider';
// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';

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

        <Grid margin="42px 0 25px 0" padding="0 25px" display="flex" jc="flex-end">
          <Grid display="flex" jc="flex-end" width="35%" cursor>
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
        </CardContainer>



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
  margin: 18px 25px 11px 25px;
  
  & > div {
    position: relative;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    width: 100%;
    border: 1px solid #F19F13;
    padding: 12px 25px;
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
      padding: 4px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      right: 13px;
      top: 5px;
    }
  }
`;

const CardContainer = styled.div`
  margin-top: 60px;
  max-width: 370px;
  margin: auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
`;


export default MainBody;