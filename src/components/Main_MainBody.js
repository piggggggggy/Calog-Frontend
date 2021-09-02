import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import theme from '../shared/theme';

// modules
import { searchKeywordDB, countKeywordDB } from '../redux/modules/search';
import { searchRecentDB, deleteRecentDB, addRecent, deleteRecent } from '../redux/modules/recent';
import { getUserAddFoodDB } from '../redux/modules/food';

// elements & components
import { Grid, Text, Image } from '../elements';
import FavoList from './Main_FavoList';
import MostUsedKey from './Main_MostUsedKey';
import RcmdList from './Main_RcmdList';
import Loading from '../pages/Loading4';
import MainNav from './Main_Nav';

// image
import makeFoodNone from '../img/makeFoodNone.png';
import fatFavorite from '../img/fatFavorite.png';

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

  // 커스텀 식단
  const customFood = useSelector((state) => state.custom.custom)

  // 유저 직접 추가 칼로리
  const userAddFood = useSelector((state) => state.food.addFood)
  // console.log(userAddFood)

  // nav
  const [navFocus, setFocus] = useState(0);

  // 직접 등록 네브 탭을 눌렀을 경우 기록 불러오기
  useEffect(() => {
    if(navFocus === 2 && is_login) {
      dispatch(getUserAddFoodDB())
    }
  }, [navFocus])

  return (
    <React.Fragment>
      <div style={{position: "relative", height: "90%", overflow: "hidden"}}>

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

              <RecentText style={{padding: "40px 6% 1vh 6%"}}>
                <Text lineheight="18px" bold size="13px" m_size="13px" color="#000000" padding="0" margin="0">최근검색어</Text>
              </RecentText>
              
              <Line/>
              
              {recent_list.length !== 0 ? recent_list.map((rec, idx) => {
                if (idx < 5) {
                  return (
                    <>
                      <RecentBox key={idx}>

                        <Grid cursor="pointer" _onClick={()=>{recentSearch(rec)}}>
                          <Text lineheight="18px" m_lineheight="15px" size="15px" m_size="13px" color="#404040" padding="0" margin="0" cursor="pointer">{rec}</Text>
                        </Grid>
                        
                        <div style={{width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                          <TiDeleteOutline onClick={()=>{recentDelete(rec)}} size="18px" color="#737373"/>
                        </div>
                        
                      </RecentBox>
                      
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

      {/* nav 탭 바 */}
        <Nav>
          <div>
            <div onClick={()=>{setFocus(0)}}><Text bold color={navFocus===0?"#535353":"#ADADAD"} size="14px" m_size="12px" cursor="pointer">즐겨찾기 목록</Text></div>
            <div onClick={()=>{setFocus(1)}}><Text bold color={navFocus===1?"#535353":"#ADADAD"} size="14px" m_size="12px" cursor="pointer">나의 식단</Text></div>
            <div onClick={()=>{setFocus(2)}}><Text bold color={navFocus===2?"#535353":"#ADADAD"} size="14px" m_size="12px" cursor="pointer">직접 등록</Text></div>
          </div>
          <NavLine>
            <NavLineBold style={navFocus === 0 ? {left: "0"} : navFocus === 1 ? {left: "33.3%"} : {left: "66.7%"}}/>
          </NavLine>
        </Nav>
        

       {/* 즐겨찾기가 들어가는 곳 */}
        {navFocus === 0 && (
          <React.Fragment>
            <BodyContainer>
              {is_login && favo_list.length !== 0 ? <FavoList favo_list={favo_list}/> : ''}
            </BodyContainer>
            {!is_login || favo_list.length === 0 ? 
            <Mascort_favoriteFood>
              <Image src={fatFavorite} width="120%" height="45vh"/>
            </Mascort_favoriteFood>
            : <></>}
          </React.Fragment>
        )}

        {/* 나의 식단  */}
        {navFocus === 1 && (
          <React.Fragment>
          <BodyContainer>
            {is_login && customFood.length !== 0 ? <MainNav />  : ''}
          </BodyContainer>
          {!is_login || customFood.length === 0 ? 
          <Mascort_makeFood>
            <Image src={makeFoodNone} width="100%" height="40vh"/>
          </Mascort_makeFood>
          : <></>}
        </React.Fragment>
        )}

        {/* 직접 등록 칼로리 */}
        {navFocus === 2 && (
          <BodyContainer>
            <FavoList title={"userAddKcal"}/>
          </BodyContainer>
        )}
      
      </div>
        
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

const MiddleTap = styled.div`
  margin-top: 4vh;
  width: 100%;
`;

const BodyContainer = styled.div`
  /* padding-top: 2vh; */
  max-width: 100%;
  max-height: 40vh;
  padding-bottom: 10vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-height: 720px) {
    max-height: 35vh;
  } 
  @media only screen and (max-height: 600px) {
    max-height: 30vh;
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

const RecentText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 3.2% 11% 3.2% 8%;

  @media only screen and (max-height: 850px) {
    padding: 2.5% 11% 2.5% 8%;
  }

  @media only screen and (max-height: 800px) {
    padding: 2% 11% 2% 8%;
  }

  @media only screen and (max-height: 70px) {
    padding: 1.2% 11% 1.2% 8%;
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

const Mascort_favoriteFood = styled.div`
  position: absolute;
  max-width: 420px;
  width: 120%;
  bottom: -10%;
  right: -10%;

  @media ${theme.device.mobileS} {
    bottom: -20%;
    right: -10%;
  }
  @media ${theme.device.mobileM} {
    bottom: -15%;
    right: -10%;
  }


`;


const Mascort_makeFood = styled.div`
  position: fixed;
  max-width: 420px;
  width: 100%;
  /* bottom: 9%; */

  @media ${theme.device.mobileS} {
    bottom: 0;
    /* height:vh; */
  }
  @media ${theme.device.mobileM} {
    bottom: 0;
  }
  /* @media ${theme.device.mobileS} {
    bottom: -3%;
  } */
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

const Nav = styled.div`
  margin: 3vh 0 2.6vh 8%;
  width: 70%;

  & > div {
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    margin-bottom: 0.6vh;

    & > div {
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;

      @media ${theme.device.mobileM} {
        font-size: 12px;
      }
      @media ${theme.device.mobileS} {
        font-size: 11px;
      }
      @media only screen and (max-width: 320px) {
        font-size: 9px;
      }
    }
  }
`;

const NavLine = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #ADADAD;
`;

const NavLineBold = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 33.3%;
  height: 2px;
  background-color: #535353;
  transition: 0.5s ease;
`;

export default MainBody;