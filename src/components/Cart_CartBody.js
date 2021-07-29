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
        
        <Grid is_flex>
          <Grid>
            <Text bold color="red" margin="10px 0" paddig="0">100kcal 초과했어요!</Text>
            <Text bold size="3rem" margin="15px 0" paddig="0">3100kcal</Text>
          </Grid>
          <Grid>
            이미지
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
  padding: 0 25px;
`;

const CartListBox = styled.div`
  margin-top: 3rem;
`;

export default CartBody;