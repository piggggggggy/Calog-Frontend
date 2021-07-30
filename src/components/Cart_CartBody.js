import React from 'react';
import styled from 'styled-components';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Cart_Card';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 장바구니에 담은 값들
 * @담당자 : 박용태
*/

const CartBody = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <BodyContainer>
        
        <Grid is_flex padding="0 32px">
          <Grid>
            <Text lineheight="22px" size="17px" color="#EB5858" margin="0 0 4px 0" paddig="0">100kcal 초과했어요!</Text>
            <Text lineheight="41px" bold size="34px" color="#2A2A2A" margin="0" paddig="0">3100 kcal</Text>
          </Grid>
          <Grid width="60px" display="flex" fd="column" jc="space-between" align-items="flex-end">
            <Text lineheight="24px" bold size="20px" margin="5px 0" padding="0">아침</Text>
            <Text lineheight="24px" bold size="20px" color="#C4C4C4" margin="5px 0" padding="0">점심</Text>
            <Text lineheight="24px" bold size="20px" color="#C4C4C4" margin="5px 0" padding="0">저녁</Text>
          </Grid>
        </Grid>

        <CartListBox>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </CartListBox>

      </BodyContainer>
    </React.Fragment>
  );
}

CartBody.defaultProps = {

}

const BodyContainer = styled.div`
  max-width: 100%;
  /* padding: 0 25px; */
`;

const CartListBox = styled.div`
  margin-top: 32px;
`;

export default CartBody;