import React from 'react';
import styled from 'styled-components';
import {Grid, Text, Image} from '../elements';

//이미지
import yoga from '../img/yoga 1.png';

/** 
 * @역할 : 대시보드에서 유저에게 운동리스트를 추천해주는 맵 컴포넌트
 * @필수값 : 운동 리스트
 * @담당자 : 김나영
*/

const DashBoard_Workout = (props) => {

  const {name, kcal, url} = props

  return (
    <React.Fragment>
      <Wrap>
        
        {/* 이미지 */}
        <Grid padding="19% 0 0 0" width="127px" margin="0 auto" m_margin="0 auto">
          <Image src={url} height="66px"/>
        </Grid>
        <Grid margin="14.5% 14% 0 14%" width="auto" m_margin="14.5% 14% 0 14%">

          {/* 시간 */}
          <Text size="13px" m_size="11px">{name} 30분</Text>

          {/* 소비 칼로리 */}
          <Text margin="4.5% 0 0 0" color={'#6993FF'} size="17px" bold m_size="15px">{kcal}kcal</Text>
        </Grid>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  background-color: white;
  width: 127px;
  height: 168px;
  border-radius: 28px;
  margin: 0 0 0 4.3%;
`;

export default DashBoard_Workout;