import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import theme from '../shared/theme';

/** 
 * @역할  캘린더 각 끼니에 기록된 칼로리 리스트
 * @필수값  amount, name, resultKcal, data_type
 * @담당자  김나영
*/

const CalendarDetail_Food = (props) => {
  const {amount, name, resultKcal, data_type, type} = props;

  const foodName = name.includes(':') ? name.split(':')[1] : name;

  return (
    <React.Fragment>
      {data_type === type && (
        <Grid display="flex" margin="2.5% 0 2% 0" m_margin="3% 0 2% 0" cursor="default">

          {/* 메뉴 */}
          <Grid width="100%">
            <Text size="15px" m_size="13px">{foodName}</Text>
          </Grid>

          {/* 칼로리 */}
          <Grid width="25%">
            <Text size="15px" bold m_size="13px">{resultKcal}kcal</Text>
          </Grid>

          {/* 수량 */}
          <Width>
            <Text size="15px" m_size="13px">X {amount}</Text>
          </Width>
        </Grid>
      )}
    </React.Fragment>
  );
}

const Width = styled.div`
  width: 15%;
  text-align: right;

  @media ${theme.device.mobileM} {
    width: 20%;
  }
`;

export default CalendarDetail_Food;