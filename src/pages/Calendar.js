import React from 'react';
//컴포넌트
import BtnHeader from '../shared/BtnHeader';
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
      <BtnHeader title="캘린더" display="none"/>
      {/* 캘린더 */}
      <Calendar_Calendar />
    </React.Fragment>
  );
}

Calendar.defaultProps = {

}

export default Calendar;