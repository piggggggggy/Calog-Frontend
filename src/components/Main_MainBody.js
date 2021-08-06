import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useInView } from "react-intersection-observer";
// modules
import { searchKeywordDB, countKeywordDB, ascendingSort, descendingSort, koreanSort, exactSort, rangeFilter, getScrollData } from '../redux/modules/search';
import { searchRecentDB, getRecentDB, deleteRecentDB } from '../redux/modules/recent';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Main_Card';
import RangeSlider from './Main_RangeSlider';
import UnderBar from './Main_UnderBar';
import InfiniteScroll from './Main_InfiniteScroll';
import CardList from './Main_CardList';
import FavoList from './Main_FavoList';
import MostUsedKey from './Main_MostUsedKey';
// import SearchHistory from './Main_SearchHistory';
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
  // const [keyword, setKey] = useState();
  const [history, setHistory] = useState(true);
  const [filterMin, setMin] = useState(0);
  const [filterMax, setMax] = useState(5000);
  const [sortType, setSort] = useState('정확도순');
  const recent_list = useSelector((state) => state.recent.recent);
  const keyword = useRef();
  console.log(recent_list);
// useEffect
  
  // 검색 함수!
  // const keyChange = (e) => {
  //   setKey(e.target.value)
  // };
  
  const search = () => {
    const data = {
      keyword: keyword.current.value,
      min: filterMin,
      max: filterMax
    };
    dispatch(searchKeywordDB(data));
    dispatch(countKeywordDB(keyword.current.value));
    dispatch(searchRecentDB(keyword.current.value));
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

  // 정렬 선택
  const sortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    if (sortType === "내림차순") {
      dispatch(descendingSort());
    } else if (sortType === "오름차순") {
      dispatch(ascendingSort());
    } else if (sortType === "가나다순") {
      dispatch(koreanSort());
    } else if (sortType === "정확도순") {
      const data = {
        min: filterMin,
        max: filterMax
      };
      debounceRangeCB(data);
    }
  }, [sortType])

  // history on off
  const historyOnoff = useCallback(() => {
    if (history) {
      setHistory(false);
    } else {
      setHistory(true);
    }
  }, [history]);
  const styles = history ? {display: "none"} : {display: "block"};


  // range debounce  함수
  const debounce = _.debounce((n, x) => {
    setMin(n);
    setMax(x);
  }, 500);
  const debounceCB = useCallback((n, x) => {
    debounce(n,x);
  }, [])

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


  if (search_list.length !== 0) {
    return (
      <React.Fragment>
  
        <HeaderContainer>
          {/* 검색바 */}
          <SearchGrid>
            <SearchBox>
              <input 
              // onChange={(e)=>{keyChange(e)}} 
              // value={keyword} 
              ref={keyword}
              onFocus={()=>{historyOnoff()}} onBlur={()=>{historyOnoff()}} 
              placeholder="어떤 칼로리가 궁금하신가요?"
              onKeyPress={onKeyPress}
              />
              {keyword ? 
              <div onClick={()=>{deleteKeyword()}} style={{right: "10%", top: "1vh", cursor: "pointer"}}>
                <MdCancel size="16px" color="#C4C4C4"/>
              </div>
              : ''}
              <div onClick={()=>{search()}}>
                <BiSearchAlt2 size="24px" color="#5F5F5F" />
              </div>
            </SearchBox>
  
            <SearchHistory style={styles}>
              <div>
                <Grid is_flex padding="1.8vh 6%">
                  <Text lineheight="18px" bold size="13px" m_size="13px" color="#000000" padding="0" margin="0">최근검색어</Text>
                </Grid>
                <Line/>
                {recent_list[0] !== null ? recent_list.map((rec, idx) => {
                  if (idx < 5) {
                    return (
                      <>
                        <Grid is_flex padding="1.3vh 8%"  key={idx}>
                          <Text lineheight="20px" m_lineheight="17px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">{rec}</Text>
                          <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <TiDeleteOutline onClick={()=>{dispatch(deleteRecentDB(rec))}} size="15px" color="#737373"/>
                          </div>
                        </Grid>
                        <Line/>
                      </>
                    )
                  }
                }) : ''}
              </div>

            </SearchHistory>
            <MostUsedKey/>
          </SearchGrid>
  
          {/* {Range Slider // 수정해야함} */}
          <Grid padding="0 2.8vh" >
            <RangeSlider 
              min={0}
              max={5000}
              onChange={({ min, max }) => {
                debounceCB(min, max);
              }}
            />
          </Grid>
  
          {/* 모냥만 만들어논 정렬 탭 */}
          <Grid margin="5vh 0 2vh 0" m_margin="5vh 0 2vh 0" padding="0 25px" display="flex" jc="flex-end">
            <Grid display="flex" jc="flex-end" width="auto" cursor>
              <SortSelect onChange={sortChange}>
                <SortOption value="정확도순">정확도순</SortOption>
                <SortOption value="내림차순">칼로리높은순</SortOption>
                <SortOption value="오름차순">칼로리낮은순</SortOption>
                <SortOption value="가나다순">가나다순</SortOption>
              </SortSelect>
              <Grid width="16px" height="16px" display="flex" jc="center">
                <IoIosArrowDown size="14px" color="8C8C8C"/>
              </Grid>
            </Grid>
          </Grid>
        </HeaderContainer>    
  
        <BodyContainer>
          {/* 검색결과가 들어가는 곳 */}
          <CardList search_list={search_list}/>
  
          {/* 장바구니 탭 */}
          <UnderBar/>
        </BodyContainer>
  
        
      </React.Fragment>
    );
    
  } else {
    // 검색없는 메인 화면!!!!!!!!!!!!!!!!!!!!
    return (
      <React.Fragment>
  
        <HeaderContainer>
          {/* 검색바 */}
          <SearchGrid>
            <SearchBox>
              <input 
              // onChange={(e)=>{keyChange(e)}} 
              // value={keyword} 
              ref={keyword}
              onFocus={()=>{historyOnoff()}} onBlur={()=>{historyOnoff()}} 
              placeholder="어떤 칼로리가 궁금하신가요?"
              onKeyPress={onKeyPress}
              />
              {keyword ? 
              <div onClick={()=>{deleteKeyword()}} style={{right: "10%", top: "1vh", cursor: "pointer"}}>
                <MdCancel size="16px" color="#C4C4C4"/>
              </div>
              : ''}
              <div onClick={()=>{search()}}>
                <BiSearchAlt2 size="24px" color="#5F5F5F" />
              </div>
            </SearchBox>

            <SearchHistory style={styles}>
              <div>
                <Grid is_flex padding="1.8vh 6%">
                  <Text lineheight="18px" bold size="13px" m_size="13px" color="#000000" padding="0" margin="0">최근검색어</Text>
                </Grid>
                <Line/>
                {recent_list[0] !== null ? recent_list.map((rec, idx) => {
                  if (idx < 5) {
                    return (
                      <>
                        <Grid is_flex padding="1.3vh 8%"  key={idx}>
                          <Text lineheight="20px" m_lineheight="17px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">{rec}</Text>
                          <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <TiDeleteOutline onClick={()=>{dispatch(deleteRecentDB(rec))}} size="15px" color="#737373"/>
                          </div>
                        </Grid>
                        <Line/>
                      </>
                    )
                  }
                }) : ''}
              </div>
            </SearchHistory>
            <MostUsedKey/>
            
          </SearchGrid>
  
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
          {/* 검색결과가 들어가는 곳 */}
          <FavoList/>
  
          {/* 장바구니 탭 */}
          <UnderBar/>
        </BodyContainer>
  
        
      </React.Fragment>
    );
  }

  
}

MainBody.defaultProps = {

}
const HeaderContainer = styled.div`
  max-width: 100%;
  /* overflow: hidden; */
  /* overflow: hidden; */
  
`;

const BodyContainer = styled.div`
  padding-top: 2vh;
  max-width: 100%;
  max-height: 53vh;
  padding-bottom: 5vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchGrid = styled.div`
  padding: 3% 0;
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
    right: 1.4%;
    top: 0.5vh;
  }
`;

const SearchHistory = styled.div`
  display: none;
  width: 100%;
  max-width: 420px;
  height: 67vh;
  position: absolute;
  top: 1;
  background: #00000048;
  z-index: 200;
  overflow: hidden;

  

  & > div {
    width: 100%;
    height: 35vh;
    overflow: scroll;
    background: #fff;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;

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

const SortSelect = styled.select`
  /* width: 100%; */
  border: none;
  font-size: 13px;
  color: #8C8C8C; 
  line-height: 18px; 
  margin: 0;
  padding: 0 5px 0 0;
  appearance: none;
`;

const SortOption = styled.option`

`;

export default MainBody;