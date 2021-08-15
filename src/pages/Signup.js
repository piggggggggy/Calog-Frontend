import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Input, Grid, Button, Text } from '../elements';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import { SignupSV, EmailDuplicate, NickDuplicate } from '../redux/modules/user';

import {emailCheck, pwdCheck, pwdDupli, NickCheck} from "../shared/common";

import {Back, X} from "../img/svg";

import _ from 'lodash';

/**
 * @param {*} props
 * @returns 회원가입 페이지
 * @역할 회원가입 페이지
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 성수
*/

const Signup = () => {
  const dispatch = useDispatch();
  const dupliEmail = useSelector((state)=>state.user.email_dupli);
  const dupliNick = useSelector((state)=>state.user.nick_dupli);
  const [user_info, setUserInfo] = useState({});
  // 비밀번호 최소 글자 + 한,영,숫자 최소1개
  // 닉네임 최소 3글자
  // 입력 전엔 빨간색 글씨 띄우기 X
  // 이메일, 닉네임 중복체크 함수
  useEffect(() => 
  {
    const debounce = _.debounce(() => 
    {
      dispatch(EmailDuplicate(user_info.email));
    }, 10);
    debounce();
  }, [user_info.email]);

  useEffect(() => 
  {
    const debounce = _.debounce(() => 
    {
      dispatch(NickDuplicate(user_info.nickname));
    },10);
    debounce();
  }, [user_info.nickname]);

  const signup = () => 
  {
    dispatch(SignupSV(user_info));
    window.alert("회원가입이 완료되었습니다!");
    history.push("/login");
  };

  const debounceEmail = _.debounce((e) => 
  {
    setUserInfo({...user_info, email: e.target.value})
  }, 600);

  const debounceNick = _.debounce((e) => 
  {
    setUserInfo({...user_info, nickname: e.target.value})
  }, 600);


  return (
    <React.Fragment>
      <Container>
          <Head>
            <div>
              {Back}
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000" >이메일로 가입</Text>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Head>
          <Grid m_margin margin="47px 20px 0px 20px" width="90%">
          <Text size="17px" color="#000000" lineheight="22px">이메일</Text>
          <InputBox>
          <SubInput placeholder="이메일을 입력해주세요" bg="#E4E4E4" width="80%" type="text"
            onChange={(e)=>{debounceEmail(e)}}
            />
            {user_info.email?dupliEmail?"":X:""}
          </InputBox>
          {user_info.email?
                  emailCheck(user_info.email)?
                  dupliEmail?<Text color="#E4E4E4" size="13px" lineheight="18px">*사용가능한 이메일입니다.</Text>:
                  <Text color="#F05C5C" size="13px" lineheight="18px">*이미 존재하는 이메일입니다.</Text>
                  :
                  <Text color="#F05C5C" size="13px" lineheight="18px">*이메일 형식이 올바르지 않습니다.</Text>
        :
        <Text color="#FFFFFF" size="13px" lineheight="18px">*이메일을 입력해주세요.</Text>
        }
          </Grid>
          <Grid margin="47px 20px 0px 20px" width="90%">
          <Text size="17px" color="#000000" lineheight="22px" >비밀번호</Text>
          <InputBox>
          <Input border="none" placeholder="비밀번호를 입력해주세요" bg="#E4E4E4" width="80%" type="password" value={user_info.password}
             _onChange={(e)=>{setUserInfo({...user_info, password: e.target.value})}}
            />
          {user_info.password?pwdCheck(user_info.password)?"":X:""}
          </InputBox>
          {user_info.password?pwdCheck(user_info.password)?<Text color="#E4E4E4" size="13px" lineheight="18px">*사용가능한 비밀번호입니다.</Text>:
          <Text color="#F05C5C" size="13px" lineheight="18px">*비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이내로 입력해주세요.</Text>:
          <Text color="#FFFFFF" size="13px" lineheight="18px">*비밀번호를 입력해주세요.</Text>
          }
          </Grid>

          <Grid margin="47px 20px 0px 20px" width="90%">
          <Text size="17px" color="#000000" lineheight="22px" >비밀번호 확인</Text>
          <InputBox>
          <Input border="none" placeholder="비밀번호를 다시 입력해주세요" bg="#E4E4E4" width="80%" type="password" value={user_info.pwdcheck}
             _onChange={(e)=>{setUserInfo({...user_info, pwdcheck: e.target.value})}}
            />
            {user_info.pwdcheck?pwdDupli(user_info.password, user_info.pwdcheck)?"":X:""}
          </InputBox>
          {user_info.pwdcheck?pwdDupli(user_info.password, user_info.pwdcheck)?<Text color="#E4E4E4" size="13px" lineheight="18px">*비밀번호가 일치합니다.</Text>:
          <Text color="#F05C5C" size="13px" lineheight="18px">*비밀번호가 일치하지 않습니다.</Text>
        :
        <Text color="#FFFFFF" size="13px" lineheight="18px">*비밀번호를 다시 입력해주세요.</Text>}
          </Grid>

          <Grid margin="47px 20px 0px 20px" width="90%">
          <Text size="17px" color="#000000" lineheight="22px">닉네임</Text>
          <InputBox>
          <SubInput border="none" placeholder="닉네임을 입력해주세요" width="100%" type="text"
            onChange={(e)=>{debounceNick(e)}}
            />
            {user_info.nickname?NickCheck(user_info.nickname)?dupliNick?"":X:X:""}
          </InputBox>
          {user_info.nickname?NickCheck(user_info.nickname)?
                    dupliNick?<Text color="#E4E4E4" size="13px" lineheight="18px">*사용가능한 닉네임입니다.</Text>:
                    <Text color="#F05C5C" size="13px" lineheight="18px">*중복된 닉네임입니다.</Text>
          :
          <Text color="#F05C5C" size="13px" lineheight="18px">*닉네임은 2-5자 이내로 입력해주세요.</Text>
          :
          <Text color="#FFFFFF" size="13px" lineheight="18px">*닉네임을 입력해주세요.</Text>}
          </Grid>
          {/* 모든 요소 충족 시 버튼 표시 */}
          {dupliEmail&&dupliNick&&pwdDupli(user_info.password, user_info.pwdcheck)&&pwdCheck(user_info.password)?
          <LoginButton>
          <Grid display="flex" fd="column-reverse" height="100%">
          <Button bg="#FFE899" height="56px" margin="0px"
          _onClick={signup}>
            <Text bold color="#404040" size="16px" lineheight="22px">회원가입 하기</Text>
          </Button>
          </Grid>
          </LoginButton>
          :
          <LoginButton>
          <Grid display="flex" fd="column-reverse" height="100%">
          <Button bg="#E4E4E4" height="56px">
            <Text color="#A9A9A9" size="16px" lineheight="22px">회원가입 하기</Text>
          </Button>
          </Grid>
          </LoginButton>
          }
      </Container>
    </React.Fragment>
  );
}


export default Signup;

const Container = styled.div`
  height: 99%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow-y: hidden; */
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
  justify-content: space-between;
  height: 56px;
  background-color: #E4E4E4;
  border-radius: 8px;
`;

const SubInput = styled.input`
border: none;
background-color:#E4E4E4;
width: 80%;
:focus {
      outline: none;
    }
`;

const LoginButton = styled.div`
  max-width: 420px;
  width: 100%;
  margin-top: 41.6%;
  @media only screen and (max-width: 400px) {
    /* max-width: 420px; */
  width: 100%;
  bottom: 0;
  position: absolute;
  z-index: 1000;
  }
`;