import React, {useEffect} from 'react';

// css
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// components
import DashBoard_Title from '../components/DashBoard_Title';
import DashBoard_Chart from '../components/DashBoard_Chart';
import DashBoard_Workout from '../components/DashBoard_Workout';
import DashBoard_BodySpec from '../components/DashBoard_BodySpec';
import DashBoard_Food from '../components/DashBoard_Food';
import Loading from './Loading2';

// redux
import {useSelector, useDispatch} from 'react-redux';
import {getTodayRecordDB} from '../redux/modules/record';
import {getWorkoutDB} from '../redux/modules/dashboard';
import {history} from '../redux/configStore';

// helmet
import {Helmet} from 'react-helmet';

/** 
 * @역할 오늘의 기록에 대한 내역을 확인할 수 있는 대시보드 페이지
 * @담당자 김나영
*/

const DashBoard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(is_login) {
      dispatch(getTodayRecordDB())
      dispatch(getWorkoutDB())
    }
  }, [history.location.pathname]);

  // 로그인 상태 체크 >> 로그인 유무에 따라 유저에게 보여지는 화면이 다르기 때문 
  const is_login = useSelector((state) => state.user.is_login);

  // bmr >> 유저의 기초대사량을 바탕으로 현재 섭취한 칼로리를 비교(user - loginChk 시 bmr 받아옴 >> 가장 최신의 데이터)
  let bmr = useSelector((state) => state.dashboard.bmr);

  // 기록리스트
  let record = [];
  const record_list = useSelector((state) => state.record.record);

  // case1) 기록이 없을 때
  if(record_list?.length === 0) {
    record = []
  } else {

    //case2) 기록이 있을 때
    let yes_record = record_list[0]?.foodRecords
    record = yes_record
  };
  
  // 유저정보
  const user = useSelector((state) => state.user.user_info);

  // 운동리스트
  const exercise_list = useSelector((state) => state.dashboard.exercise);

  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded);

  // 스피너
  if(!is_loaded) {
    return (<Loading />);
  };

  return (
        <Grid width="100%">

        {/* 헬멧 */}
        <Helmet>
          <title>[Calog] 오늘의 칼로리</title>
        </Helmet>

        {/* 상단 bmr 관련 타이틀 */}
        <DashBoard_Title is_login={is_login} bmr={bmr} record={record} user_info={user}/>

        {/* 바디스펙 */}
        <DashBoard_BodySpec {...user} bmr={bmr} is_login={is_login}/>

        {/* 칼로리 분석 */}
        <DashBoard_Chart {...[record]} bmr={bmr}/>

        {/* 칼로리 리스트 */}
        <DashBoard_Food _data={record_list} is_login={is_login} {...[record]} />

        {/* 운동 추천 - 로그인 유저만 확인 가능 */}
        {is_login && (
          <Grid margin="14.6% 0 0 0" m_margin="13.6% 0 0 0" bg={'#F5F5F5'} padding="7.8% 0">
            <Text size="20px" bold m_size="17px" margin="0 0 0 8.3%">{user.nickname}님, 이런 운동은 어때요?</Text>
            <Exercise_Wrap>

              {/* 운동 리스트 맵 */}
              {exercise_list?.map((e, idx) => {
                return <DashBoard_Workout key={e._id} {...e}/>
              })}
            </Exercise_Wrap>
          </Grid>
        )}
      </Grid>
  );
};

const Exercise_Wrap = styled.div`
  width: 95%;
  min-width: 280px;
  max-height: 480px;
  display: flex;
  margin: 7.8% 0 0 2.5%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${theme.device.mobileM} {
    margin-top: 4.8% 0 0 2.5%;
  }
`;

export default DashBoard;