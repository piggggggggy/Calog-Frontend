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
  useEffect(() => {
      dispatch(getTodayRecordDB())
  },[is_login]);
  
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
        <Top>
          <Emoji>
            <svg width="171" height="186" viewBox="0 0 171 186" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M73.756 148.485C73.756 148.485 23.2267 130.778 4.7627 56.6099" stroke="#565656" stroke-width="3.70732" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M178.727 133.263C201.108 227.304 134.02 254.337 80.3994 254.337C26.7787 254.337 -15.0143 220.609 5.17243 133.263C21.8337 61.1631 28.5015 1 86.7436 1C144.986 1 162.217 63.8827 178.727 133.263Z" fill="#6993FF"/>
              <path d="M54.6143 59.5232C55.5728 58.5964 56.1108 57.3428 56.1105 56.0363C56.1105 54.7304 55.5726 53.4775 54.6143 52.5513C53.6551 51.6285 52.3536 51.1095 50.9962 51.1084C49.6394 51.11 48.3387 51.629 47.3799 52.5513C46.4205 53.4769 45.8818 54.73 45.8818 56.0363C45.8813 57.3432 46.42 58.5971 47.3799 59.5232C48.3387 60.4455 49.6394 60.9644 50.9962 60.966C52.3536 60.9649 53.6551 60.4459 54.6143 59.5232Z" fill="white"/>
              <path d="M80.1915 59.5232C79.2327 60.4455 77.9321 60.9644 76.5753 60.966C75.2185 60.9644 73.9178 60.4455 72.959 59.5232C71.9991 58.5971 71.4604 57.3432 71.4609 56.0363C71.4609 54.73 71.9995 53.4769 72.959 52.5513C73.9178 51.629 75.2185 51.11 76.5753 51.1084C77.9321 51.11 79.2327 51.629 80.1915 52.5513C81.151 53.4769 81.6896 54.73 81.6896 56.0363C81.6901 57.3432 81.1514 58.5971 80.1915 59.5232Z" fill="white"/>
              <path d="M55.1924 69.6196C55.9708 70.0617 56.5348 70.7824 56.7606 71.6236C57.6519 74.4856 60.8301 75.7499 63.6935 75.7499C66.5569 75.7499 69.7389 74.4747 70.6264 71.6236C70.8652 70.7971 71.4316 70.0934 72.2041 69.6634C72.9753 69.2338 73.8914 69.1128 74.7546 69.3263C75.6188 69.5401 76.3614 70.0704 76.8235 70.8038C77.2871 71.5375 77.4328 72.4165 77.2293 73.2523C75.4639 78.9963 69.7806 82.3229 63.6935 82.3229C57.8396 82.3229 51.6539 79.0437 50.1577 73.2596C49.9373 72.4156 50.0737 71.5223 50.5369 70.7746C50.9967 70.0261 51.747 69.4836 52.6229 69.2662C53.4944 69.0544 54.4177 69.1814 55.1924 69.6196Z" fill="white"/>
              <path d="M141.007 93.8018C141.007 93.8018 191.536 76.0944 210 1.92676" stroke="#565656" stroke-width="3.70732" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Emoji>
        </Top>

        {/* 멘트 */}
        <Line>
          {/* 비로그인 유저 */}
          {!is_login && (
            <React.Fragment>
              <Text size="22px" bold m_size="18px">안녕하세요!</Text>
              <Text size="22px" bold m_size="18px">로그인이<br/>필요한 기능이예요🧐</Text>
              <Grid padding="1vh 0 0 0;">
                <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 오늘은 어떤 음식을 드실건가요?</Text>
              </Grid> 
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
            {record?.length === 0 && (
              <React.Fragment>
                <Text size="22px" bold m_size="18px">칼로리를<br/>등록해주세요🧐</Text>
                <Grid padding="1vh 0 0 0;">
                  <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 오늘은 어떤 음식을 드실건가요?</Text>
                </Grid> 
              </React.Fragment>
            )}

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
                  {extra_bmr && (
                    <Grid>
                      <Text size="22px" bold m_size="18px">{how_extra}kcal<br/>더 먹을 수 있어요👍🏻</Text>
                      
                    </Grid>
                  )}
                  </React.Fragment>
                  ) : (

                  // case3-2) bmr 값이 없을 때
                  <Text size="22px" bold m_size="18px">입력된 <br/>기초 대사량이 없어요🧐</Text>
                )}

                {/* 먹은 칼로리의 총합 */}
                <Grid padding="1vh 0 0 0;">
                  <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 현재까지 {today_kcal}kcal 먹었어요.</Text>
                </Grid>  
              </React.Fragment>
            )}
          </React.Fragment>    
        )} 
        </Line>

        {/* 바디스펙 */}
        <DashBoard_BodySpec {...user} bmr={bmr}/>

        {/* 칼로리 분석 */}
        <DashBoard_Chart {...[record]} bmr={bmr}/>

        {/* 칼로리 리스트 */}
        <DashBoard_Food {...[record]} />

        {/* 운동 추천 */}
        <Grid margin="14.6% 0 0 0" m_margin="13.6% 0 0 0" bg={'#F5F5F5'} padding="7.8% 0 7.8% 6.3%">
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
  height: 29vh;
  min-width: 280px;
  max-width: 420px;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const Line = styled.div`
  position: relative;
  line-height: 27px;
  padding-left: 9.7%;
  margin-top: -45%;
  margin-bottom: 2%;

  @media ${theme.device.mobileM} {
    line-height: 20px;
  }
`;

const Emoji = styled.div`
  position: absolute;
  right: 0;
  margin-top: 15%;
`;

export default DashBoard;