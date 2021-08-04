import React from 'react';
import {Grid, Text, Image} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//이미지
import yoga from '../img/yoga 1.png';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 대시보드에서 유저에게 운동리스트 맵 컴포넌트
 * @필수값 : 운동 리스트
 * @담당자 : 김나영
*/

const DashBoard_Workout = (props) => {

  return (
    <React.Fragment>
      <Grid bg={'#FFFCF1'} width="42%" height="168px" border_radius="28px">
        {/* 이미지 */}
        <Grid padding="11.5% 0 0 0" width="40%" margin="0 auto 0 auto">
          <Image src={yoga} height="70px"/>
        </Grid>
        <Grid margin="11% 14% 0 14%" width="auto">
          <Text size="13px">요가 30분</Text>
          <Text margin="4% 0 0 0" color={'#088448'} size="17px" bold>-89kcal</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

DashBoard_Workout.defaultProps = {

}

export default DashBoard_Workout;