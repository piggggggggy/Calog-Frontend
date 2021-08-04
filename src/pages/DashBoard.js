import React from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//임포트
import DashBoard_Chart from '../components/DashBoard_Chart';
import DashBoard_Workout from '../components/DashBoard_Workout';
import DashBoard_BodySpec from '../components/DashBoard_BodySpec';
import DashBoard_Food from '../components/DashBoard_Food';
//데이터
import {useSelector} from 'react-redux';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 로그인한 유저가 가장 처음 만나는 대시보드 페이지
 * @필수값 : 닉네임, 기초대사량, 바디스펙(신장, 체중)
 * @담당자 : 김나영
*/

const DashBoard = (props) => {
// dispatch
  const user = useSelector((state) => state.user.user_info)
// useEffect

  return (
    <React.Fragment>
      <Grid margin="0 0 13% 0" m_margin="0 0 11% 0">
        {/* 배경 */}
        <TopBack />
        {/* 멘트 */}
        <Top>
          <Line>
            <Text size="22px" bold m_size="20px">{user.nickname}님!</Text>
            <Text size="22px" bold m_size="20px">453kcal<br/>더 먹을 수 있어요!</Text>
            <Grid margin="2% 0 0 0">
              <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 현재까지 600kcal 먹었어요.</Text>
            </Grid>
          </Line>
        </Top>
        {/* 바디스펙 */}
        <DashBoard_BodySpec />
        {/* 칼로리 분석 */}
        <DashBoard_Chart />
        {/* 칼로리 리스트 */}
        <DashBoard_Food />
        {/* 운동 추천 */}
        <Grid margin="13.5% 0 0 7.8%" m_margin="10.5% 0 0 7.8%">
          <Text size="20px" bold m_size="17px">{user.nickname}을 위한 운동리스트</Text>
          <Grid margin="7.8% 0 0 0" m_margin="4.8% 0 0 0">
            {/* 운동 리스트 맵돌리기 */}
            <DashBoard_Workout />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const TopBack = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 26.6vh;
`;

const Top = styled.div`
  padding: 12.3% 0 0 7.7%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${theme.device.mobileM} {
    padding: 10% 0 0 7.7%;
  }
`;

const Line = styled.div`
  line-height: 27px;

  @media ${theme.device.mobileM} {
    line-height: 20px;
  }
`;

export default DashBoard;