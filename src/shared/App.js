import React, { useCallback, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import GlobalStyles from './GlobalStyles';

// 로그인 상태 전역 유지
import { useDispatch } from 'react-redux';
import { LoginCheck } from '../redux/modules/user';

// 라우팅
import { Route } from "react-router-dom";
import {DashBoard, Calendar, Record, Login, Signup, AddSpec, Main, FoodDetail, Cart, SignSocial, BodySpec, Notice, NotiDetail, NoticeWrite, Alarm, MainSearch, CalendarDetail, Loading, Loading2, Loading3} from '../pages'
import Naver from '../components/social/Naver';
import Google from '../components/social/Google';
import Kakao from '../components/social/Kakao';
import Nav from './Nav';

// 테마
import theme from './theme';

// modules
import { delCartAll } from '../redux/modules/cart';
import { delRecentAll } from '../redux/modules/recent';

// 웹페이지 바탕
import {Image} from '../elements';
import webImg from '../img/web.png';

//lazy loading
import LazyLoad from 'react-lazyload';

const App = (props) => {
  const dispatch = useDispatch();

  // login check
  useEffect(() => {
    dispatch(LoginCheck());
  }, []);

  // 윈도우 종료 이벤트 (local 날리기)
  const deletePersist = () => {
    dispatch(delCartAll());
    dispatch(delRecentAll());
  };

  const deletePersisitCB = useCallback(() => {
    deletePersist();
  }, [])
  // window.addEventListener('beforeunload', ()=>{window.alert("종료")});
  useEffect(() => {
    window.onbeforeunload = () => {window.alert('종료')};
  }, [])
  
  return (
    <React.Fragment>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <LazyLoad>
            {/* 1024px(아이패드 이상) 일 때 웹 버전 */}
            <WebVer>
              <Image src={webImg} width="100vw" height="100vh" b_size="100% 100%"/>
            </WebVer>
              <Wrap>
              <Route path="/" exact component={Main} />
              <Route path="/search" exact component={MainSearch} />
              <Route path="/fooddetail/:foodId" exact component={FoodDetail} />
              <Route path="/cart" exact component={Cart} />
              {/* <Route path="/loading" exact component={Loading} /> */}
              <Route path="/loading/" exact component={Loading2} />
              <Route path="/loading/:url" exact component={Loading2} />
              <Route path="/loading/:url/:date" exact component={Loading2} />
              {/* <Route path="/loading3" exact component={Loading3} /> */}

              <Route path="/dashboard" exact component={DashBoard}/>
              <Route path="/calendar" exact component={Calendar}/>
              <Route path="/calendar/:date" exact component={CalendarDetail}/>
              <Route path="/record" exact component={Record}/>

              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/signsocial" exact component={SignSocial}/>
              <Route path="/body" exact component={BodySpec}/>
              <Route path="/addspec" exact component={AddSpec}/>
              <Route path="/notice" exact component={Notice}/>
              <Route path="/notice/:postid" exact component={NotiDetail}/>
              <Route path="/notiwrite" exact component={NoticeWrite}/>
              <Route path="/notiwrite/:postid" exact component={NoticeWrite}/>
              <Route path="/alam" exact component={Alarm}/>
              <Route path="/naver" exact component={Naver}/>
              <Route path="/google" exact component={Google}/>
              <Route path="/kakao" exact component={Kakao}/>

              <Nav />
            </Wrap>
          </LazyLoad>
        </ThemeProvider>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 280px;
  height: 91vh;
  margin: 0 auto;
  overflow-y: auto;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }
  
  //노트북 이상 웹페이지
  @media only screen and (min-width: 1024px) {
    margin: 0 30% 0 50%;
    border: 1px solid #E4E4E4;
  }
`;

const WebVer = styled.div`
  display: none;

  @media only screen and (min-width: 1024px) {
    display: block;
    position: absolute;
    z-index: -100;
  }
`;

export default App;

