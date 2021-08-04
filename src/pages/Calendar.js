import React from 'react';
import {Grid, Text} from '../elements';
//컴포넌트
import Calendar_Calendar from '../components/Calendar_Calendar';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 유저의 기초대사량을 토대로 한 달 식습관을 확인할 수 있는 페이지
 * @담당자 : 김나영
*/

const Calendar = (props) => {

  return (
    <React.Fragment>
      {/* 헤더 */}
      <Grid padding="13.5% 0 0 5.8%">
        <Text size="28px" bold m_size='22px'>캘린더</Text>
      </Grid>
      {/* 캘린더 */}
      <Calendar_Calendar />
    </React.Fragment>
  );
}

export default Calendar;