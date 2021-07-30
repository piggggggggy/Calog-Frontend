import React, { useEffect, useState } from 'react';
import Kakao from '../components/social/Kakao';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const SignSocial = (props) => {
const dispatch = useDispatch();

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
        <Button width="100%" height="46px" bg="#FFA573" border_radius="26px">
          <Text bold="5px" size="17px" color="#79CF6B">네이버 로그인</Text>
        </Button>
        </InputBox>
        <InputBox>
        <Button width="100%" height="46px" bg="#FFA573" border_radius="26px">
          <Text bold="5px" size="17px" color="#E05148">구글 로그인</Text>
        </Button>
        </InputBox>
        <InputBox>
        <Button width="100%" height="46px" bg="#FFA573" border_radius="26px">
          <Text bold="5px" size="17px" color="#F4E167">카카오 로그인</Text>
        </Button>
        </InputBox>

        <InputBox>
        <Button width="100%" height="46px" bg="#FFA573" border_radius="26px">
          <Text bold="5px" size="17px" color="#FFFFFF">홈페이지 회원가입</Text>
        </Button>
        </InputBox>
        </InputContainer>
      </Container>
    </React.Fragment>
  );
}


export default SignSocial;

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
