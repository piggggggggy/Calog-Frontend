import React from 'react';
import styled from 'styled-components';
import {Text} from '../elements';
import theme from '../shared/theme';

/** 
 * @역할 : 유저가 카트에 담은 칼로리의 리스트를 보여주는 컴포넌트
 * @필수값 : 카트 칼로리 리스트
 * @담당자 : 김나영
*/

const Record_List = (props) => {
  const { name, amount, kcal, grams} = props;

  return (
    <React.Fragment>
      <Wrap>
        <Text width="60%" size="15px" m_size="13px">{name} ({grams}g)</Text>
        <Text size="15px" bold m_size="13px">{kcal}kcal</Text>
        <Text size="15px" m_size="13px">X {amount}</Text>
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
};

const Wrap = styled.div`
  width: 88%;
  height: 51px;
  border: 1px solid ${theme.color.dark};
  border-radius: 16px;
  box-sizing: border-box;
  margin: 8px auto;
  display: flex;
  justify-content: space-around;
  padding: 0 2%;
`;

export default Record_List;