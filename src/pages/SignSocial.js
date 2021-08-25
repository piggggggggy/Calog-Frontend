import React from 'react';

import { history } from '../redux/configStore';

import styled from 'styled-components';
import { Grid, Button, Text } from '../elements';

import {Close} from "../img/svg";

/** 
 * @param {*} props
 * @returns 소셜 로그인 페이지
 * @역할 소셜 로그인 페이지
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 성수
*/

const SignSocial = () => {


  return (
    <React.Fragment>
      <Container>
        <Grid display="flex" fd="row-reverse" padding="20px">
          <Hover>
            {Close}
          </Hover>
        </Grid>
        <Header>
          <Text m_size="27px" size="34px" lineheight="41px">회원가입/로그인하고</Text>
          <Text m_size="27px" size="34px" lineheight="41px" bold>내 칼로리 관리해보세요!</Text>
        </Header>

        <InputContainer>
          <InputBox>
          
            <Button width="380px" height="56px" bg="#F9DF4A" border_radius="44px"
            _onClick={()=>{window.location.href='https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2F2k1.shop%2Fapi%2Fauth_kakao%2Foauth&client_id=1f8c2e0458ce362b52f0a86f8e15dc83'}}>
              <Hover><Text m_size="16px" bold size="16px" lineheight="22px" color="#42282A">카카오로 시작하기</Text></Hover>
            </Button>
          </InputBox>

          <InputBox>
            <Button width="380px" height="56px" bg="#E2635E" border_radius="44px"
            _onClick={()=>{window.location.href = 'https://2k1.shop/api/auth_google/google';}}>
              <Hover><Text m_size="16px" bold size="16px" lineheight="22px" color="#FFFFFF">구글로 시작하기</Text></Hover>
            </Button>
          </InputBox>

          <InputBox>
            <Button width="380px" height="56px" bg="#59C451" border_radius="44px"
            _onClick={()=>{window.location.href = "https://nid.naver.com/oauth2.0/authorize?response_type=code&redirect_uri=https%3A%2F%2F2k1.shop%2Fapi%2Fauth_naver%2Foauth&client_id=pDmnerWgsXOSSsgzvfim";}}>
              <Hover><Text m_size="16px" bold size="16px" lineheight="22px" color="#FFFFFF">네이버로 시작하기</Text></Hover>
            </Button>
          </InputBox>

          <Grid margin="41px 0px 24px 0px" width="30px">
            <Text m_size="10px" size="13px" lineheight="18px" color="#C5C5C5">또는</Text>
          </Grid>
        </InputContainer>

        <Grid dislpay="flex" ai="flex-end" >
          <Text m_size="13px" size="13px" lineheight="18px" color="#8C8C8C" width="200px">
            &nbsp;
            <Hover onClick={()=>{history.push("/login")}}>이메일로 로그인</Hover>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Hover onClick={()=>{history.push("/signup")}}>이메일로 가입</Hover>
           </Text>
        </Grid>
      </Container>
    </React.Fragment>
  );
}


export default SignSocial;


const Container = styled.div`
  height: 800px;
  overflow-y: hidden;
  @media only screen and (max-width: 400px) {
  height: 100%;
  };
`;

const InputBox = styled.div`
  width: 90%;
  height: 56px;
  border-radius: 44px;
  display: flex;
  align-items: center;
  margin: 4px;
  &:hover{
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50%;
  margin-bottom: -50px;
  @media only screen and (max-width: 400px) {
  margin-top: 10%;
  };
`;

const Hover = styled.a`
  &:hover{
    cursor: pointer;
  }
`;

