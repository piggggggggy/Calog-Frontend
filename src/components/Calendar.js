import React from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
//아이콘
import { BiChevronLeft } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';
//날짜
import moment from 'moment';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 김나영
*/

const Calendar = (props) => {
// dispatch
// props
// useEffect
//날짜
const [month, setMonth] = React.useState(moment())
//지난달 btn
const lastMonthBtn = () => {
  setMonth(month.clone().subtract(1, 'month'))
}
//다음달 btn
const nextMonthBtn = () => {
  setMonth(month.clone().add(1, 'month'))
}
//첫째주
const firstWeek = month.clone().startOf('month').week();
//마지막주
const lastWeek = month.clone().endOf('month').week() === 1 ? 53 : month.clone().endOf('month').week()
//날짜 그리기
const calendarArr = () => {
  let result = [];
  let week = firstWeek;
  for (week; week <= lastWeek; week++) {
    result = result.concat(
      <tr key={week}>
        {
          Array(7).fill(0).map((d, idx) => {
            let days = month.clone().startOf('year').week(week).startOf('week').add(idx, 'day');
            //오늘 날짜일 경우
            if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
              return(
                <td key={idx} style={{color:'blue'}}>
                  <td>{days.format('D')}</td>
                </td>
              )
              //이번 달에 해당되는 날짜가 아닌 지난 달 또는 다음 달 날짜인 경우
            } else if (days.format('MM') !== month.format('MM')) {
              return (
                <td key={idx} style={{color:'gray'}}>
                  <span>{days.format('D')}</span>
                </td>
              )
              //그 외 날짜
            } else {
              return(
                <td key={idx}>
                  <span>{days.format('D')}</span>
                </td>
              )
            }
          })
        }
      </tr>
    )
  }
  return result;
}


  return (
    <React.Fragment>
      <Grid>
      {/* 헤더 */}
        <Header>
        {/* < icon */}
          <BiChevronLeft size="35px" onClick={lastMonthBtn}/>
          {/* 년-월 */}
          <Grid width="auto">
            <Text size="1.2em"> {month.format('YYYY - MM')} </Text>
          </Grid>
          {/* > icon */}
          <BiChevronRight size="35px" onClick={nextMonthBtn}/>
        </Header>
      {/* 바디 */}
      <Table>
        <tbody>
          {calendarArr()}
        </tbody>
      </Table>
      </Grid>
    </React.Fragment>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0% auto;
  height: 50px;
  align-items: center;
  line-height: 53px;
`;

const Table = styled.table`
  margin: 5% auto 0% auto;
  width: 95vw;
  height: 80vh;
`;

export default Calendar;