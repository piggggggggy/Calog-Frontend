import React from 'react';
import {Grid, Text} from '../elements';
// 리스트 맵
import DashBoard_List from './DashBoard_List';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 대시보드에서 유저에게 운동리스트를 보여주는 컴포넌트
 * @필수값 : 닉네임, 운동 리스트
 * @담당자 : 김나영
*/

const DashBoard_Workout = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <Grid padding="0% 6%">
        <Text size="20px" bold>땡땡님을 위한 운동리스트</Text>
        {/* 리스트 맵돌리기 */}
        <DashBoard_List />
      </Grid>
    </React.Fragment>
  );
}

DashBoard_Workout.defaultProps = {

}

export default DashBoard_Workout;