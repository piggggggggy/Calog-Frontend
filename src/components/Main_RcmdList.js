import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// elementc & components
import { Grid, Text } from '../elements';
import CardRcmd from './Main_CardRcmd';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const RcmdList = (props) => {
// dispatch
  const disaptch = useDispatch();
// props
// useEffect

  const rcmd_list = [
    {
      name: "쌀밥 (1공기)",
      kcal: 100,
      foodId: 44
    },
    {
      name: "쌀밥 (1공기)",
      kcal: 100,
      foodId: 45
    },
    {
      name: "쌀밥 (1공기)",
      kcal: 100,
      foodId: 46
    },
    {
      name: "쌀밥 (1공기)",
      kcal: 100,
      foodId: 47
    },
  ]
  

  return (
    <React.Fragment>
      <Grid padding="0 0 0 8%" margin="2.6vh 0 0 0" m_margin="2.6vh 0 0 0">
        <Text lineheight="24px" m_lineheight="20px" size="20px" m_size="17px" bold color="#2A2A2A" padding="0" margin="0">오늘 칼로리즈가 많이 먹은 음식</Text>
      </Grid>
      <RecommendContainer>
        {rcmd_list.map((r, idx) => {
          return <CardRcmd key={r.foodId} {...r}/>
        })}
      </RecommendContainer>
    </React.Fragment>
  );
}

RcmdList.defaultProps = [
  
];

const RecommendContainer = styled.div`
  margin: 1.8vh 0 0 0;
  padding: 0 0 4.4vh 5.2%;
  display: flex;
  align-items: center;
  gap: 2%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  } 
`;

export default RcmdList;