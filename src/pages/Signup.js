import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SignupSV, EmailDuplicate, NickDuplicate } from '../redux/modules/user';
import { PeopleE, Xemoti, LockE, CheckE } from '../img/svg';
import _ from 'lodash';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Signup = (props) => {
  localStorage.setItem('key', JSON.stringify({ a: 'b' }));
  const a =localStorage.getItem('key');
  console.log(a);
const dispatch = useDispatch();
const dupliEmail = useSelector((state)=>state.user.email_dupli)
const dupliNick = useSelector((state)=>state.user.nick_dupli)
const [user_info, setUserInfo] = useState({});
console.log(user_info);
console.log(dupliEmail);
console.log(dupliNick);

useEffect(() => {
const debounce = _.debounce(() => {
  dispatch(EmailDuplicate(user_info.email));
}, 100);
debounce()
}, [user_info.email])

useEffect(() => {
  const debounce = _.debounce(() => {
    dispatch(NickDuplicate(user_info.nickname));
  }, 100);
  debounce()
  }, [user_info.nickname])

const Signup = () => {
  dispatch(SignupSV(user_info));
}

const debounceEmail = _.debounce((e) => {
  setUserInfo({...user_info, email: e.target.value})
}, 600);

const debounceNick = _.debounce((e) => {
  setUserInfo({...user_info, nickname: e.target.value})
}, 600);


  return (
    <React.Fragment>
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
            _onChange={(e)=>{debounceEmail(e)}}
            />
            {dupliEmail?CheckE:Xemoti}
        </InputBox>
        {dupliEmail?
        <Text color="#79CF6B" size="11px" margin="-5px">사용가능한 이메일입니다.</Text>:
        <Text color="#DE5A5A" size="11px" margin="-5px">사용불가능한 이메일입니다.</Text>}
        <InputBox>
            {PeopleE}
            <Input border="none" placeholder="닉네임을 입력해주세요"
            _onChange={(e)=>{debounceNick(e)}}
            />
            {dupliNick?CheckE:Xemoti}
        </InputBox>
        {dupliNick?
        <Text color="#79CF6B" size="11px" margin="-5px">사용가능한 닉네임입니다.</Text>:
        <Text color="#DE5A5A" size="11px" margin="-5px">사용불가능한 닉네임입니다.</Text>}
        <InputBox>
            {LockE}
            <Input border="none" placeholder="비밀번호를 입력해주세요"
            _onChange={(e)=>{setUserInfo({...user_info, password: e.target.value})}}
            />
            {Xemoti}
        </InputBox>
        <InputBox>
            {LockE}
            <Input border="none" placeholder="비밀번호를 다시 입력해주세요"
            _onChange={(e)=>{setUserInfo({...user_info, pwdcheck: e.target.value})}}
            />
            {Xemoti}
        </InputBox>

        <InputBox>
        <Button width="100%" height="46px" bg="#FFA573" border_radius="26px" _onClick={Signup}>
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