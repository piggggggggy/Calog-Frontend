import React from 'react';
import styled from 'styled-components';
// elements & components
import { Grid, Text } from '../elements';
// icons
import { AiOutlinePlusCircle } from 'react-icons/ai';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const FDbody = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <BodyContainer>
        
        <Grid is_flex>
          <Grid>
            <Text bold margin="10px 0" paddig="0">떡볶이</Text>
            <Text bold size="3rem" margin="15px 0" paddig="0">3100kcal</Text>
            <div><AiOutlinePlusCircle size="2rem"/></div>
          </Grid>
          <Grid>

          </Grid>
        </Grid>

        <Grid margin="30px 0 0 0">
          <IngredientBox>
            <Text bold margin="0" padding="0">영양성분</Text>
            
          </IngredientBox>
        </Grid>

      </BodyContainer>
    </React.Fragment>
  );
}

FDbody.defaultProps = {

}

const BodyContainer = styled.div`
  max-width: 100%;
  padding: 0 25px;
`;

const IngredientBox = styled.div`
  width: 100%;
  padding: 25px;
  background: lightgray;
  border: none;
  border-radius: 30px;
`;

export default FDbody;