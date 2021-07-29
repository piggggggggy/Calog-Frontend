import React, { useState } from 'react';
import Kakao from '../components/social/Kakao';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { LoginDB } from '../redux/modules/user';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 로그인
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 최지혁
*/

const Login = (props) => {
// dispatch
const dispatch = useDispatch();

const [user_info, setUserInfo] = useState({});

const clickDispatch = () => {
  dispatch(LoginDB(user_info))
}


  return (
    <React.Fragment>
      <Container>
        <h1>로그인 페이지</h1>
        <Grid width="30%">
        <Text>이메일</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, email: e.target.value})}}/>
        </Grid>
        <Grid width="30%">
        <Text>비밀번호</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, pwd: e.target.value})}}/>
        </Grid>
        <Button width="30%" bg="#9be7ff"
        _onClick={clickDispatch}>로그인</Button>
        </Container>
    </React.Fragment>
  );
}


export default Login;

const Container = styled.div`
  background-color: #eee;
  height: 896px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
