import React from 'react';
import { Grid, Text } from '../elements';

/** 
 * @역할  대시보드 각 끼니에 기록된 칼로리 리스트
 * @필수값  amount, name, resultKcal, type
 * @담당자  김나영
*/

const DashBoard_FoodItem = (props) => {
  const {amount, name, resultKcal, type, data_type} = props;

  return (
    <React.Fragment>

      {/* record에서 기록하고 넘어온 경우 state 안에 데이터값과 props값이 다르다.(버튼을 누르지 않았기 때문!) */}
      {/* DashBoard_When의 type(끼니)를 클릭 = 기록된 type과 일치한 경우 */}
      {(type === data_type) && (
        <Grid display="flex" margin="2.5% 0 0 0">

          {/* 메뉴 */}
          <Grid width="63%">
            <Text size="15px" m_size="13px">{name}</Text>
          </Grid>

          {/* 칼로리 */}
          <Grid width="28%">
            <Text size="15px" bold m_size="13px">{resultKcal}kcal</Text>
          </Grid>

          {/* 수량 */}
          <Grid width="9.1%">
            <Text size="15px" m_size="13px">X {amount}</Text>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default DashBoard_FoodItem;