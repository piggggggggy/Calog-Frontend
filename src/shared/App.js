import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
//로그인 임시
import Login from '../pages/Login';
//캘린더 임시
import Calendar from '../components/Calendar';

const App = (props) => {
  return (
    <React.Fragment>
      <GlobalStyles/>
      <Wrap>
      {/* 로그인 임시 */}
      <Route path="/login" exact component={Login}/>
      {/* calendar 테스트 라우팅 나중에 지울게요! */}
      <Route path="/calendar" exact component={Calendar}/>
      </Wrap>
    </React.Fragment>
  );
}
const Wrap = styled.div`

`;
export default App;

