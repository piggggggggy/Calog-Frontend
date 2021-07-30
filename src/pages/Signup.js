import React, { useState } from 'react';
import Kakao from '../components/social/Kakao';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SignupSV, EmailDuplicate, NickDuplicate } from '../redux/modules/user';
import { PeopleE, Xemoti, LockE, CheckE } from '../img/svg';
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
const Signup = () => {
  dispatch(SignupSV(user_info));
}
const EmailDup = () => {
  dispatch(EmailDuplicate(user_info.email));
}
const NickDup = () => {
  dispatch(NickDuplicate(user_info.nickname));
}

  return (
    <React.Fragment>
      {/* <Container>
        <Grid width="30%">
        <Text>이메일</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, email: e.target.value})}}/>
        <Button bg="#ce93d8" _onClick={EmailDup}>email중복확인</Button>
        </Grid>

        <Grid width="30%">
        <Text>닉네임</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, nickname: e.target.value})}}/>
        <Button bg="#ce93d8" _onClick={NickDup}>nick중복확인</Button>
        </Grid>

        <Grid  width="30%">
        <Text>비밀번호</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, password: e.target.value})}}/>
        </Grid>

        <Grid  width="30%">
        <Text>비밀번호 확인</Text>
        <Input padding="10px" border_radius="26px"
        _onChange={(e)=>{setUserInfo({...user_info, pwdcheck: e.target.value})}}/>
        </Grid>

        <button onClick={Signup}>회원가입</button>
        </Container> */}
                <Container>

        <BgTop>
          <TextDiv>
          <Text bold="5px" size="28px">
            칼로리즈<br/>
            회원가입
          </Text>
          <Text size="15px" margin="20px 0px 0px 0px">
            지금 로그인하면 손쉽게 칼로리 분석 가능!
          </Text>
          </TextDiv>
        </BgTop>
        <InputContainer>
        <InputBox>
            {PeopleE}
            <Input border="none" placeholder="이메일을 입력해주세요"
            />
            {Xemoti}
        </InputBox>
        <InputBox>
            {PeopleE}
            <Input border="none" placeholder="닉네임을 입력해주세요"
            />
            {Xemoti}
        </InputBox>
        <InputBox>
            {LockE}
            <Input border="none" placeholder="비밀번호를 입력해주세요"
            />
            {Xemoti}
        </InputBox>
        <InputBox>
            {LockE}
            <Input border="none" placeholder="비밀번호를 다시 입력해주세요"
            />
            {Xemoti}
        </InputBox>

        <InputBox>
        <Button width="100%" height="46px" bg="#FFA573" border_radius="26px">
          <Text bold="5px" size="17px" color="#FFFFFF">회원가입</Text>
        </Button>
        </InputBox>
        <Text size="12px" margin="0px 0px 20px 0px">아이디 찾기 / 비밀번호 찾기</Text>
        <Text size="12px">회원가입하기</Text>
        </InputContainer>

        </Container>
    </React.Fragment>
  );
}


export default Signup;

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
  /* justify-content: space-around; */
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