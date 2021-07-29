import React from 'react';
import {Grid, Text} from '../elements';
//임포트
import LogoHeader from '../shared/LogoHeader';
import DashBoard_Chart from '../components/DashBoard_Chart';
import DashBoard_Workout from '../components/DashBoard_Workout';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 로그인한 유저가 가장 처음 만나는 대시보드 페이지
 * @필수값 : 닉네임, 기초대사량, 바디스펙(신장, 체중)
 * @담당자 : 김나영
*/

const DashBoard = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      {/* 헤더 */}
      <LogoHeader />
      {/* 멘트, 바디스펙 */}
      <Grid is_flex padding="0% 6%">
        {/* 멘트 */}
        <Grid line_height="27px">
          <Text size="20px" bold>땡땡님!</Text>
          <Text size="20px" bold>오늘은 300kcal<br/>초과했어요!</Text>
        </Grid>
        {/* 바디스펙 */}
        <Grid line_height="20px" width="60%">
          <Text size="14px">신장 </Text>
          <Text size="14px">체중 </Text>
          <Text size="14px">기초대사량 </Text>
        </Grid>
      </Grid>
      {/* 칼로리 분석 */}
      <DashBoard_Chart />
      {/* 추천 운동 리스트 */}
      <DashBoard_Workout />
    </React.Fragment>
  );
}

DashBoard.defaultProps = {

}

export default DashBoard;