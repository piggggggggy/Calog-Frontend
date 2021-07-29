import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
<<<<<<< Updated upstream
import {DashBoard} from '../pages'
//로그인 및 회원가입
import Login from '../pages/Login';
import Signup from '../pages/Signup';
//캘린더 임시
import Calendar from '../components/Calendar';
=======
import {DashBoard, Login, Signup, Main, Calendar} from '../pages'
>>>>>>> Stashed changes

const App = (props) => {
  return (
    <React.Fragment>
      <GlobalStyles/>
      <Wrap>
      <Route path="/dashboard" exact component={DashBoard}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/calendar" exact component={Calendar}/>
      </Wrap>
    </React.Fragment>
  );
}
const Wrap = styled.div`

`;
export default App;

