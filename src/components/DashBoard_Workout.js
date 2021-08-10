import React from 'react';
import {Grid, Text, Image} from '../elements';

//이미지
import yoga from '../img/yoga 1.png';

/** 
 * @역할 : 대시보드에서 유저에게 운동리스트를 추천해주는 맵 컴포넌트
 * @필수값 : 운동 리스트
 * @담당자 : 김나영
*/

//TODO 데이터 들어오면 다시 정리 및 기능 붙이기
const DashBoard_Workout = (props) => {

  return (
    <React.Fragment>
      <Grid bg={'white'} width="32.5%" height="168px" border_radius="28px">
        
        {/* 이미지 */}
        <Grid padding="19% 0 0 0" width="52%" margin="0 auto" m_margin="0 auto">
          <Image src={yoga} height="66px"/>
        </Grid>
        <Grid margin="14.5% 14% 0 14%" width="auto" m_margin="14.5% 14% 0 14%">

          {/* 시간 */}
          <Text size="13px" m_size="11px">요가 30분</Text>

          {/* 소비 칼로리 */}
          <Text margin="4.5% 0 0 0" color={'#6993FF'} size="17px" bold m_size="15px">-89kcal</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DashBoard_Workout;