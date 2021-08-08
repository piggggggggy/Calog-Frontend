import React, {useEffect} from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// 임포트
import DashBoard_Chart from '../components/DashBoard_Chart';
import DashBoard_Workout from '../components/DashBoard_Workout';
import DashBoard_BodySpec from '../components/DashBoard_BodySpec';
import DashBoard_Food from '../components/DashBoard_Food';

// 데이터
import {useSelector, useDispatch} from 'react-redux';
import {getTodayRecordDB} from '../redux/modules/record';

/** 
 * @역할 오늘의 기록에 대한 내역을 확인할 수 있는 대시보드 페이지
 * @담당자 김나영
*/

const DashBoard = (props) => {
  const dispatch = useDispatch();

  // 로그인 유무 체크(미로그인 유저에게는 임시의 데이터를 보여준다) 
  const is_login = useSelector((state) => state.user.is_login);
  
  // 오늘의 기록 불러오기(로그인 유저)
  useEffect(async () => {
    is_login && (
      await dispatch(getTodayRecordDB())
    )
  },[]);
  
  // 유저정보
  const user = useSelector((state) => state.user.user_info);

  // bmr
  let bmr = useSelector((state) => state.record.bmr);

  // 기록리스트
  let record = [];
  
  // case1) 기록이 없을 때
  const record_list = useSelector((state) => state.record.record);
  if(record_list?.length === 0) {
    record = []
  } else {

    //case2) 기록이 있을 때
    let yes_record = record_list[0]?.foodRecords
    record = yes_record
  };

  // 오늘 먹은 총 칼로리
  let today_kcal = 0;
  for(let idx = 0; idx<record?.length; idx++) {
    let kcal = record[idx].resultKcal;
    today_kcal += kcal
  };
  


  // good(bmr +- 10)
  const ten = bmr*0.1;
  const good = ((bmr-ten) <= today_kcal) && (today_kcal <= (bmr+ten));

  // bmr이 남았을 때
  const extra_bmr = today_kcal < (bmr-ten);
  const how_extra = bmr - today_kcal;

  // bmr을 초과했을 때
  const over_bmr = today_kcal > (bmr+ten);
  const how_over = today_kcal - bmr;

  return (
      <Grid width="100%">

        {/* 배경 */}
        <Top/>

        {/* 멘트 */}
        <Line>
          {/* 비로그인 유저 */}
          {!is_login && (
            <React.Fragment>
              <Text size="22px" bold m_size="18px">안녕하세요!</Text>
              <Text size="22px" bold m_size="18px">로그인이<br/>필요한 기능이예요🧐</Text>
            </React.Fragment>
          )}

          {/* 로그인 유저 */}
          {is_login && (
            <React.Fragment>

            {/* case1) 초과해서 먹었을 경우 컬러 다르게 */}
            {(over_bmr && bmr !== 0) ?
              <Text size="22px" bold m_size="18px" color={'#E24444'}>{user.nickname}님!</Text> :
              <Text size="22px" bold m_size="18px">{user.nickname}님!</Text>
            }

            {/* case2) 기록된 리스트가 없을 때 */}
            {record?.length === 0 && <Text size="22px" bold m_size="18px">아직<br/>입력된 식단이 없어요🧐</Text>}

            {/* case3) 기록된 리스트가 있을 때 */}
            {record?.length !== 0 && (
              <React.Fragment>

                {/* case3-1) bmr 값이 있을 때 */}
                  {bmr !== 0 ? (
                    <React.Fragment>

                      {/* case3-1-1) good일 때 */}
                      {good  && <Text size="22px" bold m_size="18px">오늘의 칼로리를<br/>충분히 채웠어요😻</Text>}

                      {/* case3-1-2) bad(over)일 때 */}
                      {over_bmr && <Text size="22px" bold m_size="18px" color={'#E24444'}>{how_over}kcal<br/>초과했어요🙀</Text>}

                      {/* case3-1-3) 기초대사량보다 덜 먹었을 때 */}
                      {extra_bmr && <Text size="22px" bold m_size="18px">{how_extra}kcal<br/>더 먹을 수 있어요👍🏻</Text>}
                    </React.Fragment>
                  ) : (

                    // case3-2) bmr 값이 없을 때
                    <Text size="22px" bold m_size="18px">입력된 <br/>기초 대사량이 없어요🧐</Text>
                  )}
              </React.Fragment>
            )}
          </React.Fragment>    
        )}    

          {/* 먹은 칼로리의 총합 */}
          <Grid padding="1vh 0 0 0;">
                <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 현재까지 {today_kcal}kcal 먹었어요.</Text>
              </Grid>    
        </Line>

        {/* 바디스펙 */}
        <DashBoard_BodySpec {...user} bmr={bmr}/>

        {/* 칼로리 분석 */}
        <DashBoard_Chart {...[record]} bmr={bmr}/>

        {/* 칼로리 리스트 */}
        <DashBoard_Food {...[record]} />

        {/* 운동 추천 */}
        <Grid margin="11.5% 0 0 0" m_margin="10.5% 0 0 0" bg={'#F5F5F5'} padding="7.8% 0 7.8% 6.3%">
          <Text size="20px" bold m_size="17px" margin="0 0 0 2%">{user.nickname}님, 이런 운동은 어때요?</Text>
          <Grid margin="7.8% 0 0 0" m_margin="4.8% 0 0 0">

            {/* 운동 리스트 맵 */}
            <DashBoard_Workout />
          </Grid>
        </Grid>
      </Grid>
  );
};

const Top = styled.div`
  position: relative;
  background-color: ${theme.color.light};
  height: 26.6vh;
  min-width: 280px;
  max-width: 420px;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const Line = styled.div`
  position: relative;
  line-height: 27px;
  padding-left: 9.7%;
  margin-top: -40%;
  margin-bottom: 2%;

  @media ${theme.device.mobileM} {
    line-height: 20px;
  }
`;

export default DashBoard;