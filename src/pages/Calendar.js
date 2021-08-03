import React from 'react';
import {Grid, Text} from '../elements';
//컴포넌트
import Calendar_Calendar from '../components/Calendar_Calendar';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Calendar = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      {/* 헤더 */}
      <Grid padding="13.5% 0 0 5.8%">
        <Text size="28px" bold>캘린더</Text>
      </Grid>
      {/* 캘린더 */}
      <Calendar_Calendar />
    </React.Fragment>
  );
}

Calendar.defaultProps = {

}

export default Calendar;