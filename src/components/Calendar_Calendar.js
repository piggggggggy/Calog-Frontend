import React, {useEffect, useState} from 'react';
import {Grid, Text, Button} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// 날짜
import moment from 'moment';

// 컴포넌트
import Calendar_Emoji from './Calendar_Emoji';

// 데이터
import {useDispatch} from 'react-redux'
import {getAllRecordDB} from '../redux/modules/record';

// history
import {history} from '../redux/configStore';

/** 
 * @param {list} d
 * @returns {list} d 캘린더의 하루를 채울 수 있도록 맵이 돌아가는 요소
 * @역할  캘린더  컴포넌트
 * @담당자  김나영
*/

const Calendar_Calendar = (props) => {
  const dispatch = useDispatch();

  // 로그인 체크
  const {is_login} = props;

  // 날짜
  const [month, setMonth] = useState(moment());

  //axios 데이터 전송 시 YYYY-MM 넣어 요청 보내기
  const monthFormat = moment(month._d).format('YYYY-MM');

  // 화면 로딩 시 모든 기록 데이터 조회
  useEffect(() => {
    is_login && dispatch(getAllRecordDB(monthFormat))
  },[dispatch, monthFormat]);

  // 지난달 btn
  const lastMonthBtn = () => {
    setMonth(month.clone().subtract(1, 'month'))
  };

  // 다음달 btn
  const nextMonthBtn = () => {
    setMonth(month.clone().add(1, 'month'))
  };

  // 첫째주
  const firstWeek = month.clone().startOf('month').week();

  // 마지막주
  const lastWeek = month.clone().endOf('month').week() === 1 ? 53 : month.clone().endOf('month').week();

  // 날짜 그리기
  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {
            Array(7).fill(0).map((d, idx) => {
              let days = month.clone().startOf('year').week(week).startOf('week').add(idx, 'day');

              // 캘린더 상세 페이지 이동 버튼
              let date_format = days.format('YYYY-MM-DD');
              const detailBtn = () => {
                history.push(`/loading/calendar/${date_format}`)
              };

              // case1) 오늘 날짜일 경우
              if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                return(
                  <td key={idx} style={{padding:'0px'}} onClick={detailBtn}>
                    <Today>
                      <span>{days.format('D')}</span>
                    </Today>
                    <Calendar_Emoji key={d.date} day={days} {...d}/>
                  </td>
                )

                // case2) 이번 달에 해당되는 날짜가 아닌 지난 달 또는 다음 달 날짜인 경우
              } else if (days.format('MM') !== month.format('MM')) {
                return (
                  <td key={idx} style={{padding:'0px', color:"white"}}>
                      <span>{days.format('D')}</span>
                  </td>
                )

                // case3) 그 외 날짜
              } else {
                return(
                  <td key={idx} style={{padding:'0px'}} onClick={detailBtn}>
                    <NotToday>
                      <span>{days.format('D')}</span>
                    </NotToday>
                    <Calendar_Emoji key={d.date} day={days} {...d}/>
                  </td>
                )
              };
            })
          }
        </tr>
      )
    };
    return result;
  };

    return (
      <React.Fragment>

        {/* case1) 로그인 유저 */}
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

          {/* 캘린더 요일 */}
          <Grid is_flex margin="7.5% 0 0 0">
              <Text size="15px" color={theme.color.gray_5}>일</Text>
              <Text size="15px" color={theme.color.gray_5}>월</Text>
              <Text size="15px" color={theme.color.gray_5}>화</Text>
              <Text size="15px" color={theme.color.gray_5}>수</Text>
              <Text size="15px" color={theme.color.gray_5}>목</Text>
              <Text size="15px" color={theme.color.gray_5}>금</Text>
              <Text size="15px" color={theme.color.gray_5}>토</Text>
          </Grid>

          {/* 캘린더 바디 */}
          <Table>
            <tbody>
              {calendarArr()}
            </tbody>
          </Table>
        </Grid>

        {/* case2) 비로그인 유저 >> 로그인 이동하기 버튼 */}
        {!is_login && (
          <NeedLogin>
            <Grid width="100%" height="30vh" bg={'rgba(255, 232, 153, 1)'} border_radius="15px" margin="auto" m_margin="auto" padding="15% 0">
              <Modal>
                <Grid text_align="center">
                  <P>캘린더는<br/> 로그인이 필요한 기능이예요🧐</P>
                  <Text size="15px" color={theme.color.gray_5} bold margin="3% 0 7% 0" m_size="13px">한 달 동안의 내 식생활에 대해서 알아볼까요?</Text>
                </Grid>
                <Button
                  _onClick={() => history.push('/loading/signsocial')}
                  height="6vh" border_radius="60px" bg={theme.color.dark}>
                  <Text size="16px" bold m_size="14px">로그인하기</Text>
                </Button>
              </Modal>
            </Grid>
          </NeedLogin>
        )}
      </React.Fragment>
    );
};

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

const NeedLogin = styled.div`
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 320px;
`;

const Modal = styled.div`
  width: 94%;
  left: 10%;
  top: 10%;
  max-width: 420px;
  transform: translate(-0%, -8%);
  margin: auto;

  // iphone
  @media only screen and (min-height: 800px) {
    margin: 5% auto;
  };

  // ipad
  @media only screen and (min-height: 1000px) {
    margin: 10% auto;
  };

  // ipad pro
  @media only screen and (min-height: 1366px) {
    margin: 20% auto;
  };
`;

const P = styled.p`
  font-size: 22px;
  font-weight: bold;
  line-height: 130%;

  @media ${theme.device.mobileM} {
    font-size: 17px;
  }
`;

export default Calendar_Calendar;