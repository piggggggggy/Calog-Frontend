import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// theme
import theme from '../shared/theme';

// lodash
import _ from 'lodash';

// modules
import { 
  searchKeywordDB, 
  countKeywordDB, 
  ascendingSort, 
  descendingSort, 
  koreanSort, 
  rangeFilter, 
} from '../redux/modules/search';
import { searchRecentDB, deleteRecentDB, addRecent, deleteRecent } from '../redux/modules/recent';
import { isLoaded } from '../redux/modules/record';

// elements & components
import { Grid, Text } from '../elements';
import RangeSlider from './Main_RangeSlider';
import UnderBar from './Main_UnderBar';
import CardList from './Main_CardList';
import MostUsedKey from './Main_MostUsedKey';


// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdCancel } from 'react-icons/md';

/** 
 * @param {*} props
 * @returns 검색결과 페이지
 * @역할 검색결과 페이지의 body
 * @담당자 : 박용태
*/

const MSBody = (props) => {

  // dispatch
  const dispatch = useDispatch();

  // 검색결과
  const search_list = useSelector((state) => state.search.filtered_list);
  
  // 검색 히스토리 on off
  const [_history, setHistory] = useState(true);
  
  // 칼로리 range 필터
  const [filterMin, setMin] = useState(0);
  const [filterMax, setMax] = useState(5000);
  
  // 정렬
  const [sortType, setSort] = useState('정확도순');
  
  // 최근검색어
  const recent_list = useSelector((state) => state.recent.recent);
  
  // 로그인체크
  const is_login = useSelector((state) => state.user.is_login);
  
  // 검색키워드
  const keyword = useRef(); 


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
  const [key, setKey] = useState();
  const _setKey = _.debounce((e) => {
    setKey(e.target.value);
  }, 500)
  
  const deleteKeyword = () => {
    keyword.current.value = '';
    setKey('');
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
  const debounceRangeCB = useCallback((e) => {
    dispatch(rangeFilter(e));
  }, [])

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

        {/* 검색바 */}
        <SearchGrid>
          <SearchBox>
            <input 
            ref={keyword}
            onFocus={()=>{setHistory(false)}} 
            // onBlur={()=>{setHistory(true)}} 
            placeholder="어떤 칼로리가 궁금하신가요?"
            onKeyPress={onKeyPress}
            onChange={_setKey}
            />
            {key ? 
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
              {recent_list.length !== 0 ? recent_list.map((rec, idx) => {
                if (idx < 5) {
                  return (
                    <>
                      <Grid is_flex padding="1.3vh 8%" key={idx}>
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
            max={2000}
            onChange={({ min, max }) => {
              debounceCB(min, max);
            }}
          />
        </Grid>

        {/* 정렬 선택 박스! */}
        <Grid margin="5vh 0 2vh 0" m_margin="5vh 0 2vh 0" padding="0 6%" display="flex" jc="flex-end">
          <SortBox>
            <SortSelect onChange={sortChange}>
              <SortOption value="정확도순">정확도순</SortOption>
              <SortOption value="내림차순">칼로리높은순</SortOption>
              <SortOption value="오름차순">칼로리낮은순</SortOption>
              <SortOption value="가나다순">가나다순</SortOption>
            </SortSelect>
            <ButtonBox>
              <IoIosArrowDown size="14px" color="8C8C8C"/>
            </ButtonBox>
          </SortBox>
        </Grid>
      </HeaderContainer>    



      <BodyContainer>

        {/* 검색결과가 들어가는 곳 */}
        {/* <CardList search_list={search_list}/> */}
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

    @media screen and (max-width: 320px) {
      font-size: 11px;
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
    min-height: 250px;
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

const SortOption = styled.option`
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