import React from 'react';
import {Grid} from '../elements';
import styled from 'styled-components';
//이모지
import { BiSearchAlt, BiBarChart, BiCalendarCheck, BiUser } from "react-icons/bi";



const Nav = (props) => {
  return (
    <React.Fragment>
      <Wrap navbar-fixed-bottom>
        {/* 칼로리 사전 */}
          <Grid width="auto" margin="auto 0">
            <BiSearchAlt size="40px"/>
          </Grid>
        {/* 대시보드 */}
          <Grid width="auto" margin="auto 0">
            <BiBarChart size="40px"/>
          </Grid>
        {/* 캘린더 */}
          <Grid width="auto" margin="auto 0">
            <BiCalendarCheck size="40px"/>
          </Grid>
        {/* 마이페이지 */}
          <Grid width="auto" margin="auto 0">
            <BiUser size="40px" />
          </Grid>
      </Wrap>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #eee;
  width: 100%;
  max-width: 420px;
  height: 60px;
  position: fixed;
  bottom: 0;
`;

export default Nav;