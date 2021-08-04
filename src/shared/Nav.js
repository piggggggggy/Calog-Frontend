import React from 'react';
import {Grid} from '../elements';
import styled from 'styled-components';
//이모지
import { BiSearchAlt, BiBarChart, BiCalendarCheck, BiUser } from "react-icons/bi";
//history
import {history} from '../redux/configStore';

const Nav = (props) => {
  return (
    <React.Fragment>
      <Wrap>
        {/* 칼로리 사전 */}
          <Grid width="auto" margin="auto 0" _onClick={() => history.push('/')}>
            <BiSearchAlt size="40px"/>
          </Grid>
        {/* 대시보드 */}
          <Grid width="auto" margin="auto 0" _onClick={() => history.push('/dashboard')}>
            <BiBarChart size="40px"/>
          </Grid>
        {/* 캘린더 */}
          <Grid width="auto" margin="auto 0" _onClick={() => history.push('/calendar')}>
            <BiCalendarCheck size="40px"/>
          </Grid>
        {/* 마이페이지 */}
          <Grid width="auto" margin="auto 0" _onClick={() => history.push('/body')}>
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
  height: 9%;
  position: fixed;
  bottom: 0;
  z-index: 30;
`;

export default Nav;