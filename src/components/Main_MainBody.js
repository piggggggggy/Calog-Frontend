import React from 'react';
import styled from 'styled-components';
import { Range, getTrackBackground } from 'react-range';
// elements & components
import { Grid } from '../elements';
import Card from './Main_Card';
// icon
import { BiSearchAlt2 } from 'react-icons/bi';

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

  const category_list = [
    "자주먹는",
    "자주검색된",
    "추천하는",
  ]

  return (
    <React.Fragment>
      <BodyContainer>

        <SearchGrid margin="1rem 0.5rem">
          <div>
            <input placeholder="입력해"/>
            <div>
              <BiSearchAlt2 size="1rem" />
            </div>
          </div>
        </SearchGrid>

        <Grid display="flex" jc="center" padding="0 20px">
          {category_list.map((c, idx) => {
            return (
              <CategoryButton key={idx}>{c}</CategoryButton>
            )
          })}
        </Grid>

        <Grid margin="30px 0">
          <Grid>
            <RangeTrack>
              <RangeBar/>
              <RangePoint style={{left:"0"}}/>
              <RangePoint style={{right:"0"}}/>
            </RangeTrack>
          </Grid>
          {/* <Range
            draggableTrack
            step
            min
            max
            values
            onChange
            renderTrack
            renderThumb
            /> */}
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
  padding: 0 25px;
`;

const SearchGrid = styled.div`
  margin: 10px 0;
  
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #000;
    padding: 9px 20px;
    border-radius: 25px;

    & > input {
      display: block;
      font-size: 14px;
      font-weight: 400;
      width: 100%;
      border: none;
      outline: none;
      line-height: 1rem;
    }

    & > div {
      cursor: pointer;
      padding-left: 10px;
    }
  }
`;

const CategoryButton = styled.button`
  /* width: 54px; */
  margin: 5px;
  /* height: 20px; */
  padding: 5px;
  line-height: 1rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 15px;
  background: #d87c3f;
  cursor: pointer;
`;

const RangeTrack = styled.div`
  position: relative;
  width: 100%;
  height: 0.5rem;
  background: #bdc3c7;
  /* border-radius: ; */
`;

const RangeBar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2c3e50;
`;

const RangePoint = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(-0.25rem);
  width: 1rem;
  height: 1rem;
  background-color: black;
  border-radius: 50%;
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%auto;
  display: flex;
  flex-wrap: wrap;
  column-gap: 6%;
`;


export default MainBody;