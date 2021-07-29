import React from 'react';
import {Grid, Text} from '../elements';
//컴포넌트
import BtnHeader from '../shared/BtnHeader';
import Calendar_Calendar from '../components/Calendar_Calendar';
//이모지
import { BiChevronLeft } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

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
      <Grid is_flex padding="5% 6%">
        <Grid width="7%">
          <BiChevronLeft size="40px"/>
        </Grid>
        <Text width="auto">캘린더</Text>
        <Grid width="10%">
          <FiShoppingCart size="30px"/>
        </Grid>
      </Grid>
      <Calendar_Calendar />
    </React.Fragment>
  );
}

Calendar.defaultProps = {

}

export default Calendar;