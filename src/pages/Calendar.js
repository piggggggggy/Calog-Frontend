import React from 'react';
import {Grid, Text} from '../elements';

// 컴포넌트
import Calendar_Calendar from '../components/Calendar_Calendar';
import Loading from './Loading4';

// 데이터
import {useSelector} from 'react-redux'

// helmet
import {Helmet} from 'react-helmet';

/** 
 * @역할 : 유저의 기초대사량을 토대로 한 달 식습관을 확인할 수 있는 페이지
 * @담당자 : 김나영
*/

const Calendar = (props) => {

  // 로그인 체크
  const is_login = useSelector((state) => state.user.is_login);

  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded);

  // 스피너
  if(!is_loaded) {
    return (<Loading />);
  };
  
  return (
    <React.Fragment>

      {/* 헬멧 */}
      <Helmet>
        <title>[Calog] 나의 한 달 캘린더</title>
      </Helmet>

      {/* 헤더 */}
      <Grid padding="13.5% 0 0 5.8%">
        <Text size="28px" bold m_size='22px'>캘린더</Text>
      </Grid>

      {/* 캘린더 */}
      <Calendar_Calendar is_login={is_login}/>
    </React.Fragment>
  );
};

export default Calendar;