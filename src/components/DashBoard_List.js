import React from 'react';
import {Grid, Image} from '../elements';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : DashBoard_Workout에서 맵을 돌리기 위한 운동 리스트
 * @필수값 : 운동 리스트
 * @담당자 : 김나영
*/

const DashBoard_List = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <Grid bg={'#eee'} width="40%" height="130px" margin="3% 0%">
        <Image />
      </Grid>
    </React.Fragment>
  );
}

DashBoard_List.defaultProps = {

}

export default DashBoard_List;