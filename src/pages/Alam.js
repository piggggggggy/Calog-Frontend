import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {Back} from "../img/svg";
import { history } from '../redux/configStore';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Alam = (props) => {
const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Container>
          <Head>
            <div onClick={()=>{history.push("/body")}}>
            <Tag>{Back}</Tag>
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000">알람</Text>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/>
          </Head>
          <hr color="#F5F5F5"/>
          <Grid display="flex" padding="20px 10px" jc="space-between">
          <Text size="17px" lineheight="22px" margin="10px">푸시 알림</Text>
          <PushBtn><Circle/></PushBtn>
          <ClickBtn><ClickCircle/></ClickBtn>
          </Grid>
          <hr color="#F5F5F5"/>

      </Container>
    </React.Fragment>
  );
}


export default Alam;

const Container = styled.div`
  height: 866px;
  width: 420px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 28px 0px 0px 0px;
`;

const Tag = styled.a`
  &:hover{
    cursor: pointer;
  }
`;

const PushBtn = styled.div`
  background-color: #C4C4C4;
  width: 40px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
`;

const Circle = styled.div`
  background-color: #FFFFFF;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  margin-left: 2px;
`;

const ClickBtn = styled.div`
  background-color: #FCE186;
  width: 40px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
`;

const ClickCircle = styled.div`
    background-color: #FFFFFF;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  margin-right: 2px;
`;