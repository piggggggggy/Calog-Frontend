import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
import {DashBoard, Calendar, Record, Login, Signup, Main, FoodDetail, Cart, SignSocial, BodySpect, Notice, NotiDetail, NoticeWrite, Alam} from '../pages'
import Nav from './Nav';
//테마
import theme from './theme';
//lazy loading
import LazyLoad from 'react-lazyload';

const App = (props) => {
  return (
    <React.Fragment>
      <LazyLoad>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
            <Wrap>
              <Route path="/" exact component={Main} />
              <Route path="/fooddetail/:foodId" exact component={FoodDetail} />
              <Route path="/cart" exact component={Cart} />

              <Route path="/dashboard" exact component={DashBoard}/>
              <Route path="/calendar" exact component={Calendar}/>
              <Route path="/record" exact component={Record}/>

              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/signsocial" exact component={SignSocial}/>
              <Route path="/body" exact component={BodySpect}/>
              <Route path="/notice" exact component={Notice}/>
              <Route path="/notice/:id" exact component={NotiDetail}/>
              <Route path="/notiwrite" exact component={NoticeWrite}/>
              <Route path="/alam" exact component={Alam}/>

              <Nav />
            </Wrap>
        </ThemeProvider>
      </LazyLoad>
    </React.Fragment>
  );
}
const Wrap = styled.div`
  max-width: 420px;
  min-width: 320px;
  margin: 0 auto 9% auto;
  overflow-y: auto;
`;
export default App;

