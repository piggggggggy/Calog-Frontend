import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useInView } from "react-intersection-observer";
import theme from '../shared/theme';
import { history } from '../redux/configStore';
// modules
import { searchKeywordDB, countKeywordDB, ascendingSort, descendingSort, koreanSort, exactSort, rangeFilter, getScrollData, addMostUsedKey } from '../redux/modules/search';
import { searchRecentDB, getRecentDB, deleteRecentDB, addRecent, deleteRecent } from '../redux/modules/recent';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Main_Card';
import RangeSlider from './Main_RangeSlider';
import UnderBar from './Main_UnderBar';
import InfiniteScroll from './Main_InfiniteScroll';
import CardList from './Main_CardList';
import FavoList from './Main_FavoList';
import MostUsedKey from './Main_MostUsedKey';
import RcmdList from './Main_RcmdList';
// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdCancel } from 'react-icons/md';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 search_list, recent_list
 * @담당자 : 박용태
*/

const MainBody = (props) => {
// dispatch
  const dispatch = useDispatch();
// props  
  const [_history, setHistory] = useState(true);
  const [filterMin, setMin] = useState(0);
  const [filterMax, setMax] = useState(5000);
  const recent_list = useSelector((state) => state.recent.recent);
  const is_login = useSelector((state) => state.user.is_login);
  const keyword = useRef();
// useEffect

  // 검색함수
  const search = () => {
    const data = {
      keyword: keyword.current.value,
      min: filterMin,
      max: filterMax
    };
    dispatch(searchKeywordDB(data));
    {is_login ? 
      dispatch(countKeywordDB(keyword.current.value))
      : dispatch(addMostUsedKey(keyword.current.value))};
    {is_login ?
      dispatch(searchRecentDB(keyword.current.value))
      : dispatch(addRecent(keyword.current.value))};
    setHistory(true);
    history.push('/search');
  };
  // 최근 검색어 검색
  const recentSearch = (keyword) => {
    const data = {
      keyword: keyword,
      min: filterMin,
      max: filterMax
    };
    dispatch(searchKeywordDB(data));
    {is_login ? 
      dispatch(countKeywordDB(keyword))
      : dispatch(addMostUsedKey(keyword))};
    {is_login ?
      dispatch(searchRecentDB(keyword))
      : dispatch(addRecent(keyword))};
    setHistory(true);
    history.push('/search');
  };
  // 최근 검색어 삭제
  const recentDelete = (keyword) => {
    {is_login ? dispatch(deleteRecentDB(keyword)) 
      : dispatch(deleteRecent(keyword))}
  };

  // 엔터 검색
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
      keyword.current.vlaue = '';
    }
  };
  // 검색어 삭제
  const deleteKeyword = () => {
    keyword.current.value = '';
  };

  // history tab 관리
  const styles = _history ? {display: "none"} : {display: "block"};

  // range debounce  함수
  const debounce = _.debounce((n, x) => {
    setMin(n);
    setMax(x);
  }, 500);

  // range 요청
  const debounceRange = _.debounce((e) => {
    dispatch(rangeFilter(e));
  }, 500);
  const debounceRangeCB = useCallback((e) => {
    debounceRange(e);
  }, []);

  useEffect(() => {
    const data = {
      min: filterMin,
      max: filterMax
    };
    debounceRangeCB(data);
  }, [filterMin, filterMax]);



  return (
    <React.Fragment>

      <HeaderContainer>

        {/* 배경 */}
        <TopBack/>

        {/* 검색바 */}
        <SearchGrid>
          <SearchBox>
            <input 

            ref={keyword}
            onFocus={()=>{setHistory(false)}} 
            // onBlur={()=>{setHistory(true)}}
            placeholder="어떤 칼로리가 궁금하신가요?"
            onKeyPress={onKeyPress}
            />
            {keyword ? 
            <div onClick={()=>{deleteKeyword()}} style={{right: "10%", top: "1vh", cursor: "pointer"}}>
              <MdCancel size="16px" color="#C4C4C4"/>
            </div>
            : ''}
            <div onClick={()=>{search()}}>
              <BiSearchAlt2 size="24px" color="#F19F13" />
            </div>
          </SearchBox>

          <SearchHistory style={styles}>
            <div>
              <Grid is_flex padding="4.5vh 6% 1.8vh 6%">
                <Text lineheight="18px" bold size="13px" m_size="13px" color="#000000" padding="0" margin="0">최근검색어</Text>
              </Grid>
              <Line/>
              {recent_list[0] !== null ? recent_list.map((rec, idx) => {
                if (idx < 5) {
                  return (
                    <>
                      <Grid display="grid" grid_column="95% 5%" padding="1.1vh 8%" key={idx}>
                        <Grid cursor _onClick={()=>{recentSearch(rec)}}>
                          <Text lineheight="18px" m_lineheight="15px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">{rec}</Text>
                        </Grid>
                        <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <TiDeleteOutline onClick={()=>{recentDelete(rec)}} size="15px" color="#737373"/>
                        </div>
                      </Grid>
                      <Line/>
                    </>
                  )
                }
              }) : ''}
            </div>
          </SearchHistory>
          
          {/* 인기검색어 */}
          <MostUsedKey/>
          
        </SearchGrid>

        {/* 추천 푸드 */}
        <RcmdList/>

        {/* {Range Slider // 수정해야함} */}
        <Grid padding="0 2.8vh" >
          <RangeSlider 
            min={0}
            max={5000}
            onChange={({ min, max }) => {
              debounce(min, max);
            }}
          />
        </Grid>
        <Grid padding="0 0 4vh 0"/>
      </HeaderContainer>    



      <BodyContainer>
        {/* 즐겨찾기가 들어가는 곳 */}
        <FavoList/>

        {/* 장바구니 탭 */}
        <UnderBar/>
      </BodyContainer>

      
    </React.Fragment>
  );
}

  


MainBody.defaultProps = {

}

const HeaderContainer = styled.div`
  max-width: 100%;
`;

const TopBack = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 26.6vh;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const BodyContainer = styled.div`
  padding-top: 2vh;
  max-width: 100%;
  max-height: 35vh;
  padding-bottom: 20vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchGrid = styled.div`
  padding: 1vh 0 0 0;
  width: 100%;
  position: relative;
`;

const SearchBox = styled.div`
  position: relative;
  width: 88%;
  border: 1px solid #F19F13;
  padding: 1.3vh 25px;
  margin: auto;
  border-radius: 31px;
  background: #ffffff;
  position: relative;
  z-index: 200;

  & > input {
    display: block;
    padding: 0;
    font-size: 15px;
    font-weight: 400;
    width: 100%;
    border: none;
    outline: none;
    line-height: 18px;
    position: relative;
    z-index: 200;

    @media ${theme.device.mobileMini} {
      font-size: 13px;
    }
  }

  & > div {
    position: absolute;
    padding: 0.5vh;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    right: 1.4%;
    top: 0.5vh;
    z-index: 210;
  }
`;

const SearchHistory = styled.div`
  display: none;
  width: 100%;
  max-width: 420px;
  height: 80vh;
  position: fixed;
  top: calc(11.1vh + 7.5px);
  background: #00000048;
  z-index: 180;
  overflow: hidden;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;

  @media ${theme.device.mobileMini} {
    top: calc(11.1vh + 6.5px);
  }

  & > div {
    width: 100%;
    height: 35vh;
    background: #fff;
    border-radius: 28px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Line = styled.div`
  width: 87%;
  margin: auto;
  border: 1px solid #FFE899;
`;

export default MainBody;