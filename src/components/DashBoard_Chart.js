import React, {useState} from 'react';
import {Grid, Text} from '../elements';
//도넛차트
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 대시보드에서 유저에게 조금 더 시각적으로 기록을 보여주기 위한 그래프
 * @필수값 : 각 끼니마다의 칼로리 목록(foodRecords), bmr
 * @담당자 : 김나영
*/

const DashBoard_Chart = (props) => {

  //bmr
  const {bmr} = props

  //배열로 만들어 반복문을 사용하기 위해
  const foodRecords = props[0]
  
  //기록 리스트(각 타입에 맞는 리스트와 총 칼로리 합계)
  // 아침
  const morning_list = foodRecords?.filter((f) => f.type === "아침")
  let morning_kcal = 0
  if(morning_list?.length !== 0) {
    for(let idx=0; idx<morning_list?.length; idx++) {
      let kcal = morning_list[idx].resultKcal
      morning_kcal += kcal
    }
  }
  // 점심
  const lunch_list = foodRecords?.filter((f) => f.type === "점심")
  let lunch_kcal = 0
  if(lunch_list?.length !== 0) {
    for(let idx=0; idx<lunch_list?.length; idx++) {
      let kcal = lunch_list[idx].resultKcal
      lunch_kcal += kcal
    }
  }
  //저녁
  const dinner_list = foodRecords?.filter((f) => f.type === "저녁")
  let dinner_kcal = 0
  if(dinner_list?.length !== 0) {
    for(let idx=0; idx<dinner_list?.length; idx++) {
      let kcal = dinner_list[idx].resultKcal
      dinner_kcal += kcal
    }
  }
  //간식
  const snack_list = foodRecords?.filter((f) => f.type === "간식")
  let snack_kcal = 0
  if(snack_list?.length !== 0) {
    for(let idx=0; idx<snack_list?.length; idx++) {
      let kcal = snack_list[idx].resultKcal
      snack_kcal += kcal
    }
  }
  //야식
  const night_list = foodRecords?.filter((f) => f.type === "야식")
  let night_kcal = 0
  if(night_list?.length !== 0) {
    for(let idx=0; idx<night_list?.length; idx++) {
      let kcal = night_list[idx].resultKcal
      night_kcal += kcal
    }
  }

  //차트 데이터
  //데이터가 아무것도 없을 때
  const none_data = [
    {
      "value" : 100,
    }
  ]
  //데이터가 있을 때 id
  const is_morning = (morning_list?.length !== 0) && "아침"
  const is_lunch = (lunch_list?.length !== 0) && "점심"
  const is_dinner = (dinner_list?.length !== 0) && "저녁"
  const is_snack = (snack_list?.length !== 0) && "간식"
  const is_night = (night_list?.length !== 0) && "야식"

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
      "value": bmr-morning_kcal-lunch_kcal-dinner_kcal-snack_kcal-night_kcal,
    }
  ];

  return (
    <React.Fragment>
      {/* 전체 틀 */}
      <Grid margin="5.8% auto 0 auto" border_radius="20px" width="48%" height="200px" m_margin="0 auto">
        <Title>
          <Text size="13px" bold m_size="11px">나의 칼로리</Text>
        </Title> 
        {!foodRecords?.length>0 ? (
          <ResponsivePie
          //데이타
            data={none_data}
          //도넛 안쪽 둥글기
            innerRadius={0.45}
          //이너 라벨
            arcLabel="id"
          //라벨 없음
            enableArcLinkLabels={false}
          //컬러
            colors={'#E4E4E4'}
          />
        ) : (
          <ResponsivePie
          //데이타
            data={data_day}
          //도넛 안쪽 둥글기
            innerRadius={0.45}
          //이너 라벨은 id값으로
            arcLabel="id"
          //글씨
            arcLabelsTextColor="#000000"
          //라벨 없음
            enableArcLinkLabels={false}
          //테마
            theme={{
              "fontSize":14,
            }}
          //색
            colors={{ scheme: 'set3' }}
          />
        )}
      </Grid>
    </React.Fragment>
  );
}

DashBoard_Chart.defaultProps = {

}

const Title = styled.div`
  position: absolute;
  width: 48%;
  height: 200px;
  text-align: center;
  line-height: 200px;
`;

export default DashBoard_Chart;