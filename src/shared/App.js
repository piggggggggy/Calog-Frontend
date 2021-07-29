import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
import {DashBoard} from '../pages'
//로그인 임시
import Example from '../pages/Example';
//캘린더 임시
import Calendar from '../components/Calendar';

const App = (props) => {
  return (
    <React.Fragment>
      <GlobalStyles/>
      <Wrap>
      <Route path="/dashboard" exact component={DashBoard}/>
      {/* 로그인 임시 */}
      <Route path="/login" exact component={Example}/>
      {/* calendar 테스트 라우팅 나중에 지울게요! */}
      <Route path="/calendar" exact component={Calendar}/>
      </Wrap>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  max-width: 420px;
  height: 896px;
`;


export default App;
