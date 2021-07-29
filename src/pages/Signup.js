import React, { useState } from 'react';
import Kakao from '../components/social/Kakao';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
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
// userinfo hooks
const [user_info, setUserInfo] = useState({});
console.log(user_info)

  return (
    <React.Fragment>
      <Container>
        <h1>회원가입 페이지</h1>

        <Grid width="30%">
        <Text>이메일</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, email: e.target.value})}}/>
        </Grid>

        <Grid width="30%">
        <Text>닉네임</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, nickname: e.target.value})}}/>
        </Grid>

        <Grid  width="30%">
        <Text>비밀번호</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, pwd: e.target.value})}}/>
        </Grid>

        <Grid  width="30%">
        <Text>비밀번호 확인</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, pwdcheck: e.target.value})}}/>
        </Grid>

        {/* <button onClick={clickDispatch}>디스패치</button> */}
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
