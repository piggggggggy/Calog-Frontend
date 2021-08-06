import React, {useEffect} from 'react';
import {Grid, Text} from '../elements';

// 컴포넌트
import Calendar_Calendar from '../components/Calendar_Calendar';

// 데이터
import { useSelector } from 'react-redux';

// history
import {history} from '../redux/configStore'


/** 
 * @역할 : 유저의 기초대사량을 토대로 한 달 식습관을 확인할 수 있는 페이지
 * @담당자 : 김나영
*/

const Calendar = (props) => {

  // 로그인 체크
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {

    // 로그인이 아닐 경우 로그인 창으로 이동
    if(!is_login) {
      let result = window.confirm('로그인이 필요한 기능이예요!🙀 로그인 페이지로 이동할까요?')
      result ? history.push('/signsocial') : history.push('/');
    }
  });

  return (
    <React.Fragment>

      {/* 헤더 */}
      <Grid padding="13.5% 0 0 5.8%">
        <Text size="28px" bold m_size='22px'>캘린더</Text>
      </Grid>

      {/* 캘린더 */}
      {is_login && <Calendar_Calendar />}
    </React.Fragment>
  );
};

export default Calendar;