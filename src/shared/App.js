import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
//라우팅
import { Route } from "react-router-dom";
import {DashBoard, Login, Signup, Main, Calendar} from '../pages'
import Nav from './Nav';


const App = (props) => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Wrap>
<<<<<<< Updated upstream
      <Route path="/" exact component={Main} />
      <Route path="/dashboard" exact component={DashBoard}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/calendar" exact component={Calendar}/>
      <Nav />
=======
        <Route path="/" exact component={Main} />
        <Route path="/fooddetail" exact component={FoodDetail} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/dashboard" exact component={DashBoard}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/calendar" exact component={Calendar}/>
        <Nav />
>>>>>>> Stashed changes
      </Wrap>
    </React.Fragment>
  );
}
const Wrap = styled.div`
  max-width: 420px;
  margin: auto;
`;
export default App;

