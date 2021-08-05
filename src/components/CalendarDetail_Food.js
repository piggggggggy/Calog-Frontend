import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import theme from '../shared/theme';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const CalendarDetail_Food = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <Grid display="flex" margin="2.5% 0 2% 0">
          {/* 메뉴 */}
          <Grid width="63%">
            <Text size="15px" m_size="13px">계란프라이</Text>
          </Grid>
          {/* 칼로리 */}
          <Grid width="28%">
            <Text size="15px" bold m_size="13px">89kcal</Text>
          </Grid>
          {/* 수량 */}
          <Width>
            <Text size="15px" m_size="13px">X 1.5</Text>
          </Width>
        </Grid>
    </React.Fragment>
  );
}

CalendarDetail_Food.defaultProps = {

}

const Width = styled.div`
  width:9.1%;

  @media ${theme.device.mobileM} {
    width:12%
  }
`;

export default CalendarDetail_Food;