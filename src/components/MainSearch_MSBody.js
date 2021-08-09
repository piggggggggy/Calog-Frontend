import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
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
import CardList from './Main_CardList';
import MostUsedKey from './Main_MostUsedKey';
// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdCancel } from 'react-icons/md';
import { push } from 'connected-react-router';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 search_list, recent_list
 * @담당자 : 박용태
*/

const MSBody = (props) => {
// dispatch
  const dispatch = useDispatch();

  const search_list = useSelector((state) => state.search.filtered_list);
  const [_history, setHistory] = useState(true);
  const [filterMin, setMin] = useState(0);
  const [filterMax, setMax] = useState(5000);
  const [sortType, setSort] = useState('정확도순');
  const recent_list = useSelector((state) => state.recent.recent);
  const is_login = useSelector((state) => state.user.is_login);
  const keyword = useRef();

  // 페이지네이션
  const [paging, setPage] = useState({
    page: 1,
    start: 0,
    end: 4,
  });

  const handleNext = () => {
    const { page, start, end } = paging;
    setPage({
      page: page + 1,
      start: start + 4,
      end: end + 4,
    })
  }



  // 검색함수
  const search = () => {
    const data = {
      keyword: keyword.current.value,
      min: filterMin,
      max: filterMax
    };
    dispatch(searchKeywordDB(data));
    dispatch(countKeywordDB(keyword.current.value));
    {is_login ?
      dispatch(searchRecentDB(keyword.current.value))
      : dispatch(addRecent(keyword.current.value))};
    setHistory(true);
  };

  // 최근 검색어 검색
  const recentSearch = (keyword) => {
    const data = {
      keyword: keyword,
      min: filterMin,
      max: filterMax
    };
    dispatch(searchKeywordDB(data));
    dispatch(countKeywordDB(keyword));
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

  // history tab 관리
  const styles = _history ? {display: "none"} : {display: "block"};


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


  if (search_list?.length === 0) {
    history.replace('/');
  };

  return (
    <React.Fragment>

      <HeaderContainer>

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

          {/* 최근 검색어 영역 */}
          <SearchHistory style={styles} onClick={()=>{setHistory(true)}}>
            <div>
              <Grid is_flex padding="4.5vh 6% 1.8vh 6%">
                <Text lineheight="18px" bold size="13px" m_size="13px" color="#000000" padding="0" margin="0">최근검색어</Text>
              </Grid>
              <Line/>
              {recent_list[0] !== null ? recent_list.map((rec, idx) => {
                if (idx < 5) {
                  return (
                    <>
                      <Grid display="grid" grid_column="95% 5%" padding="1.3vh 8%" key={idx}>
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

        {/* Range Slider  */}
        <Grid padding="0 2.8vh" >
          <RangeSlider 
            min={0}
            max={5000}
            onChange={({ min, max }) => {
              debounceCB(min, max);
            }}
          />
        </Grid>

        {/* 정렬 선택 박스! */}
        <Grid margin="5vh 0 2vh 0" m_margin="5vh 0 2vh 0" padding="0 6%" display="flex" jc="flex-end">
          <SortBox>
            <SortSelect onChange={sortChange}>
              <option value="정확도순">정확도순</option>
              <option value="내림차순">칼로리높은순</option>
              <option value="오름차순">칼로리낮은순</option>
              <option value="가나다순">가나다순</option>
            </SortSelect>
            <ButtonBox>
              <IoIosArrowDown size="14px" color="8C8C8C"/>
            </ButtonBox>
          </SortBox>
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
          
  };
    

MSBody.defaultProps = {

}

const HeaderContainer = styled.div`
  max-width: 100%;
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

const SortBox = styled.div`
  display: flex; 
  justify-content: flex-end;
  width: auto;
  cursor: pointer;
  position: relative;
`;

const SortSelect = styled.select`
  border: none;
  font-size: 13px;
  color: #8C8C8C; 
  line-height: 18px; 
  margin: 0;
  padding: 0 20px 0 0;
  appearance: none;
`;

const ButtonBox = styled.div`
  position: absolute;
  right: 0;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MSBody;