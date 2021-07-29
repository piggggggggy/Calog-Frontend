import React, { useEffect, useState } from 'react';
import Kakao from '../components/social/Kakao';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { LoginSV, LoginCheck, _logOut } from '../redux/modules/user';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 로그인
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 최지혁
*/

const Login = (props) => {
const dispatch = useDispatch();

const [user_info, setUserInfo] = useState({});
console.log(user_info)
const loginDB = () => {
  dispatch(LoginSV(user_info))
}

const logoutDB = () => {
  dispatch(_logOut())
}

useEffect(() => {
  dispatch(LoginCheck());
  console.log(document.cookie.split("=")[1])
}, [])

  return (
    <React.Fragment>
      {/* <Container>
        <h1>로그인 페이지</h1>
        <Grid width="30%">
        <Text>이메일</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, email: e.target.value})}}/>
        </Grid>
        <Grid width="30%">
        <Text>비밀번호</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, password: e.target.value})}}/>
        </Grid>
        <Button width="30%" bg="#9be7ff" margin="10px 0px"
        _onClick={loginDB}>로그인</Button>
        <Button width="30%" bg="#9be7ff" margin="10px 0px"
        _onClick={logoutDB}>로그아웃</Button>
        </Container> */}
        <Container>
        <BgTop>
          <TextDiv>
          <Text bold="5px" size="28px">
            칼로리즈<br/>
            로그인
          </Text>
          <Text size="15px" margin="20px 0px 0px 0px">
            지금 로그인하면 손쉽게 칼로리 분석 가능!
          </Text>
          </TextDiv>
        </BgTop>
        <InputContainer>
        <InputBox>
            <Button></Button>
            <Input width="240px" border="none" placeholder="이메일을 입력해주세요"
            _onChange={(e)=>{setUserInfo({...user_info, email: e.target.value})}}/>
            <Button></Button>
        </InputBox>
        <InputBox>
            <Button></Button>
            <Input width="240px" border="none" placeholder="비밀번호를 입력해주세요"
            _onChange={(e)=>{setUserInfo({...user_info, password: e.target.value})}}/>
            <Button></Button>
          </InputBox>
        <InputBox>
        <Button width="69vw" height="46px" bg="#FFA573" border_radius="26px" _onClick={loginDB}>
          <Text bold="5px" size="17px" color="#FFFFFF">로그인</Text>
        </Button>
        </InputBox>
        <Text size="12px" margin="0px 0px 20px 0px">아이디 찾기 / 비밀번호 찾기</Text>
        <Text size="12px">회원가입하기</Text>
        </InputContainer>
        <SocialDiv>
          <Text>소셜 로그인</Text>
        </SocialDiv>
        </Container>
    </React.Fragment>
  );
}


export default Login;

const Container = styled.div`
  height: 896px;
  /* overflow-y: scroll; */
  width: 420px;
`;

const BgTop = styled.div`
  background-color: #FFE999;
  height: 359px;
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;
`;

const InputBox = styled.div`
  width: 290px;
  height: 46px;
  background-color: #FFFFFF;
  border: 1px solid #FFA573;
  border-radius: 26px;
  display: flex;
  align-items: center;
  margin: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -47px;
`;

const TextDiv = styled.div`
  padding: 15vh 20px 0px 20px;
`;

const SocialDiv = styled.div`
  display: flex;
  margin-top: 10vh;
`;