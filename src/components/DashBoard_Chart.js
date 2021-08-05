import React, {useState} from 'react';
import {Grid, Text} from '../elements';
//도넛차트
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components';
//데이터
import {useDispatch} from 'react-redux';
import {typeChk, ttlKcal} from '../redux/modules/record';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 대시보드에서 유저에게 조금 더 시각적으로 기록을 보여주기 위한 그래프
 * @필수값 : 각 끼니마다의 칼로리 목록(foodRecords)
 * @담당자 : 김나영
*/

const DashBoard_Chart = (props) => {
  const dispatch = useDispatch()

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
  //데이터가 있을 때
  const is_morning = foodRecords?.find((f) => f.type === "아침") == true
  console.log(is_morning)
  const data_day = [
    { 
      "id": "아침",
      "value": morning_kcal,
    },
    {
      "id": "점심",
      "value": lunch_kcal,
    },
    {
      "id": "저녁",
      "value": dinner_kcal,
    },
    {
      "id": "간식",
      "value": snack_kcal,
    },
    {
      "id": "야식",
      "value": night_kcal,
    },
  ];

  //차트 색
  const color = ["#E4E4E4","#C4C4C4","#A9A9A9","#8C8C8C","#737373"]
  const [typeColor, setTypeColor] = useState(color)

  //차트 버튼
  const Btn = (type) => {
    if(type.data.id === "아침") {
      setTypeColor(["#f19f13","#C4C4C4","#A9A9A9","#8C8C8C","#737373"])
      dispatch(typeChk("아침"))
      dispatch(ttlKcal(morning_kcal))
    }else if (type.data.id === "점심") {
      setTypeColor(["#E4E4E4","#f19f13","#A9A9A9","#8C8C8C","#737373"]) 
      dispatch(typeChk("점심"))
      dispatch(ttlKcal(lunch_kcal))
    }else if (type.data.id === "저녁") {
      setTypeColor(["#E4E4E4","#C4C4C4","#f19f13","#8C8C8C","#737373"])
      dispatch(typeChk("저녁"))
      dispatch(ttlKcal(dinner_kcal))
    }else if (type.data.id === "간식") {
      setTypeColor(["#E4E4E4","#C4C4C4","#A9A9A9","#f19f13","#737373"])
      dispatch(typeChk("간식"))
      dispatch(ttlKcal(snack_kcal))
    }else if (type.data.id === "야식") {
      setTypeColor(["#E4E4E4","#C4C4C4","#A9A9A9","#8C8C8C","#f19f13"])
      dispatch(typeChk("야식"))
      dispatch(ttlKcal(night_kcal))
    };
  }

  return (
    <React.Fragment>
      {/* 전체 틀 */}
      <Grid margin="7% auto 0 auto" border_radius="20px" width="48%" height="200px" m_margin="0 auto">
        <Title>
          <Text size="13px" bold m_size="11px">나의 칼로리</Text>
        </Title> 
        {foodRecords?.length === 0 ? (
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
          //각 섹션 띄우기
            padAngle={1}
          //이너 라벨은 id값으로
            arcLabel="id"
          //글씨
            arcLabelsTextColor="#ffffff"
          //라벨 없음
            enableArcLinkLabels={false}
          //테마
            theme={{
              "fontSize":15,
            }}
          //색
            colors={typeColor}
          //버튼
            onClick={Btn}
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