import React from 'react';
import styled from 'styled-components';
// elementc & components
import { Grid, Text } from '../elements';
import CardRcmd from './Main_CardRcmd';

/** 
 * @param {*} props
 * @returns 추천음식
 * @역할 추천음식을 보여주는 컴포넌트
 * @필수값 추천검색 리스트
 * @담당자 : 박용태
*/

const RcmdList = (props) => {
// dispatch
// props
// useEffect

  // 가라데이터
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

      {/* 타이틀 */}
      <Grid padding="0 0 0 8%" margin="2.6vh 0 0 0" m_margin="2.6vh 0 0 0">
        <Text lineheight="24px" m_lineheight="20px" size="20px" m_size="17px" bold color="#2A2A2A" padding="0" margin="0">오늘 칼로리즈가 많이 먹은 음식</Text>
      </Grid>

      {/* 추천리스트 */}
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
  margin: 1.7vh 0 0 0;
  padding: 0 3% 3vh 5.2%;
  display: flex;
  align-items: center;
  gap: 2%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  } 
`;

export default RcmdList;