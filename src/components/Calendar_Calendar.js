import React, {useEffect} from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//날짜
import moment from 'moment';
//컴포넌트
import Calendar_Emoji from './Calendar_Emoji';
//db
import {useDispatch} from 'react-redux'
import {getAllRecordDB} from '../redux/modules/record';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 캘린더 바디 컴포넌트
 * @담당자 : 김나영
*/

const Calendar_Calendar = (props) => {
  const dispatch = useDispatch()

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

  //YYYY-MM 넣어 요청 보내기
  const monthFormat = moment(month._d).format('YYYY-MM')
  useEffect(() => {
    dispatch(getAllRecordDB(monthFormat))
  },[])

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
                  <td key={idx} style={{padding:'0px'}}>
                    <Today>
                      <span>{days.format('D')}</span>
                    </Today>
                    <Calendar_Emoji key={d.date} day={days} {...d}/>
                  </td>
                )
                //이번 달에 해당되는 날짜가 아닌 지난 달 또는 다음 달 날짜인 경우
              } else if (days.format('MM') !== month.format('MM')) {
                return (
                  <td key={idx} style={{padding:'0px', color:"white"}}>
                      <span>{days.format('D')}</span>
                  </td>
                )
                //그 외 날짜
              } else {
                return(
                  <td key={idx} style={{padding:'0px'}}>
                    <NotToday>
                      <span>{days.format('D')}</span>
                    </NotToday>
                    <Calendar_Emoji key={d.date} day={days} {...d}/>
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
        <Grid padding="5% 2% 0 2%">
          {/* 헤더 */}
            <Header>
            {/* < icon */}
              <svg onClick={lastMonthBtn}
                width="3%" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path fillRule="evenodd" clipRule="evenodd" d="M0.288001 7.37245L7.296 0.291018C7.704 -0.0970059 8.328 -0.0970059 8.712 0.291018C9.096 0.679042 9.096 1.30958 8.712 1.72186L2.4 8.1L8.712 14.4781C9.096 14.8662 9.096 15.521 8.712 15.909C8.328 16.297 7.704 16.297 7.296 15.909L0.288001 8.80329C-0.095999 8.41527 -0.095999 7.78473 0.288001 7.37245Z" fill="#8C8C8C"/>
              </svg>
              {/* 년-월 */}
              <Grid width="auto">
                <Text size="17px" bold color={theme.color.gray_7}> {month.format('YYYY년 MM월')} </Text>
              </Grid>
              {/* > icon */}
              <svg onClick={nextMonthBtn}
                width="3%" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.712 9.62755L1.704 16.709C1.296 17.097 0.672 17.097 0.288 16.709C-0.096 16.321 -0.096 15.6904 0.288 15.2781L6.6 8.9L0.288 2.52186C-0.096 2.13383 -0.096 1.47904 0.288 1.09102C0.672 0.702995 1.296 0.702995 1.704 1.09102L8.712 8.19671C9.096 8.58473 9.096 9.21527 8.712 9.62755Z" fill="#8C8C8C"/>
              </svg>
            </Header>
          {/* 바디 */}
          <Grid is_flex margin="7.5% 0 0 0">
              <Text size="15px" color={theme.color.gray_5}>일</Text>
              <Text size="15px" color={theme.color.gray_5}>월</Text>
              <Text size="15px" color={theme.color.gray_5}>화</Text>
              <Text size="15px" color={theme.color.gray_5}>수</Text>
              <Text size="15px" color={theme.color.gray_5}>목</Text>
              <Text size="15px" color={theme.color.gray_5}>금</Text>
              <Text size="15px" color={theme.color.gray_5}>토</Text>
          </Grid>
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
  width: 88.5%;
  display: flex;
  justify-content: space-between;
  margin: 0% auto;
  align-items: center;
  line-height: 53px;
`;

const Table = styled.table`
  margin: 6% auto 0% auto;
  width: 100%;
  height: 55vh;
`;

const Today = styled.div`
  width: 24px;
  height: 24px;
  border-radius : 50%;
  background-color: ${theme.color.light};
  text-align: center;
  margin: auto;
  line-height: 25px;
`;

const NotToday = styled.div`
  width: 24px;
  height: 24px;
  text-align: center;
  margin: auto;
  line-height: 25px;
`;

export default Calendar_Calendar;