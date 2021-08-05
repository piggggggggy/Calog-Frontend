import React from 'react';
import {Button, Grid, Image, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//history
import {history} from '../redux/configStore';
//컴포넌트
import Record_Date from'../components/Record_Date';
import CalendarDetail_Info from '../components/CalendarDetail_Info';
import Record_When from '../components/Record_When';
import CalendarDetail_Food from '../components/CalendarDetail_Food';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 김나영
*/

const CalenderDetail = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <Grid>
        {/* 배경 */}
        <TopBack />
        {/* 헤더 */}
        <Grid is_flex padding="2.9vh 6.2%">
          {/* 뒤로가기 버튼 */}
          <Grid width="3vh" _onClick={() => history.goBack()}>  
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7695 18.23L9.99953 20L-0.000469208 10L9.99953 0L11.7695 1.77L3.53953 10L11.7695 18.23Z" fill="#757575"/>
            </svg>
          </Grid>
        </Grid>
        {/* 캘린더 */}
        <Record_Date />
        {/* 안내 메시지 */}
        <CalendarDetail_Info />
        {/* 기록 시기 */}
        <Grid margin="9.7% 0 0 2%" m_margin="9.7% 0 0 2%">
          <Record_When />
        </Grid>

        {/* 식단title */}
        <Grid margin="10% 9.7% 0 9.7%" width="13.5%" m_margin="10% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>식단</Text>
          </Button>
        </Grid>
        {/* 맵돌리기 */}
        <Grid width="80.9%" margin="4% auto 0 auto" m_margin="4% auto 0 auto">
          <CalendarDetail_Food />
        </Grid>

        {/* 사진title */}
        <Grid margin="6.3% 9.7% 0 9.7%" width="13.5%" m_margin="6.3% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>사진</Text>
          </Button>
        </Grid>
        {/* 이미지 */}
        <Grid margin="4% 9.7% 0 9.7%" bg={'#eee'} width="81%" height="221px" border_radius="8px" m_margin="4% 9.7% 0 9.7%">
          <Image height="221px" />
        </Grid>

        {/* 메모title */}
        <Grid margin="6.3% 9.7% 0 9.7%" width="13.5%" m_margin="6.3% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>메모</Text>
          </Button>
        </Grid>
        {/* 메모 */}
        <Grid margin="4% 9.7% 27% 9.7%" width="81%" m_margin="4% 9.7% 27% 9.7%">
          <Text>memo</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

CalenderDetail.defaultProps = {

}

const TopBack = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 30vh;
`;

export default CalenderDetail;