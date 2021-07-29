import React from 'react';
import {Grid, Text} from '../elements';
//도넛차트
import { Doughnut } from 'react-chartjs-2';

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
const data_day = {
  labels: ['아침', '점심', '저녁'],
  datasets: [{
    data: [30, 70, 50],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};

  return (
    <React.Fragment>
      {/* 전체 틀 */}
      <Grid margin="5% auto" height="400px" bg={'#eee'} border_radius="20px" width="90%"> 
        <Grid width="65%">
          <Doughnut data={data_day} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

DashBoard_Chart.defaultProps = {

}

export default DashBoard_Chart;