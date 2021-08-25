import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';

import { storage } from '../shared/firebase';

import styled from 'styled-components';
import { Grid, Button, Text } from '../elements';

import { ProfileDefault, Camera, Go } from '../img/svg';

import { _logOut, ProfileSV } from '../redux/modules/user';

// helmet
import {Helmet} from 'react-helmet';

/** 
 * @param {*} props
 * @returns 마이 페이지
 * @역할 마이 페이지
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 성수
*/

const BodySpec = (props) => 
{
  const dispatch = useDispatch();
  const is_login = useSelector(state=>state.user.is_login);
  const user_info = useSelector(state=>state.user.user_info);

  const profile = useRef();
  
  const store_profile = () => {
    const profile_url = profile.current.files[0];

    const _upload = storage
    .ref(`profiles/${profile_url.name}${new Date().getTime()}`)
    .put(profile_url);
  _upload
  .then((snap) => {
    snap.ref.getDownloadURL()
    .then((url) => {
      dispatch(ProfileSV(url));
    })
    .catch((err)=>{window.alert("업로드에 실패했습니다!")});
  });
  }

  const gender = user_info?.gender;
  const age = user_info?.age;
  const height = user_info?.height;
  const weight = user_info?.weight;

  const logout = () => {
    dispatch(_logOut());
  }

  if(!is_login){
  return (
    <React.Fragment>
      {/* 헬멧 */}
      <Helmet>
        <title>[Calog] 칼로그 로그인/회원가입</title>
      </Helmet>

      <Container>
        <Profile>
          {ProfileDefault}
        </Profile>
            
          <Bottombg>
            <hr color="#FFE899"/>
            <div onClick={()=>{history.push("/signsocial")}}>
              <Grid display="flex">
                <Text m_size="28px" bold lineheight="34px" size="28px" margin="92px 0px 16px 24px">
                  <Hover>
                    회원가입/로그인하기
                  </Hover>
                </Text>
                <Text margin="92px 0px 16px 0px">
                  {Go}
                </Text>
              </Grid>
            </div>

            <Text lineheight="22px" size="17px" color="#8C8C8C" margin="24px 0px 24px 24px">
              회원이 되어 칼로리스 서비스를 <br/> 자유롭게 이용해보세요!
            </Text>
            <hr color="#F5F5F5"/>
            <Text lineheight="22px" size="17px" color="#000000" margin="24px 0px 24px 20px">
              <Hover onClick={()=>
                {
                  history.push("/notice")
                }}>공지사항
              </Hover>
            </Text>
            {/* <hr color="#F5F5F5"/>
            <Text lineheight="22px" size="17px" color="#000000" margin="24px 0px 24px 20px">
              <Tag onClick={()=>
                {
                  history.push("/alam")
                }}>
                  알림
              </Tag>
            </Text> */}
            <hr color="#F5F5F5"/>
            <Version>
              <Text lineheight="22px" size="17px" color="#A9A9A9" margin="15px 0px 15px 20px">
                현재 버전
              </Text>
              <Text size="17px" margin="17px 20px 15px 0px" color="#F19F13">
                V1.0.0
              </Text>
            </Version>
            <hr color="#F5F5F5"/>
          </Bottombg>
      </Container>
    </React.Fragment>
  );
}
return (
  <React.Fragment>
    {/* 헬멧 */}
    <Helmet>
      <title>[Calog] 마이페이지</title>
      <meta property="og:title" content="[Calog] 마이페이지"/>
      <meta property="og:description" content="공지사항, 알림, 의견 보내기를 할 수 있어요!" />
      <meta property="og:image" content="%PUBLIC_URL%/icons/helmet.png" />
    </Helmet>

    <Container>
    <Profile>
      {user_info.profile_image==="없음"?ProfileDefault:
      <img style={{width: "124px", height: "124px", borderRadius: "50%"}} src={user_info?.profile_image}/>
      }
    </Profile>

      <label htmlFor="profile_img">
      <Cameradiv>
      {Camera}
      </Cameradiv>
      <File_box type="file" id="profile_img" ref={profile} multiple onChange={store_profile}
      />
      </label>

        <Bottombg>
          <hr color="#FFE899"/>
          <Text m_size="23px" bold lineheight="34px" size="28px" margin="92px 0px 16px 42px">
            {user_info?.nickname}
          </Text>

        <BodyBox>
          <Text margin="30px">
            신체 정보를 등록하고<br/> 나의 기초대사량을 알아보세요!
          </Text>
          
          <Button border_radius="12px" bg="#FFE899" width="80%" height="56px"
          _onClick={()=>
            {
              history.push("/addspec")
            }}>
          <Hover>
            <Text lineheight="22px" size="16px" bold>
              {gender&&age&&height&&weight?"신체정보 수정하기":"신체정보 등록하기"}
            </Text>
          </Hover>
          </Button>
        </BodyBox>

          <hr color="#F5F5F5"/>
          <Text lineheight="22px" size="17px" color="#000000" margin="24px 0px 24px 20px">
            <Hover onClick={()=>
              {
                history.push("/notice")
              }}>
                공지사항
            </Hover>
          </Text>
          {/* <hr color="#F5F5F5"/>
          <Text lineheight="22px" size="17px" color="#000000" margin="24px 0px 24px 20px">
            <Hover onClick={()=>
              {
                history.push("/alam")
              }}>
              알림
            </Hover>
          </Text> */}
          <hr color="#F5F5F5"/>
          <Text lineheight="22px" size="17px" color="#000000" margin="24px 0px 24px 20px">
                <Hover onClick={()=>
              {
                history.push("/userfeedback")
              }}>
              의견 보내기
            </Hover>
          </Text>
          <hr color="#F5F5F5"/>

          <Version>
            <Text lineheight="22px" size="17px" color="#A9A9A9" margin="15px 0px 15px 20px">
              현재 버전
            </Text>
            <Text size="17px" margin="17px 20px 15px 0px" color="#F19F13">
              V1.0.0
            </Text>
          </Version>
          <hr color="#F5F5F5"/>
          <div onClick={logout}>
            <Text lineheight="22px" size="17px" color="#A9A9A9" margin="24px 0px 24px 20px">
              <Hover>
                로그아웃
              </Hover>
            </Text>
          </div>
          <hr color="#F5F5F5"/>
          <br/>
        </Bottombg>
      </Container>
    </React.Fragment>
  );
}


export default BodySpec;

const Container = styled.div`
  padding-top: 120px;
  height: 100%;
  width: 100%;
  background-color: #FFE999;
`;

const Bottombg = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin-top: -18%;
  @media only screen and (max-width: 400px){
    margin-top: -20%;
  height: 100%;
  }
`;

const Profile = styled.div`
  margin-top: -14%;
  margin-left: 20px;
  @media only screen and (max-width: 320px){
    margin-top: -22%;
    
  }

`;

const Version = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BodyBox = styled.div`
  width: 80%;
  height: 170px;
  margin: auto;
  margin-bottom: 32px;
  background-color: rgba(255, 232, 153, 0.2);
  border: 1px solid #FFE899;
  border-radius: 12px;
`;

const Cameradiv = styled.div`
  position: absolute;
  margin: -35px 0px 0px 110px;
  &:hover{
    cursor: pointer;
  }
`;

const Hover = styled.a`
  &:hover{
    cursor: pointer;
  }
`;

const File_box = styled.input`
  display: none;
`;
