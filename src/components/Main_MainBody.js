import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import theme from '../shared/theme';
import { history } from '../redux/configStore';

// modules
import { searchKeywordDB, countKeywordDB, addMostUsedKey, rangeFilter } from '../redux/modules/search';
import { searchRecentDB, deleteRecentDB, addRecent, deleteRecent } from '../redux/modules/recent';
import { getFavoriteDB } from '../redux/modules/favorite';

// elements & components
import { Grid, Text } from '../elements';
import RangeSlider from './Main_RangeSlider';
import UnderBar from './Main_UnderBar';
import FavoList from './Main_FavoList';
import MostUsedKey from './Main_MostUsedKey';
import RcmdList from './Main_RcmdList';
import Loading from '../pages/Loading4';

// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

/** 
 * @param {*} props
 * @returns 검색결과와 구분되는 첫페이지
 * @역할 말그대로 메인페이지의 body영역
 * @담당자 : 박용태
*/

const MainBody = (props) => {

  // dispatch
  const dispatch = useDispatch();

  // 검색히스토리 on off
  const [_history, setHistory] = useState(true);

  // 칼로리 range
  const [filterMin, setMin] = useState(0);
  const [filterMax, setMax] = useState(5000);

  // 최근 검색리스트, 즐겨찾기 리스트
  const recent_list = useSelector((state) => state.recent.recent);
  const favo_list = useSelector((state) => state.favorite.list);
  
  // 로그인체크 
  const is_login = useSelector((state) => state.user.is_login);

  // 스피너
  const is_loaded = useSelector((state) => state.record.is_loaded)
  
  // 검색 키워드
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

  // 최근 검색어 검색 (클릭)
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

  // history tab 관리
  const styles = _history ? {display: "none"} : {display: "block"};




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

              <Grid is_flex padding="4.5vh 6% 2vh 6%">
                <Text lineheight="18px" bold size="13px" m_size="13px" color="#000000" padding="0" margin="0">최근검색어</Text>
              </Grid>
              
              <Line/>
              
              {recent_list.length !== 0 ? recent_list.map((rec, idx) => {
                if (idx < 5) {
                  return (
                    <>
                      <Grid is_flex padding="1.1vh 11% 1.1vh 8%" key={idx}>
                        
                        <Grid cursor _onClick={()=>{recentSearch(rec)}}>
                          <Text lineheight="18px" m_lineheight="15px" size="15px" m_size="13px" color="#404040" padding="0" margin="0">{rec}</Text>
                        </Grid>
                        
                        <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <TiDeleteOutline onClick={()=>{recentDelete(rec)}} size="18px" color="#737373"/>
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

      </HeaderContainer>    



      <BodyContainer>

        {/* 즐겨찾기가 들어가는 곳 */}
        {is_login && favo_list.length !== 0 ? <FavoList favo_list={favo_list}/> : ''}

      </BodyContainer>
      
      {!is_login || favo_list.length === 0 ? 
      <Mascort>
        <MFace>
          <svg   viewBox="0 0 199 274" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M282.891 165C318.334 278.635 214.052 330 129.131 330C44.2106 330 -23.9337 270.544 8.03445 165C34.4221 77.8772 52.7239 0 137.645 0C222.565 0 256.743 81.1631 282.891 165Z" fill="#E4E4E4"/>
            <path d="M99.5696 81.6144C101.169 80.0048 102.066 77.8278 102.066 75.5588C102.066 73.2908 101.168 71.1149 99.5696 69.5063C97.9691 67.9038 95.7978 67.0025 93.5329 67.0005C91.2692 67.0033 89.0992 67.9046 87.4995 69.5063C85.8987 71.1138 84.9999 73.2901 85 75.5588C84.9991 77.8285 85.8979 80.0061 87.4995 81.6144C89.0992 83.2161 91.2692 84.1174 93.5329 84.1202C95.7978 84.1182 97.9691 83.2169 99.5696 81.6144Z" fill="white"/>
            <path d="M142.244 81.6139C140.644 83.2156 138.474 84.1169 136.211 84.1197C133.947 84.1169 131.777 83.2156 130.177 81.6139C128.576 80.0056 127.677 77.828 127.678 75.5583C127.678 73.2896 128.576 71.1134 130.177 69.5058C131.777 67.9041 133.947 67.0028 136.211 67C138.474 67.0028 140.644 67.9041 142.244 69.5058C143.845 71.1134 144.744 73.2896 144.744 75.5583C144.745 77.828 143.846 80.0056 142.244 81.6139Z" fill="white"/>
            <path d="M100.536 99.158C101.835 99.9257 102.776 101.177 103.152 102.638C104.639 107.609 109.942 109.804 114.719 109.804C119.497 109.804 124.806 107.59 126.286 102.638C126.685 101.203 127.63 99.9807 128.919 99.2339C130.205 98.4879 131.734 98.2777 133.174 98.6486C134.616 99.0198 135.855 99.9409 136.626 101.214C137.4 102.489 137.643 104.015 137.303 105.467C134.358 115.442 124.875 121.22 114.719 121.22C104.953 121.22 94.632 115.525 92.1357 105.479C91.768 104.014 91.9955 102.462 92.7685 101.164C93.5356 99.864 94.7873 98.9217 96.2487 98.5442C97.7028 98.1762 99.2434 98.3968 100.536 99.158Z" fill="white"/>
            <path d="M144.676 113.014C144.676 113.014 132.761 109.837 130.84 95.5381" stroke="white" strokeWidth="9.53235" strokeMiterlimit="10" strokeLinecap="round"/>
          </svg>
          <TextBaloon>
            <svg viewBox="0 0 227 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M221.101 7.69592C222.638 10.711 222.638 14.6579 222.638 22.5517V45.2713C222.65 51.2921 222.777 54.5387 224.07 57.0774C224.612 58.1411 225.293 59.1194 226.089 59.9893C222.836 59.8802 219.791 58.944 217.16 57.3843C214.93 59.0284 212.173 60 209.189 60H22.5517C14.6579 60 10.711 60 7.69591 58.4638C5.0438 57.1124 2.88756 54.9562 1.53624 52.3041C0 49.289 0 45.3421 0 37.4483V22.5517C0 14.6579 0 10.711 1.53624 7.69592C2.88756 5.04381 5.0438 2.88757 7.69591 1.53625C10.711 7.62939e-06 14.6579 7.62939e-06 22.5517 7.62939e-06H200.086C207.98 7.62939e-06 211.927 7.62939e-06 214.942 1.53625C217.594 2.88757 219.75 5.04381 221.101 7.69592Z" fill="#EFAF00" fillOpacity="0.5"/>
            </svg>
            <div>
              내가 자주먹는 음식을 등록해서
              <br/>볼 수 있어요!
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
  position: relative;
  max-width: 420px;
  /* overflow: hidden; */
`;

const TopBack = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  min-width: 280px;
  /* max-width: 420px; */
  background-color: ${theme.color.light};
  height: 26.6vh;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const BodyContainer = styled.div`
  padding-top: 2vh;
  max-width: 100%;
  max-height: 45vh;
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
  border-radius: 0.5px;
`;

const Mascort = styled.div`
  position: fixed;
  max-width: 420px;
  width: 100%;
  bottom: 9%;

  @media ${theme.device.mobileM} {
    bottom: 7%;
  }
  @media ${theme.device.mobileS} {
    bottom: -3%;
  }
  @media ${theme.device.mobileF} {
    bottom: 3%;    
  }

`;

const MFace = styled.div`
  position: relative;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-left: 46%;
  
  @media ${theme.device.mobileS} {
    padding-left: 40%;
  }
  @media only screen and (max-height: 800px) {
    padding-left: 54%;
  } 
`;

const TextBaloon = styled.div`
  position: absolute;
  left: 5%;
  top: -5%;
  width: 53%;
  cursor: default;

  @media ${theme.device.mobileS} {
    left: 3%;
    top: 0%;
  }
  @media ${theme.device.mobileF} {
    left: 3%;
    top: -10%;
    width: 58%;
  }

  & > svg {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  & > div {
    font-family: 'Pretendard';  
    position: absolute;
    left: 0;
    top: 0;
    padding: 2% 5% 4% 3%;
    width: 100%;
    height: 100%;
    font-size: 15px;
    line-height: 20px;
    color: #5F5F5F;
    letter-spacing: -0.583379px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${theme.device.mobileM} {
      font-size: 15px;
      line-height: 15px;
      padding: 3% 6% 3% 4%;
    }
    @media ${theme.device.mobileS} {
      font-size: 13px;
      line-height: 13px;
      padding: 3% 5% 3% 3%;
    }
    @media ${theme.device.mobileF} {
      font-size: 12px;
      line-height: 13px;
      padding: 3% 5% 3% 3%;
    }
  }
`;

export default MainBody;