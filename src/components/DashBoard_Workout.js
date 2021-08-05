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
      <Grid bg={'white'} width="32.5%" height="168px" border_radius="28px">
        {/* 이미지 */}
        <Grid padding="19% 0 0 0" width="52%" margin="0 auto" m_margin="0 auto">
          <Image src={yoga} height="66px"/>
        </Grid>
        <Grid margin="14.5% 14% 0 14%" width="auto" m_margin="14.5% 14% 0 14%">
          <Text size="13px" m_size="11px">요가 30분</Text>
          <Text margin="4.5% 0 0 0" color={'#6993FF'} size="17px" bold m_size="15px">-89kcal</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

DashBoard_Workout.defaultProps = {

}

export default DashBoard_Workout;