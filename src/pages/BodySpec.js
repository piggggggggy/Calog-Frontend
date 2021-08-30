import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';

import { storage } from '../shared/firebase';

import styled from 'styled-components';
import { Grid, Button, Text, Input } from '../elements';
import theme from '../shared/theme';

import { ProfileDefault, Camera, Go } from '../img/svg';

import { _logOut, ProfileSV, BodySpectSV, ModifyNickSV } from '../redux/modules/user';

// icons
import { GrEdit } from 'react-icons/gr';

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

  const [nickModifyClass, setNickClass] = useState(0);
  const [nickModify, setNick] = useState("");
  const modify_nick = () => {
    if(nickModify===""){
      window.alert("닉네임을 입력해주세요!");
      return;
    };
    setNickClass(0);
    dispatch(ModifyNickSV(nickModify));
  }
  
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
  const bmr = user_info?.bmr[0].bmr;

  // 수정 버튼 클릭 시 수정 모드 변경을 알 수 있는 값
  const [m_height, setHeight] = useState(0);
  const [m_weight, setWeight] = useState(0);

  // 수정해야하는 실제 데이터 값
  const [a_height, AddHeight] = useState("");
  const [a_weight, AddWeight] = useState("");

  const M_height = () => {
    if(m_height===1){
      setHeight(0);
      dispatch(BodySpectSV(gender, weight, a_height, age));
    } else {
      setHeight(1);
    }
  };
  const M_weight = () => {
    if(m_weight===1){
      setWeight(0);
      dispatch(BodySpectSV(gender, a_weight, height, age));
    } else {
      setWeight(1);
    }
  };

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
  
            <hr color="#F5F5F5"/>
            <Version>
              <Text lineheight="22px" size="17px" color="#A9A9A9" margin="15px 0px 15px 20px">
                현재 버전
              </Text>
              <Text size="17px" margin="17px 20px 15px 0px" color="#F19F13">
                V2.0.1
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
          <Grid display="flex" margin="10vh 60% 2.7vh 5.7%" m_margin="10vh 60% 2.7vh 5.7%" width="auto">
            
          {nickModifyClass?
            <div>
              <NickInput type="text" value={nickModify} onChange={(e)=>{setNick(e.target.value)}} width="100%"/>
              <Line_/>
            </div>
          :
            <Text m_size="23px" bold lineheight="34px" size="28px" margin="0">{user_info?.nickname}</Text>
          }
            <EditBtn onClick={()=>{nickModifyClass ? modify_nick() : setNickClass(1)}}>
              <GrEdit/>
            </EditBtn>
          </Grid>
          


      {height||weight?
      <BodySpecBox>
      <ContentBS>
        <Text m_size margin="0px auto 4px auto" color="#2F2F2F" size="12px" line-height="14px">키</Text>
        <Text m_size margin="0px auto 6px auto" color="#111E30" size="13px" line-height="18px" bold>
          {m_height?<BodyInput type="text" value={a_height} onChange={(e)=>Number(e.target.value)||e.target.value===""?AddHeight(e.target.value):window.alert("숫자만 입력해주세요!")}/>:height}CM
        </Text>
        <Text m_size color="#8C8C8C" size="12px" line-height="14.4px"><Hover onClick={M_height}>{m_height?"수정완료":<u>수정</u>}</Hover></Text>
      </ContentBS>

      <Line></Line>

      <ContentBS>
        <Text m_size margin="0px auto 4px auto" color="#2F2F2F" size="12px" line-height="14px">체중</Text>
        <Text m_size margin="0px auto 6px auto" color="#111E30" size="13px" line-height="18px" bold>
          {m_weight?<BodyInput type="text" value={a_weight} onChange={(e)=>Number(e.target.value)||e.target.value===""?AddWeight(e.target.value):window.alert("숫자만 입력해주세요!")}/>:weight}KG
        </Text>
        <Text m_size color="#8C8C8C" size="12px" line-height="14.4px"><Hover onClick={M_weight}>{m_weight?"수정완료":<u>수정</u>}</Hover></Text>
      </ContentBS>

      <Line></Line>

      <ContentBS>
        <Text m_size margin="0px auto 4px auto" color="#2F2F2F" size="12px" line-height="14px">기초대사량</Text>
        <Text m_size margin="0px auto 6px auto" color="#111E30" size="13px" line-height="18px" bold>
          {bmr}Kcal
        </Text>
      </ContentBS>
    </BodySpecBox>
      :
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
          <Text lineheight="22px" size="16px" bold cursor="pointer">
            신체정보 등록하기
          </Text>
        </Hover>
        </Button>
      </BodyBox>
      }





          <hr color="#F5F5F5"/>
          <Grid display="flex">
            <Text lineheight="22px" size="17px" margin="24px 0px 24px 20px" width="auto">
              <Hover onClick={()=>
                {
                  history.push("/notice")
                }}>
                  공지사항
              </Hover>
            </Text>
            <Grid display="flex" width="auto" border_radius="20px" bg={theme.color.light} padding="1%" margin="auto auto auto 2%" m_margin="auto auto auto 2%">
              <Text size="13px" m_size="11px">New</Text>
            </Grid>
          </Grid>

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

          <Text lineheight="22px" size="17px" color="#000000" margin="24px 0px 24px 20px">
                <Hover onClick={()=>
              {
                history.push("/aboutUs")
              }}>
              About us
            </Hover>
          </Text>
          <hr color="#F5F5F5"/>

          <Version>
            <Text lineheight="22px" size="17px" color="#A9A9A9" margin="15px 0px 15px 20px">
              현재 버전
            </Text>
            <Text size="17px" margin="17px 20px 15px 0px" color="#F19F13">
              V2.0.1
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
  };
`;

const Version = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BodySpecBox = styled.div`
  width: 83%;
  height: 92px;
  margin: auto auto 32px auto;
  border: 1px solid #E8E8E8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Line = styled.div`
  border: 1px solid #E8E8E8;
  height: 60px;
`;

const ContentBS = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
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

const BodyInput = styled.input`
  width: 30%;
  margin-left: 3vw;
  height: 20%;
`;

const NickInput = styled.input`
  width: 100%;
  border: none;
  font-size: 15px;
  margin-bottom: 0.5vh;

  :focus {
      outline: none;
    }
`;
const Line_ = styled.div`
  border: 1px solid #E8E8E8;
  width: 100%;
`;

const EditBtn = styled.span`
  margin-left: 5%;
  font-size: 15px;
  cursor: pointer;
  color: #737373;

  @media ${theme.device.mobileM} {
    font-size: 13;
  }
`;

export default BodySpec;