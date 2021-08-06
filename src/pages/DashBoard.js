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

  // 기록리스트
  const record = useSelector((state) => state.record.record[0]?.foodRecords);

  // 오늘 먹은 총 칼로리
  let today_kcal = 0;
  for(let idx = 0; idx<record?.length; idx++) {
    let kcal = record[idx].resultKcal;
    today_kcal += kcal
  };

  // 총 칼로리와 비교하여 상단 멘트 변동
  const is_record = useSelector((state) => state.record.record);
  
  // bmr
  let bmr = is_record[0]?.bmr;

  // 기록이 없어서 bmr이 없을 때
  if(is_record?.length === 0) {
    bmr=0
    // const idx = (user.bmr?.length)-1
    // const user_bmr = user?.bmr[idx]
    // console.log(user_bmr)
    // bmr = user.bmr[idx]?.bmr
  }

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
      <Grid margin="0 0 9% 0" m_margin="0 0 9% 0">

        {/* 배경 */}
        <TopBack />

        {/* 멘트 */}
        <Top>
          <Line>
            {/* 비로그인 유저 */}
            {!is_login && (
              <React.Fragment>
                <Text size="22px" bold m_size="20px">안녕하세요!</Text>
                <Text size="22px" bold m_size="20px">로그인이<br/>필요한 기능이예요🧐</Text>
              </React.Fragment>
            )}

            {/* 로그인 유저 - 초과해서 먹었을 경우 컬러 다르게 */}
            {is_login && (
              <React.Fragment>
                {over_bmr ?
                  <Text size="22px" bold m_size="20px" color={'#E24444'}>{user.nickname}님!</Text> :
                  <Text size="22px" bold m_size="20px">{user.nickname}님!</Text>
                }
                {is_record?.length === 0 && <Text size="22px" bold m_size="20px">아직<br/>입력된 식단이 없어요🧐</Text>}
                {(good && bmr !== 0) && <Text size="22px" bold m_size="20px">오늘의 칼로리를<br/>충분히 채웠어요😻</Text>}
                {extra_bmr && <Text size="22px" bold m_size="20px">{how_extra}kcal<br/>더 먹을 수 있어요👍🏻</Text>}
                {over_bmr && <Text size="22px" bold m_size="20px" color={'#E24444'}>{how_over}kcal<br/>초과했어요🙀</Text>}
              </React.Fragment>
            )}

            {/* 먹은 칼로리의 총합 */}
            <Grid margin="2% 0 0 0">
              <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 현재까지 {today_kcal}kcal 먹었어요.</Text>
            </Grid>
          </Line>
        </Top>

        {/* 바디스펙 */}
        <DashBoard_BodySpec {...user} bmr={bmr}/>

        {/* 칼로리 분석 */}
        <DashBoard_Chart {...[record]} bmr={bmr}/>

        {/* 칼로리 리스트 */}
        <DashBoard_Food {...[record]} />

        {/* 운동 추천 */}
        <Grid margin="11.5% 0 0 0" m_margin="10.5% 0 0 0" bg={'rgba(228, 228, 228, 0.1);'} padding="7.8% 0 7.8% 6.3%">
          <Text size="20px" bold m_size="17px" margin="0 0 0 2%">{user.nickname}님, 이런 운동은 어때요?</Text>
          <Grid margin="7.8% 0 0 0" m_margin="4.8% 0 0 0">

            {/* 운동 리스트 맵 */}
            <DashBoard_Workout />
          </Grid>
        </Grid>
      </Grid>
  );
};

const TopBack = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 26.6vh;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const Top = styled.div`
  padding: 12.3% 0 0 7.7%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${theme.device.mobileM} {
    padding: 10% 0 0 7.7%;
  }
`;

const Line = styled.div`
  line-height: 27px;

  @media ${theme.device.mobileM} {
    line-height: 20px;
  }
`;

export default DashBoard;