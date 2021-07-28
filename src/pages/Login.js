import React from 'react';
import Kakao from '../components/social/Kakao';
import { Input } from '../elements';
import styled from 'styled-components';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Login = (props) => {
// dispatch
// props
// useEffect


  return (
    <React.Fragment>
      <Container>
        <h1>로그인 페이지</h1>
        <Input width="100px" padding="10px" border_radius="26px"/>
        <InputB/>
        <Kakao/>
        <Kakao/>
        <Kakao/>
        <Kakao/>
        <Kakao/>
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
  justify-content: space-between;
  align-items: center;
`;

const InputB = styled.input`
  width: 100px;
`;