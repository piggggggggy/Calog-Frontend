import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BodySpectSV, LoginCheck } from '../redux/modules/user';
import { ProfileDefault, Camera, Pen, Go } from '../img/svg';
import { _logOut } from '../redux/modules/user';
import {history} from '../redux/configStore';
import _ from 'lodash';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const BodySpect = (props) => {
const dispatch = useDispatch();
const is_login = useSelector(state=>state.user.is_login);
const logout = () => {
  dispatch(_logOut());
}
// const [bodyInfo,setBodyInfo] = useState({});
// const {gender, weight, height, age, control} = bodyInfo;
// const bodyStore = () => {
//     dispatch(BodySpectSV(gender, weight, height, age, control));
// }
useEffect(() => {
  dispatch(LoginCheck());
}, []);

  if(!is_login){
  return (
    <React.Fragment>
      <Container>
      <Profile>
          {ProfileDefault}
          </Profile>
          <Bottombg>
            
            <hr color="#FFE899"/>
            <div onClick={()=>{history.push("/signsocial")}}>
            <Grid display="flex">
            <Text bold lineheight="34px" size="28px" margin="92px 0px 16px 24px"><Tag>회원가입/로그인하기</Tag></Text>
            <Text  margin="92px 0px 16px 0px">{Go}</Text>
            </Grid>
            </div>
            <Text lineheight="22px" size="17px" color="#8C8C8C" margin="24px 0px 24px 24px">회원이 되어 칼로리스 서비스를 <br/> 자유롭게 이용해보세요!</Text>
            <hr color="#F5F5F5"/>
            <Text lineheight="22px" size="17px" color="#000000"  margin="24px 0px 24px 20px"><Tag>공지사항</Tag></Text>
            <hr color="#F5F5F5"/>
            <Text lineheight="22px" size="17px" color="#000000"  margin="24px 0px 24px 20px"><Tag>알림</Tag></Text>
            <hr color="#F5F5F5"/>
            <Text lineheight="22px" size="17px" color="#000000"  margin="24px 0px 24px 20px"><Tag>의견 보내기</Tag></Text>
            <hr color="#F5F5F5"/>
            <Version>
            <Text lineheight="22px" size="17px" color="#A9A9A9"  margin="24px 0px 24px 20px">현재 버전</Text>
            <Text size="17px" margin="27px 20px 24px 0px" color="#F19F13">V9.9.9</Text>
            </Version>
            <hr color="#F5F5F5"/>
          </Bottombg>
      </Container>
    </React.Fragment>
  );
}
return (
  <React.Fragment>
    <Container>
    <Profile>
        {ProfileDefault}
    </Profile>
    <Cameradiv>
    {Camera}
    </Cameradiv>
        <Bottombg>
          <hr color="#FFE899"/>
          <Text bold lineheight="34px" size="28px" margin="92px 0px 16px 24px">최지혁</Text>
          <BodyBox>
            <Text margin="30px">신체 정보를 등록하고<br/> 나의 기초대사량을 알아보세요!</Text>
            <Button border_radius="12px" bg="#FFE899" width="348px" height="56px">
              <Text lineheight="22px" size="16px" bold>신체정보 등록하기</Text>
            </Button>
          </BodyBox>
          <hr color="#F5F5F5"/>
          <Text lineheight="22px" size="17px" color="#000000"  margin="24px 0px 24px 20px"><Tag>공지사항</Tag></Text>
          <hr color="#F5F5F5"/>
          <Text lineheight="22px" size="17px" color="#000000"  margin="24px 0px 24px 20px"><Tag>알림</Tag></Text>
          <hr color="#F5F5F5"/>
          <Text lineheight="22px" size="17px" color="#000000"  margin="24px 0px 24px 20px"><Tag>의견 보내기</Tag></Text>
          <hr color="#F5F5F5"/>
          <Version>
          <Text lineheight="22px" size="17px" color="#A9A9A9"  margin="24px 0px 24px 20px">현재 버전</Text>
          <Text size="17px" margin="27px 20px 24px 0px" color="#F19F13">V9.9.9</Text>
          </Version>
          <hr color="#F5F5F5"/>
          <div onClick={logout}>
          <Text lineheight="22px" size="17px" color="#A9A9A9"  margin="24px 0px 24px 20px"><Tag>로그아웃</Tag></Text>
          </div>
          <hr color="#F5F5F5"/>
          <br/>
        </Bottombg>
    </Container>
  </React.Fragment>
);
}


export default BodySpect;

const Container = styled.div`
  padding-top: 120px;
  height: 866px;
  width: 420px;
  background-color: #FFE999;
  overflow-y: hidden;
`;

const Bottombg = styled.div`
  width: 420px;
  height: 746px;
  background-color: #FFFFFF;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const Profile = styled.div`
  position: absolute;
  margin-top: -61px;
  margin-left: 20px;
`;

const Version = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BodyBox = styled.div`
  width: 380px;
  height: 170px;
  margin: auto;
  margin-bottom: 32px;
  background-color: rgba(255, 232, 153, 0.2);
  border: 1px solid #FFE899;
  border-radius: 12px;
`;

const Cameradiv = styled.div`
  position: absolute;
  margin: 30px 0px 0px 110px;
`;

const Tag = styled.a`
  &:hover{
    cursor: pointer;
  }
`;