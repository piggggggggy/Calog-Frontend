import React, { useCallback, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import GlobalStyles from './GlobalStyles';
// 로그인 상태 전역 유지
import { useDispatch } from 'react-redux';
import { LoginCheck } from '../redux/modules/user';
//라우팅
import { Route } from "react-router-dom";
import {DashBoard, Calendar, Record, Login, Signup, Main, FoodDetail, Cart, SignSocial, BodySpec, Notice, NotiDetail, NoticeWrite, Alarm, MainSearch, CalendarDetail} from '../pages'
import Nav from './Nav';
//테마
import theme from './theme';
//lazy loading
import LazyLoad from 'react-lazyload';
// modules
import { delCartAll } from '../redux/modules/cart';
import { delRecentAll } from '../redux/modules/recent';

const App = (props) => {
  // dispatch
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
      <LazyLoad>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
            <Wrap>
              <Route path="/" exact component={Main} />
              <Route path="/search" exact component={MainSearch} />
              <Route path="/fooddetail/:foodId" exact component={FoodDetail} />
              <Route path="/cart" exact component={Cart} />

              <Route path="/dashboard" exact component={DashBoard}/>
              <Route path="/calendar" exact component={Calendar}/>
              <Route path="/calendar/:date" exact component={CalendarDetail}/>
              <Route path="/record" exact component={Record}/>

              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/signsocial" exact component={SignSocial}/>
              <Route path="/body" exact component={BodySpec}/>
              <Route path="/notice" exact component={Notice}/>
              <Route path="/notice/:postid" exact component={NotiDetail}/>
              <Route path="/notiwrite" exact component={NoticeWrite}/>
              <Route path="/notiwrite/:postid" exact component={NoticeWrite}/>
              <Route path="/alam" exact component={Alarm}/>

              <Nav />
            </Wrap>
        </ThemeProvider>
      </LazyLoad>
    </React.Fragment>
  );
}
const Wrap = styled.div`
  max-width: 420px;
  min-width: 280px;
  margin: 0 auto 9% auto;
  overflow-y: auto;
`;
export default App;

