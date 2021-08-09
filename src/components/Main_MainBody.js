import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import theme from '../shared/theme';
import { history } from '../redux/configStore';
// modules
import { searchKeywordDB, countKeywordDB, addMostUsedKey, rangeFilter } from '../redux/modules/search';
import { searchRecentDB, deleteRecentDB, addRecent, deleteRecent } from '../redux/modules/recent';
// elements & components
import { Grid, Text } from '../elements';
import RangeSlider from './Main_RangeSlider';
import UnderBar from './Main_UnderBar';
import FavoList from './Main_FavoList';
import MostUsedKey from './Main_MostUsedKey';
import RcmdList from './Main_RcmdList';
// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
// img
import Head from '../img/C_head.png';
import Face from '../img/C_face.png';
import Baloon from '../img/C_textBaloon.jpg';

/** 
 * @param {*} props
 * @returns 검색결과와 구분되는 첫페이지
 * @역할 말그대로 메인페이지의 body영역
 * @필수값 recent_list, is_login
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
  const favo_list = useSelector((state) => state.favorite.list);
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

        {/* Range Slider */}
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
      
      {favo_list.length === 0 ? 
      <Mascort>
        <MFace>
          <svg width="100%" height="256" viewBox="0 0 197 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="135" cy="135" r="135" fill="#E4E4E4"/>
            <path d="M75.7866 89.8393C77.6307 87.9894 78.6667 85.4804 78.6667 82.8642C78.6667 80.2481 77.6307 77.7391 75.7866 75.8892C73.9424 74.0393 71.4413 73 68.8333 73C66.2254 73 63.7242 74.0393 61.8801 75.8892C60.036 77.7391 59 80.2481 59 82.8642C59 85.4804 60.036 87.9894 61.8801 89.8393C63.7242 91.6892 66.2254 92.7284 68.8333 92.7284C71.4413 92.7284 73.9424 91.6892 75.7866 89.8393Z" fill="white"/>
            <path d="M115.12 89.8393C113.276 91.6892 110.775 92.7284 108.167 92.7284C105.559 92.7284 103.058 91.6892 101.213 89.8393C99.3693 87.9894 98.3333 85.4804 98.3333 82.8642C98.3333 80.2481 99.3693 77.7391 101.213 75.8892C103.058 74.0393 105.559 73 108.167 73C110.775 73 113.276 74.0393 115.12 75.8892C116.964 77.7391 118 80.2481 118 82.8642C118 85.4804 116.964 87.9894 115.12 89.8393Z" fill="white"/>
            <path d="M72.1608 110.047C73.6562 110.931 74.7412 112.374 75.1777 114.059C76.8887 119.786 82.9985 122.318 88.5052 122.318C94.0118 122.318 100.128 119.78 101.833 114.059C102.295 112.404 103.384 110.996 104.868 110.137C106.352 109.278 108.112 109.036 109.771 109.462C111.431 109.888 112.858 110.949 113.748 112.418C114.637 113.887 114.918 115.646 114.531 117.32C111.135 128.816 100.207 135.471 88.5052 135.471C77.2493 135.471 65.3575 128.894 62.4796 117.334C62.0518 115.646 62.3085 113.857 63.1935 112.36C64.0785 110.862 65.5196 109.777 67.2006 109.344C68.8816 108.91 70.6654 109.163 72.1608 110.047Z" fill="white"/>
          </svg>
          <TextBaloon>
            <svg width="227" height="60" viewBox="0 0 227 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M221.101 7.69592C222.638 10.711 222.638 14.6579 222.638 22.5517V45.2713C222.65 51.2921 222.777 54.5387 224.07 57.0774C224.612 58.1411 225.293 59.1194 226.089 59.9893C222.836 59.8802 219.791 58.944 217.16 57.3843C214.93 59.0284 212.173 60 209.189 60H22.5517C14.6579 60 10.711 60 7.69591 58.4638C5.0438 57.1124 2.88756 54.9562 1.53624 52.3041C0 49.289 0 45.3421 0 37.4483V22.5517C0 14.6579 0 10.711 1.53624 7.69592C2.88756 5.04381 5.0438 2.88757 7.69591 1.53625C10.711 7.62939e-06 14.6579 7.62939e-06 22.5517 7.62939e-06H200.086C207.98 7.62939e-06 211.927 7.62939e-06 214.942 1.53625C217.594 2.88757 219.75 5.04381 221.101 7.69592Z" fill="#EFAF00" fill-opacity="0.5"/>
            </svg>
            <div>
              로그인을 하면 내가 자주먹는 음식을 등록해서 볼 수 있어요!
            </div>
          </TextBaloon>
        </MFace>
      </Mascort>
      : <></>}

      
    </React.Fragment>
  );
}

  


MainBody.defaultProps = {

}

const HeaderContainer = styled.div`
  max-width: 100%;
  /* overflow: hidden; */
`;

const TopBack = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  min-width: 280px;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 26.6vh;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const BodyContainer = styled.div`
  padding-top: 2vh;
  max-width: 100%;
  max-height: 37vh;
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

const Mascort = styled.div`
  position: absolute;
  width: 100%;
  bottom: 5%;
  background: #c7c7c7;

  @media ${theme.device.mobileS} {
      bottom: 0;
  }
`;

const MFace = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-left: 53%;
`;

const TextBaloon = styled.div`
  position: absolute;
  left: 7.6%;
  top: -10%;
  width: 53%;
  
  @media ${theme.device.mobileM} {
    top: -5%;
  }

  @media ${theme.device.mobileS} {
    top: 5%;
  }

  & > svg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  & > div {
    position: relative;
    padding: 4% 5% 4% 3%;
    width: 100%;
    font-size: 15px;
    line-height: 20px;
    color: #fff;
    letter-spacing: -0.583379px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${theme.device.mobileM} {
      font-size: 13px;
      line-height: 15px;
      padding: 4% 8% 4% 7%;
    }

    @media ${theme.device.mobileS} {
      font-size: 11px;
      line-height: 13px;
      padding: 4% 8% 4% 8%;
    }
  }
`;

export default MainBody;