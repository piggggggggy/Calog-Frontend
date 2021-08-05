import React from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//컴포넌트
import DashBoard_FoodItem from './DashBoard_FoodItem';
//데이터
import {useSelector} from 'react-redux';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : dashboard 기록한 칼로리 상세 리스트를 확인하는 컴포넌트(오늘 날짜)
 * @필수값 : 각 끼니마다의 칼로리 목록(foodRecords)
 * @담당자 : 김나영
*/

const DashBoard_Food = (props) => {

  const record = props[0]

  //그래프 버튼의 type
  const data_type = useSelector((state) => state.record.type)
  //각 type에 따른 칼로리의 합계
  const data_kcal = useSelector((state) => state.record.kcal)

  return (
    <React.Fragment>
      <Grid width="88%" height="204px" bg={'rgba(255, 232, 153, 0.14)'} border_radius="15px" margin="4.5% auto 0 auto" m_margin="4.5% auto 0 auto">
        {/* 상단 */}
        <Grid is_flex padding="6.3% 5% 0 5%">
          {/* type */}
          <Grid width="17%" height="25px" bg={theme.color.light} border_radius="25px" line_height="25px" text_align="center">
            <Text size="13px" bold m_size="12px">{data_type}</Text>
          </Grid>
          {/* 섭취 칼로리 */}
          <Grid width="auto">
            <Text size="20px" bold m_size="17px">{data_kcal}kcal</Text>
          </Grid>
        </Grid>
        {/* 기록 칼로리 리스트 */}
        <List>
          {record?.map((r, idx) => {
            return <DashBoard_FoodItem key={r._id} {...r}/>
          })}
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