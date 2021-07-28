import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
import Example from '../pages/Example';
const App = (props) => {
  return (
    <React.Fragment>
      <GlobalStyles/>
      <Route exact path="/login" component={Example}/>
    </React.Fragment>
  );
}


export default App;
