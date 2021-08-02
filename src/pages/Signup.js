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
                  {/* <Input border="none" placeholder="이메일을 입력해주세요"
            _onChange={(e)=>{debounceEmail(e)}}
            />
                        <Input border="none" placeholder="닉네임을 입력해주세요"
            _onChange={(e)=>{debounceNick(e)}}
            />
                        <Input border="none" placeholder="비밀번호를 입력해주세요"
            _onChange={(e)=>{setUserInfo({...user_info, password: e.target.value})}}
            />
                        <Input border="none" placeholder="비밀번호를 다시 입력해주세요"
            _onChange={(e)=>{setUserInfo({...user_info, pwdcheck: e.target.value})}}
            />
                    <Button width="100%" height="46px" bg="#FFA573" border_radius="26px" _onClick={Signup}>
          <Text bold="5px" size="17px" color="#FFFFFF">회원가입</Text>
        </Button>
        {dupliEmail?CheckE:Xemoti} */}
      <Container>
          <Head>
            {/* <></> */}
            {"<"}
            <Text size="17px" lineheight="22px" bold color="#000000" >이메일로 가입</Text>
          </Head>

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
  margin: 28px 0px 0px 0px;
`;