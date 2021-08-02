import React from 'react';
import styled from 'styled-components';
import {Text} from '../elements';
import theme from '../shared/theme';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 유저가 카트에 담은 칼로리의 리스트를 보여주는 컴포넌트
 * @필수값 : 카트 칼로리 리스트
 * @담당자 : 김나영
*/

const Record_List = (props) => {
// dispatch
  const {foodId, name, quantity, calorie, gram} = props
// useEffect

  return (
    <React.Fragment>
      <Wrap>
        <Text>{props.name} ({props.gram}g)</Text>
        <Text>{props.calorie}kcal</Text>
        <Text>X {props.quantity}</Text>
      </Wrap>
    </React.Fragment>
  );
}

Record_List.defaultProps = {
  foodId: 1,
  name: '피자마루 간장치킨',
  quantity : 1,
  calorie: 4500,
  gram: 600,
}

const Wrap = styled.div`
  width: 368px;
  height: 51px;
  border: 1px solid ${theme.color.dark};
  border-radius: 28px;
  box-sizing: border-box;
  margin: 8px auto;
  display: flex;
  justify-content: space-around;
`;

export default Record_List;