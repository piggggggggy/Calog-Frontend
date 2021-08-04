import React from 'react';
import {Grid, Text} from '../elements';
//도넛차트
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 대시보드에서 유저에게 조금 더 시각적으로 기록을 보여주기 위한 그래프
 * @필수값 : 각 끼니마다의 칼로리 목록
 * @담당자 : 김나영
*/

const DashBoard_Chart = (props) => {
// dispatch
// props
// useEffect

  //도넛 차트
  const data_day = [
    {"fontSize": 17,},
    {
      "id": "아침",
      "value": 513,
    },
    {
      "id": "점심",
      "value": 84,
    },
    {
      "id": "저녁",
      "value": 520,
    },
    {
      "id": "간식",
      "value": 52,
    },
    {
      "id": "야식",
      "value": 175,
    },
  ];

  return (
    <React.Fragment>
      {/* 전체 틀 */}
      <Grid margin="7% auto 0 auto" border_radius="20px" width="48%" height="200px">
        <Title>
          <Text size="15px" bold>나의 칼로리</Text>
        </Title> 
        <ResponsivePie
          //데이타
            data={data_day}
          //도넛 안쪽 둥글기
            innerRadius={0.5}
          //각 섹션 띄우기
            padAngle={1}
          //라벨은 id값으로
            arcLabel="id"
          //글씨
            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', '3' ] ] }}
          //라벨 없음
            enableArcLinkLabels={false}
          />
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