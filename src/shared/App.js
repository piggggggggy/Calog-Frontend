import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
//캘린더 임시
import Calendar from '../components/Calendar';

const App = (props) => {
  return (
    <React.Fragment>
      <GlobalStyles/>
      {/* calendar 테스트 라우팅 나중에 지울게요! */}
      <Route path="/calendar" exact component={Calendar}/>
    </React.Fragment>
  );
}


export default App;
