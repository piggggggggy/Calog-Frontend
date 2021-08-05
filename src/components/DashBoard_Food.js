import React from 'react';
import {Button, Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//컴포넌트
import DashBoard_FoodItem from './DashBoard_FoodItem';
import DashBoard_When from './DashBoard_When';
//데이터
import {useSelector} from 'react-redux';
//history
import {history} from '../redux/configStore';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : dashboard 기록한 칼로리 상세 리스트를 확인하는 컴포넌트(오늘 날짜)
 * @필수값 : 각 끼니마다의 칼로리 목록(foodRecords)
 * @담당자 : 김나영
*/

const DashBoard_Food = (props) => {

  const record = props[0]

  //각 type에 따른 칼로리의 합계
  const data_kcal = useSelector((state) => state.record.kcal)

  if(record?.length > 0) {
    return (
      <React.Fragment>
        {/* type 버튼 */}
        <Grid margin="9.8% 0 0 0" m_margin="9.8% 0 0 0">
          <DashBoard_When {...props}/>
        </Grid>
        {/* 총 칼로리 */}
        <Grid margin="4.7% 0 0 8%" width="35%" m_margin="4.7% 0 0 8%">
          <Button height="36px" border_radius="20px" bg={theme.color.light}>
            <Text size="20px" bold m_size="17px" color={'#6993FF'}>총 {data_kcal}kcal</Text>
          </Button>
        </Grid>
        {/* 기록 칼로리 리스트 */}
        <List>
          {record?.map((r, idx) => {
            return <DashBoard_FoodItem key={r._id} {...r}/>
          })}
        </List>
      </React.Fragment>
  )}

  return (
    <React.Fragment>
      <Grid width="88%" height="204px" bg={'rgba(255, 232, 153, 0.14)'} border_radius="15px" margin="4.5% auto 0 auto" m_margin="4.5% auto 0 auto">
        <Grid width="51%" margin="0 auto" m_margin="0 auto" padding="11% 0 0 0" line_height="120%">
          <Text size="15px" m_size="13px">오늘의 칼로리를 등록하고<br/>나의 식단을 기록해보세요!</Text>
        </Grid>
        <Grid margin="7% auto" width="94%" m_margin="7% auto">
          <Button
            _onClick={() => history.push('/')}
            height="56px" border_radius="60px" bg={theme.color.light}>
            <Text size="16px" bold m_size="14px">칼로리 등록하기</Text>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const List = styled.div`
  height: auto;
  padding: 4.8% 8% 0 8%;
`;

export default DashBoard_Food;