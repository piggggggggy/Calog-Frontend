import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
import {DashBoard, Login, Signup, Main} from '../pages'
//캘린더 임시
import Calendar from '../components/Calendar';


const App = (props) => {
  return (
    <React.Fragment>
      <GlobalStyles/>
      <Wrap>
      <Route path="/" exact componet={Main} />
      <Route path="/dashboard" exact component={DashBoard}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/signup" exact component={Signup}/>
      {/* calendar 테스트 라우팅 나중에 지울게요! */}
      <Route path="/calendar" exact component={Calendar}/>
      </Wrap>
    </React.Fragment>
  );
}
const Wrap = styled.div`

`;
export default App;

