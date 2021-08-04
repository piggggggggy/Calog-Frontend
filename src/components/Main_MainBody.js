import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
// modules
import { searchKeywordDB, ascendingSort, descendingSort, koreanSort, rangeFilter, getScrollData } from '../redux/modules/search';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Main_Card';
import RangeSlider from './Main_RangeSlider';
import UnderBar from './Main_UnderBar';
import InfiniteScroll from './Main_InfiniteScroll';
// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdCancel } from 'react-icons/md';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 검색결과 리스트 값 / 
 * @담당자 : 박용태
*/

const MainBody = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const search_list = useSelector((state) => state.search.filtered_list);
  const is_loading = useSelector((state) => state.search.is_loading);
  const paging = useSelector((state) => state.search.paging);
  const [keyword, setKey] = useState();
  const [history, setHistory] = useState(true);
  const [filterMin, setMin] = useState(0);
  const [filterMax, setMax] = useState(5000);
// useEffect
  
  

  const keyChange = (e) => {
    setKey(e.target.value)
  };

  // 검색 함수!
  const search = () => {
    const data = {
      keyword: keyword,
      min: filterMin,
      max: filterMax
    };
    dispatch(searchKeywordDB(data));
  };

  // 검색어 삭제
  const deleteKeyword = () => {
    setKey('');
  };

  // history on off
  const historyOn = () => {
    setHistory(false);
  };
  const historyOff = () => {
    setHistory(true);
  };
  const styles = history ? {display: "none"} : {display: "block"};

  // 오름차순 정렬
  // dispatch(ascendingSort());
  // dispatch(descendingSort());
  // dispatch(koreanSort());
  const aa = () => {
    dispatch(descendingSort());
  };

  // range debounce  함수
  const debounce = _.debounce((n, x) => {
    setMin(n);
    setMax(x);
  }, 500);

  // range 요청
  const debounceRange = _.debounce((e) => {
    dispatch(rangeFilter(e));
  });
  const debounceRangeCB = useCallback((e) => {
    debounceRange(e);
  }, [filterMin, filterMax]);

  useEffect(() => {
    const data = {
      min: filterMin,
      max: filterMax
    };
    debounceRangeCB(data);
  }, [filterMin, filterMax]);

  // console.log(test.current.scrollHeight)
  // console.log(test.current.scrollTop)
  // console.log(test.current.clientHeight)


  return (
    <React.Fragment>

      <HeaderContainer>
        {/* 검색바 */}
        <SearchGrid>
          <SearchBox>
            <input onChange={(e)=>{keyChange(e)}} value={keyword} onFocus={()=>{historyOn()}} onBlur={()=>{historyOff()}} placeholder="어떤 칼로리가 궁금하신가요?"/>
            {keyword ? 
            <div onClick={()=>{deleteKeyword()}} style={{right: "10vw", top: "1vh", cursor: "pointer"}}>
              <MdCancel size="16px" color="#C4C4C4"/>
            </div>
            : ''}
            <div onClick={()=>{search()}}>
              <BiSearchAlt2 size="24px" color="#5F5F5F" />
            </div>
          </SearchBox>
          <SearchHistory style={styles}>
            <div>
              <Grid is_flex padding="1.8vh 6vw">
                <Text lineheight="18px" bold size="13px" m_size="13px" color="#000000" padding="0" margin="0">최근검색어</Text>
              </Grid>
              <Line/>
              <Grid is_flex padding="1.3vh 8vw">
                <Text lineheight="20px" m_lineheight="17px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">삼겹살</Text>
                <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <TiDeleteOutline size="15px" color="#737373"/>
                </div>
              </Grid>
              <Line/>
              <Grid is_flex padding="1.3vh 8vw">
                <Text lineheight="20px" m_lineheight="17px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">우유</Text>
                <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <TiDeleteOutline size="15px" color="#737373"/>
                </div>
              </Grid>
              <Line/>
              <Grid is_flex padding="1.3vh 8vw">
                <Text lineheight="20px" m_lineheight="17px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">고구마</Text>
                <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <TiDeleteOutline size="15px" color="#737373"/>
                </div>
              </Grid>
              <Line/>
              <Grid is_flex padding="1.3vh 8vw">
                <Text lineheight="20px" m_lineheight="17px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">고등어</Text>
                <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <TiDeleteOutline size="15px" color="#737373"/>
                </div>
              </Grid>
              <Line/>
              <Grid is_flex padding="1.3vh 8vw">
                <Text lineheight="20px" m_lineheight="17px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">토마토</Text>
                <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <TiDeleteOutline size="15px" color="#737373"/>
                </div>
              </Grid>
              <Line/>
              
            </div>
          </SearchHistory>
        </SearchGrid>

        {/* {Range Slider // 수정해야함} */}
        <Grid padding="0 2.8vh" >
          <RangeSlider 
            min={0}
            max={5000}
            onChange={({ min, max }) => {
              // console.log(`min = ${min}, max = ${min}`)
              debounce(min, max);
              // debounceMax(max);
            }}
          />
        </Grid>

        {/* 모냥만 만들어논 정렬 탭 */}
        <Grid margin="5vh 0 2vh 0" m_margin="5vh 0 2vh 0" padding="0 25px" display="flex" jc="flex-end">
          <Grid _onClick={()=>{aa()}} display="flex" jc="flex-end" width="auto" cursor>
            <Text size="13px" m_size="13px" color="#8C8C8C" lineheight="18px" margin="0 5px 0 0" padding="0">칼로리높은순</Text>
            <Grid width="16px" height="16px" display="flex" jc="center">
              <IoIosArrowDown size="14px" color="8C8C8C"/>
            </Grid>
          </Grid>
        </Grid>
      </HeaderContainer>    


      
        <BodyContainer>
          {/* 검색결과가 들어가는 곳 */}
          
            <CardContainer>
              <InfiniteScroll
                callNext={() => {
                  console.log("next!");
                }}
                is_next={paging.next}
                loading={is_loading}
              >
                {search_list.map((result, idx) => {
                  return (
                    <Card key={result.foodId} {...result}/>
                  )
                })}
              </InfiniteScroll>
            </CardContainer>

          

          {/* 장바구니 탭 */}
          <UnderBar>
          </UnderBar>

        </BodyContainer>

      
    </React.Fragment>
  );
}

MainBody.defaultProps = {

}
const HeaderContainer = styled.div`
  max-width: 100%;
  /* overflow: auto; */
  /* position: fixed;
  top: 0;
  width: 100%; */

`;

const BodyContainer = styled.div`
  padding-top: 2vh;
  max-width: 100%;
  max-height: 60vh;
  padding-bottom: 10vh;
  overflow: scroll;
`;

const SearchGrid = styled.div`
  padding: 3% 0;
  position: relative;
`;

const SearchBox = styled.div`
  position: relative;
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  width: 88vw;
  border: 1px solid #F19F13;
  padding: 1.3vh 25px;
  margin: auto;
  border-radius: 31px;

  & > input {
    display: block;
    padding: 0;
    font-size: 15px;
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
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 0 25px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
`;

const SearchHistory = styled.div`
  display: none;
  width: 100%;
  height: 70vh;
  /* overflow: hidden; */
  position: absolute;
  background: #00000048;
  z-index: 50;

  & > div {
    width: 100vw;
    height: 35vh;
    overflow: scroll;
    background: #fff;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
  }
`;

const Line = styled.div`
  width: 87vw;
  margin: auto;
  border: 1px solid #FFE899;
`;

export default MainBody;