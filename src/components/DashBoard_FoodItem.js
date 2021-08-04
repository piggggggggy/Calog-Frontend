import React from 'react';
import { Grid, Text } from '../elements';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : dashboard 각 타입에 기록된 칼로리 리스트
 * @필수값 : 
 * @담당자 : 김나영
*/

const DashBoard_FoodItem = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <Grid display="flex" margin="2.5% 0 0 0">
        {/* 메뉴 */}
        <Grid width="63%">
          <Text size="15px">김치볶음밥</Text>
        </Grid>
        {/* 칼로리 */}
        <Grid width="28%">
          <Text size="15px" bold>89kcal</Text>
        </Grid>
        {/* 수량 */}
        <Grid width="9.1%">
          <Text size="15px">X 1.5</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

DashBoard_FoodItem.defaultProps = {

}

export default DashBoard_FoodItem;