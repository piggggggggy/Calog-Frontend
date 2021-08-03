import React from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//날짜
import moment from 'moment';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 김나영
*/

const Calendar_Calendar = (props) => {
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
                <td key={idx} style={{color:'blue', padding:'2%'}}>
                  <span>{days.format('D')}</span>
                </td>
              )
              //이번 달에 해당되는 날짜가 아닌 지난 달 또는 다음 달 날짜인 경우
            } else if (days.format('MM') !== month.format('MM')) {
              return (
                <td key={idx} style={{color:'gray', padding:'2%'}}>
                  <span>{days.format('D')}</span>
                </td>
              )
              //그 외 날짜
            } else {
              return(
                <td key={idx} style={{padding:'2%'}}>
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
      <Grid padding="8.5% 4.8% 0 4.8%">
      {/* 헤더 */}
        <Header>
        {/* < icon */}
          <svg onClick={lastMonthBtn}
            width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.288001 7.37245L7.296 0.291018C7.704 -0.0970059 8.328 -0.0970059 8.712 0.291018C9.096 0.679042 9.096 1.30958 8.712 1.72186L2.4 8.1L8.712 14.4781C9.096 14.8662 9.096 15.521 8.712 15.909C8.328 16.297 7.704 16.297 7.296 15.909L0.288001 8.80329C-0.095999 8.41527 -0.095999 7.78473 0.288001 7.37245Z" fill="#8C8C8C"/>
          </svg>
          {/* 년-월 */}
          <Grid width="auto">
            <Text size="17px" bold color={theme.color.gray_7}> {month.format('YYYY년 MM일')} </Text>
          </Grid>
          {/* > icon */}
          <svg onClick={nextMonthBtn}
            width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.712 9.62755L1.704 16.709C1.296 17.097 0.672 17.097 0.288 16.709C-0.096 16.321 -0.096 15.6904 0.288 15.2781L6.6 8.9L0.288 2.52186C-0.096 2.13383 -0.096 1.47904 0.288 1.09102C0.672 0.702995 1.296 0.702995 1.704 1.09102L8.712 8.19671C9.096 8.58473 9.096 9.21527 8.712 9.62755Z" fill="#8C8C8C"/>
          </svg>
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
  width: 97.5%;
  display: flex;
  justify-content: space-between;
  margin: 0% auto;
  height: 50px;
  align-items: center;
  line-height: 53px;
`;

const Table = styled.table`
  background-color: #eee;
  margin: 5% auto 0% auto;
  width: 100%;
  height: 70vh;
`;

export default Calendar_Calendar;