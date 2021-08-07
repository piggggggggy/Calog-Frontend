import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSV } from '../redux/modules/user';
import {emailCheck, pwdCheck, pwdDupli, NickCheck} from "../shared/common";
import {Back, X} from "../img/svg";
import _ from 'lodash';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Signup = (props) => {
const dispatch = useDispatch();
const [user_info, setUserInfo] = useState({});



const login = () => {
  dispatch(LoginSV(user_info));
};

  return (
    <React.Fragment>
      <Container>
          <Head>
            <div>
            {Back}
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000" >로그인 하기</Text>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Head>
          <Grid margin="47px 20px 0px 20px" width="380px">
          <Text size="17px" color="#000000" lineheight="22px">이메일</Text>
          <InputBox>
          <Input border="none" placeholder="이메일을 입력해주세요" bg="#E4E4E4" width="300px" type="text" value={user_info.email}
            _onChange={(e)=>{setUserInfo({...user_info, email: e.target.value})}}
            />
            {/* {user_info.email?dupliEmail?"":X:""} */}
            {user_info.email?emailCheck(user_info.email)?"":X:""}
          </InputBox>
          {user_info.email?
        emailCheck(user_info.email)?
        <Text color="#FFFFFF" size="13px" lineheight="18px">*</Text>
        :
        <Text color="#F05C5C" size="13px" lineheight="18px">*이메일 형식이 올바르지 않습니다.</Text>
        :
        <Text color="#FFFFFF" size="13px" lineheight="18px">*이메일을 입력해주세요.</Text>
        }
          </Grid>
          <Grid margin="47px 20px 0px 20px" width="380px">
          <Text size="17px" color="#000000" lineheight="22px" >비밀번호</Text>
          <InputBox>
          <Input border="none" placeholder="비밀번호를 입력해주세요" bg="#E4E4E4" width="300px" type="password" value={user_info.password}
             _onChange={(e)=>{setUserInfo({...user_info, password: e.target.value})}}
            />
          {user_info.password?pwdCheck(user_info.password)?"":X:""}
          </InputBox>
          {user_info.password?pwdCheck(user_info.password)?<Text color="#FFFFFF" size="13px" lineheight="18px">*</Text>:
          <Text color="#F05C5C" size="13px" lineheight="18px">*비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이내로 입력해주세요.</Text>:
          <Text color="#FFFFFF" size="13px" lineheight="18px">*비밀번호를 입력해주세요.</Text>
          }
          </Grid>

          <Grid display="flex" fd="row-reverse">
          <Text color="#8C8C8C" size="15px" lineheight="20px" width="95px" margin="10px">비밀번호 재설정</Text>
          </Grid>

          {user_info.password&&user_info.email&&emailCheck(user_info.email)&&pwdCheck(user_info.password)?
                    <Grid display="flex" fd="column-reverse" height="100%">
                    <Button bg="#FFE899" height="56px" margin="0px"
                    _onClick={login}>
                      <Text bold color="#404040" size="16px" lineheight="22px">로그인 하기</Text>
                    </Button>
                    </Grid>
                    :
                    <Grid display="flex" fd="column-reverse" height="100%">
                    <Button bg="#E4E4E4" height="56px" margin="0px">
                      <Text color="#A9A9A9" size="16px" lineheight="22px">로그인 하기</Text>
                    </Button>
                    </Grid>
        }

      </Container>
    </React.Fragment>
  );
}


export default Signup;

const Container = styled.div`
  height: 866px;
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
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