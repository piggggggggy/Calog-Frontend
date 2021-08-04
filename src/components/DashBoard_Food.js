import React from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//컴포넌트
import DashBoard_FoodItem from './DashBoard_FoodItem';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : dashboard 기록한 칼로리 상세 리스트를 확인하는 컴포넌트(오늘 날짜)
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 김나영
*/

const DashBoard_Food = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <Grid width="88%" height="204px" bg={'rgba(255, 232, 153, 0.14)'} border_radius="15px" margin="4.5% auto 0 auto" m_margin="4.5% auto 0 auto">
        {/* 상단 */}
        <Grid is_flex padding="6.3% 5% 0 5%">
          {/* type */}
          <Grid width="17%" height="25px" bg={theme.color.light} border_radius="25px" line_height="25px" text_align="center">
            <Text size="13px" bold m_size="12px">아침</Text>
          </Grid>
          {/* 섭취 칼로리 */}
          <Grid width="auto">
            <Text size="20px" bold m_size="17px">600kcal</Text>
          </Grid>
        </Grid>
        {/* 기록 칼로리 리스트 */}
        <List>
          <DashBoard_FoodItem />
        </List>
      </Grid>
    </React.Fragment>
  );
}

DashBoard_Food.defaultProps = {

}

const List = styled.div`
  height: 135px;
  padding: 4.5% 5% 0 5%;
  overflow: auto;
`;

export default DashBoard_Food;