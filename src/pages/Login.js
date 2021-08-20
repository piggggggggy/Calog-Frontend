import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { LoginSV } from '../redux/modules/user';

import styled from 'styled-components';
import { Input, Grid, Button, Text } from '../elements';

import {emailCheck, pwdCheck} from "../shared/common";
import {Back, X} from "../img/svg";

/**
 * @param {*} props
 * @returns 로그인 페이지
 * @역할 로그인 페이지
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 성수
*/

const Login = (props) => 
{
  const dispatch = useDispatch();
  const [user_info, setUserInfo] = useState({});

  const login = () => 
  {
    dispatch(LoginSV(user_info));
  };


  return (
    <React.Fragment>
      <Container>
          <Head>
            <div>
            {Back}
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000">
              로그인 하기
            </Text>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Head>
          <Grid m_margin margin="47px 20px 0px 20px" width="90%">
            <Text size="17px" color="#000000" lineheight="22px">
              이메일
            </Text>
            <InputBox>
              <Input border="none" placeholder="이메일을 입력해주세요" bg="#E4E4E4" width="80%" type="text"
              value={user_info.email}
              _onChange={(e)=>
                {
                  setUserInfo({...user_info, email: e.target.value})
                }}
              />
              {/* 이메일 입력+이메일 유효성 검사 통과 시 X 버튼 사라짐 */}
                {user_info.email?emailCheck(user_info.email)?"":X:""}
            </InputBox>
            {/* 이메일 입력+이메일 유효성 검사 통과 시 밑 줄 사라짐 */}
            {user_info.email?
            emailCheck(user_info.email)?
            <Text color="#FFFFFF" size="13px" lineheight="18px">
              *
            </Text>
            :
            <Text color="#F05C5C" size="13px" lineheight="18px">
              *이메일 형식이 올바르지 않습니다.
            </Text>
            :
            <Text color="#FFFFFF" size="13px" lineheight="18px">
              *이메일을 입력해주세요.
            </Text>
            }
          </Grid>
          <Grid margin="47px 20px 0px 20px" width="90%">
            <Text size="17px" color="#000000" lineheight="22px">
              비밀번호
            </Text>
            <InputBox>
              <Input border="none" placeholder="비밀번호를 입력해주세요" bg="#E4E4E4" width="80%" type="password"
              value={user_info.password}
              _onChange={(e)=>
                {
                  setUserInfo({...user_info, password: e.target.value})
                }}
              />
              {/* 비밀번호 입력+비밀번호 유효성 검사 통과 시 X 사라짐 */}
              {user_info.password?pwdCheck(user_info.password)?"":X:""}
            </InputBox>
            {/* 비밀번호 입력+비밀번호 유효성 검사 통과 시 밑 줄 사라짐 */}
            {user_info.password?
            pwdCheck(user_info.password)?
            <Text color="#FFFFFF" size="13px" lineheight="18px">
              *
            </Text>
            :
            <Text color="#F05C5C" size="13px" lineheight="18px">
              *비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
            </Text>
            :
            <Text color="#FFFFFF" size="13px" lineheight="18px">
              *비밀번호를 입력해주세요.
            </Text>
            }
          </Grid>
        {/* 모든 검사 통과 시 로그인 버튼 활성화 */}
        {user_info.password&&user_info.email&&emailCheck(user_info.email)&&pwdCheck(user_info.password)?
        <LoginButton>
          <Grid display="flex" fd="column-reverse" height="100%">
            <Button bg="#FFE899" height="56px" margin="0px"
            _onClick={login}>
              <Text bold color="#404040" size="16px" lineheight="22px">
                로그인 하기
              </Text>
            </Button>
          </Grid>
        </LoginButton>
        :
        <LoginButton>
          <Grid display="flex" fd="column-reverse" height="100%">
            <Button bg="#E4E4E4" height="56px" margin="0px">
              <Text color="#A9A9A9" size="16px" lineheight="22px">
                로그인 하기
              </Text>
            </Button>
          </Grid>
        </LoginButton>
        }
      </Container>
    </React.Fragment>
  );
}


export default Login;


const Container = styled.div`
  scrollbar-width: none;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 400px) {
  height: 100%;
  };
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin: 28px 0px 0px 0px;
`;

const InputBox = styled.div`
  padding: 11px;
  display: flex;
  align-items: center;
  height: 56px;
  background-color: #E4E4E4;
  border-radius: 8px;
`;

const LoginButton = styled.div`
  width: 100%;
  margin-top: 52%;
  @media only screen and (max-width: 400px) {
    max-width: 420px;
  width: 100%;
  bottom: 0;
  position: absolute;
  z-index: 1000;
  };
`;