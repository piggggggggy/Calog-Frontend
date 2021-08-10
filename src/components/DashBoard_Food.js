import React from 'react';
import {Button, Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// 컴포넌트
import DashBoard_FoodItem from './DashBoard_FoodItem';
import DashBoard_When from './DashBoard_When';

// 데이터
import {useSelector} from 'react-redux';

// history
import {history} from '../redux/configStore';

/** 
 * @param {list} r
 * @returns {list} r 유저가 기록한 foodRecords의 리스트를 반환
 * @역할 : 유저가 기록한 칼로리 상세 리스트를 확인하는 대시보드의 컴포넌트(
 * @필수값 : 각 끼니마다의 칼로리 목록(foodRecords)
 * @담당자 : 김나영
*/

const DashBoard_Food = (props) => {
  const record = props[0];

  // 각 type에 따른 칼로리의 합계
  const data = useSelector((state) => state.record.record[0]);
  
  // 로그인 유무 체크
  const is_login = useSelector((state) => state.user.is_login);

  // case1) 기록이 있을 경우
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
            <P>총 {data?.totalCalories}kcal</P>
          </Button>
        </Grid>

        {/* 기록 칼로리 리스트 */}
        <List>
          {record?.map((r, idx) => {
            return <DashBoard_FoodItem key={r._id} {...r}/>
          })}
        </List>
      </React.Fragment>
  )};

  // case2) 기록이 없을 경우
  return (
    <React.Fragment>

      {/* type 버튼 */}
      <Grid margin="9.7% 0 0 0" m_margin="9.7% 0 0 0">
        <DashBoard_When {...props}/>
      </Grid>

      {/* 칼로리 등록하기 버튼 타이틀 */}
      <Grid width="88%" border_radius="15px" margin="2% auto 0 auto" m_margin="2% auto 0 auto">
        <Grid text_align="center" padding="11% 0 0 0" line_height="120%">
          <Text size="15px" m_size="13px">오늘의 칼로리를 등록하고<br/>나의 식단을 기록해보세요!</Text>
        </Grid>

        {/* case2-1) 유저인데 기록이 없는 경우 */}
        {is_login ? (

          // 칼로리 검색 페이지 이동 버튼
          <Grid margin="6.5% auto" width="94%" m_margin="7% auto">
            <Button
              _onClick={() => history.push('/')}
              height="56px" border_radius="60px" bg={theme.color.light}>
              <Text size="16px" bold m_size="14px">칼로리 등록하기</Text>
            </Button>
          </Grid>
        ) : (

          // case2-2) 비유저여서 기록이 없는 경우
          // 로그인 페이지 이동 버튼
          <Grid margin="6.5% auto" width="94%" m_margin="7% auto">
            <Button
              _onClick={() => history.push('/loading/signsocial')}
              height="56px" border_radius="60px" bg={theme.color.light}>
              <Text size="16px" bold m_size="14px">로그인하기</Text>
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

const List = styled.div`
  height: auto;
  padding: 4.8% 8% 0 8%;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: bold;

  @media ${theme.device.mobileM} {
    font-size: 17px;
  }

  @media only screen and (max-width: 300px) {
    font-size: 12px;
  };
`;

export default DashBoard_Food;