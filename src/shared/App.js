import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
import {DashBoard, Calendar, Record, Login, Signup, Main, FoodDetail, Cart, SignSocial} from '../pages'
import Nav from './Nav';
//테마
import theme from './theme';

const App = (props) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Wrap>
          <Route path="/" exact component={Main} />
          <Route path="/fooddetail" exact component={FoodDetail} />
          <Route path="/cart" exact component={Cart} />

          <Route path="/dashboard" exact component={DashBoard}/>
          <Route path="/calendar" exact component={Calendar}/>
          <Route path="/record" exact component={Record}/>

          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/signsocial" exact component={SignSocial}/>
          
          <Nav />
        </Wrap>
      </ThemeProvider>
    </React.Fragment>
  );
}
const Wrap = styled.div`
  max-width: 420px;
  min-width: 420px;
  margin: 0 auto 80px auto;
  overflow: auto;
`;
export default App;

