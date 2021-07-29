import React from 'react';
import Kakao from '../components/social/Kakao';
import { Input, Grid, Button } from '../elements';
import styled from 'styled-components';
import { SetUser } from '../redux/modules/user';
import { useDispatch } from 'react-redux';
import { SetUserCheck } from '../redux/modules/user';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Signup = (props) => {
// dispatch
const dispatch = useDispatch();
const clickDispatch = () => {
  // dispatch(SetUserCheck())
  const user_info = {username:"jeehyuk"}
  dispatch(SetUser(user_info))
}
// props
// useEffect


  return (
    <React.Fragment>
      <Container>
        <h1>로그인 페이지</h1>
        <Grid display="flex" jc="center" width="30%">
        <Input padding="10px" border_radius="26px"/>
        </Grid>
        <Grid display="flex" jc="center" width="30%">
        <Input padding="10px" border_radius="26px"/>
        </Grid>
        <Grid display="flex" jc="center" width="30%">
        <Input padding="10px" border_radius="26px"/>
        </Grid>
        <button onClick={clickDispatch}>디스패치</button>
        </Container>
    </React.Fragment>
  );
}


export default Signup;

const Container = styled.div`
  background-color: #eee;
  height: 896px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
