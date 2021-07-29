import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
import {DashBoard, Login, Signup, Main, Calendar, FoodDetail, Cart} from '../pages'
import Nav from './Nav';
//테마
import theme from './theme';

const App = (props) => {
  return (
    <React.Fragment>
<<<<<<< Updated upstream
      <GlobalStyles />
      <Wrap>
        <Route path="/" exact component={Main} />
        <Route path="/fooddetail" exact component={FoodDetail} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/dashboard" exact component={DashBoard}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/calendar" exact component={Calendar}/>
        <Nav />
      </Wrap>
=======
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Wrap>
          <Route path="/" exact component={Main} />
          <Route path="/fooddetail" exact component={FoodDetail} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/dashboard" exact component={DashBoard}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/calendar" exact component={Calendar}/>
          <Nav />
        </Wrap>
      </ThemeProvider>
>>>>>>> Stashed changes
    </React.Fragment>
  );
}
const Wrap = styled.div`
  max-width: 420px;
  margin: auto;
`;
export default App;

