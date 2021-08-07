import React from 'react';
import {Grid, Text} from '../elements';

// 도넛차트
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';

// 데이터
import {useSelector} from 'react-redux';

/** 
 * @param {list} r
 * @returns {list} r 유저가 기록한 foodRecords의 리스트를 반환
 * @역할 : 대시보드에서 유저에게 조금 더 시각적으로 기록을 보여주기 위한 그래프
 * @필수값 : 각 끼니마다의 칼로리 목록(foodRecords), bmr
 * @담당자 : 김나영
*/

const DashBoard_Chart = (props) => {

  // bmr
  const {bmr} = props;

  // 배열로 만들어 반복문을 사용하기 위해
  const foodRecords = props[0];
  
  // 기록 리스트(각 타입에 맞는 리스트와 총 칼로리 합계)
  // 아침
  const morning_list = foodRecords?.filter((r) => r.type === "아침");
  let morning_kcal = 0;
  if(morning_list?.length !== 0) {
    for(let idx=0; idx<morning_list?.length; idx++) {
      let kcal = morning_list[idx].resultKcal
      morning_kcal += kcal
    }
  };

  // 점심
  const lunch_list = foodRecords?.filter((f) => f.type === "점심");
  let lunch_kcal = 0;
  if(lunch_list?.length !== 0) {
    for(let idx=0; idx<lunch_list?.length; idx++) {
      let kcal = lunch_list[idx].resultKcal
      lunch_kcal += kcal
    }
  };

  // 저녁
  const dinner_list = foodRecords?.filter((f) => f.type === "저녁");
  let dinner_kcal = 0;
  if(dinner_list?.length !== 0) {
    for(let idx=0; idx<dinner_list?.length; idx++) {
      let kcal = dinner_list[idx].resultKcal
      dinner_kcal += kcal
    }
  };

  // 간식
  const snack_list = foodRecords?.filter((f) => f.type === "간식");
  let snack_kcal = 0;
  if(snack_list?.length !== 0) {
    for(let idx=0; idx<snack_list?.length; idx++) {
      let kcal = snack_list[idx].resultKcal
      snack_kcal += kcal
    }
  };

  // 야식
  const night_list = foodRecords?.filter((f) => f.type === "야식");
  let night_kcal = 0;
  if(night_list?.length !== 0) {
    for(let idx=0; idx<night_list?.length; idx++) {
      let kcal = night_list[idx].resultKcal
      night_kcal += kcal
    }
  };

  // 차트 데이터
  // 로그인 유무 체크
  const is_login = useSelector((state) => state.user.is_login);
  
  // case1) 비로그인 유저일 때
  const not_user_data = [
    { 
      "id": "아침",
      "value": 200,
    },
    {
      "id": "점심",
      "value": 200,
    },
    {
      "id": "저녁",
      "value":200,
    },
    {
      "id": "간식",
      "value": 200,
    },
    {
      "id": "야식",
      "value": 200,
    },
  ];

  // case2-1) 로그인 유저 - 데이터가 아무것도 없을 때
  const none_data = [
    {
      "value" : 100,
    }
  ];

  // case2-2) 로그인 유저 - 데이터가 있을 때
  // id
  const is_morning = (morning_list?.length !== 0) && "아침";
  const is_lunch = (lunch_list?.length !== 0) && "점심";
  const is_dinner = (dinner_list?.length !== 0) && "저녁";
  const is_snack = (snack_list?.length !== 0) && "간식";
  const is_night = (night_list?.length !== 0) && "야식";

  // data
  const data_day = [
    { 
      "id": is_morning,
      "value": morning_kcal,
    },
    {
      "id": is_lunch,
      "value": lunch_kcal,
    },
    {
      "id": is_dinner,
      "value": dinner_kcal,
    },
    {
      "id": is_snack,
      "value": snack_kcal,
    },
    {
      "id": is_night,
      "value": night_kcal,
    },
    { 
      "id" : "",
      "value": bmr-morning_kcal-lunch_kcal-dinner_kcal-snack_kcal-night_kcal,
    }
  ];

  return (
    <React.Fragment>

      {/* 전체 틀 */}
      <Grid margin="5.8% auto 0 auto" border_radius="20px" width="48%" height="200px" m_margin="0 auto">

      <Title>
          <Text size="13px" bold m_size="11px" margin="0">나의 칼로리</Text>
      </Title> 
      {/**
        * data = 데이터
        * innerRadius = 도넛 안쪽 둥글기
        * arcLabel = 이너 라벨
        * arcLabelsTextColor = 폰트컬러
        * enableArcLinkLabels = 라벨 유무
        * theme = 테마(폰트 크기)
        * colors = 그래프 색
      */}
      {/* case1) 비로그인 유저일 때 */}
      {!is_login && (
        <ResponsivePie
          data={not_user_data}
          innerRadius={0.45}
          arcLabel="id"
          arcLabelsTextColor="#000000"
          enableArcLinkLabels={false}
          theme={{
            "fontSize":14,
          }}
          colors={{ scheme: 'set3' }}
        />
      )}

      {/* case2-1) 로그인 유저일 때 */}
      {is_login && (
        <React.Fragment>

          {/* case2-1-1) foodRecords 기록이 없을 때 */}
          {!foodRecords?.length>0 ? (
            <ResponsivePie
              data={none_data}
              innerRadius={0.45}
              arcLabel="id"
              enableArcLinkLabels={false}
              colors={'#E4E4E4'}
            />
          ) : (

            // case2-1-2) foodRecords 기록이 있을 때
            <ResponsivePie
              data={data_day}
              innerRadius={0.45}
              arcLabel="id"
              arcLabelsTextColor="#000000"
              enableArcLinkLabels={false}
              theme={{
                "fontSize":14,
              }}
              colors={{ scheme: 'set3' }}
            />
          )}
        </React.Fragment>
      )}
      </Grid>
      
      
    </React.Fragment>
  );
};

const Title = styled.div`
  position: relative;
  height: 200px;
  text-align: center;
  line-height: 200px;
  margin-bottom: -200px;
`;

export default DashBoard_Chart;