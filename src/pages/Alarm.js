import React from 'react';

import { history } from '../redux/configStore';

import styled from 'styled-components';
import { Grid, Text } from '../elements';

import {Back} from "../img/svg";

/**
 * @param {*} props
 * @returns 알람 on/off 페이지
 * @역할 알람 on/off
 * @필수값 
 * @담당자 : 성수
*/

const Alarm = () => 
{

  
  return (
    <React.Fragment>
      <Container>
          <Head>

            <div
            onClick={()=>
              {
                history.push("/body")
              }
            }>
              <Hover>{Back}</Hover>
            </div>

            <Text size="17px" lineheight="22px" bold color="#000000">
              알람
            </Text>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br/>
          </Head>

          <hr color="#F5F5F5"/>

          <Grid display="flex" padding="20px 15px" jc="space-between">
            <Text size="17px" lineheight="22px" margin="10px">
              푸시 알림
            </Text>
            {/* <PushBtn><Circle/></PushBtn> */}
            <ClickBtn><ClickCircle/></ClickBtn>
          </Grid>
          
          <hr color="#F5F5F5"/>

      </Container>
    </React.Fragment>
  );
}


export default Alarm;

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 18px 0px 0px 0px;
  padding: 10px;
`;

const Hover = styled.a`
  &:hover{
    cursor: pointer;
  }
`;

// 알람 켰을 때,껐을 때 두 가지 형태
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