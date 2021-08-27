import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import { getNotiDetailSV, deleteNotiSV } from '../redux/modules/notice';

import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import ios1 from '../img/ios1.PNG';
import ios2 from '../img/ios2.PNG';
import and1 from '../img/and1.PNG';
import and2 from '../img/and2.PNG';

import {Back} from "../img/svg";

/**
 * @param {*} props
 * @returns 공지 상세보기
 * @역할 공지 상세보기 페이지
 * @필수값 공지사항 게시글 고유 id
 * @담당자 : 성수 + 나영(게시글 관리)
*/

const NotiDetail = (props) => 
{
  const dispatch = useDispatch();
  const notiId = props.match.params.postid;
  const noticeOne = useSelector(state=>state.notice.listone);
  const admin_email = useSelector(state=>state.user.user_info?.email);

  const notidelete = () => 
  {
    dispatch(deleteNotiSV(notiId));
  }

  React.useEffect(()=>{
    dispatch(getNotiDetailSV(notiId));
  },[]);


  return (
    <React.Fragment>
      <Container>
        <Head>
          <td onClick={()=>
            {
              history.push("/notice")
            }}>
            <Grid>
              {Back}
            </Grid>
          </td>
          <Text size="17px" lineheight="22px" bold color="#000000">
            공지사항
          </Text>
          <p>&emsp;&emsp;</p>
        </Head>
        <hr color="#F5F5F5"/>

        <Post>
          <Tag>
            <Text size="17px" lineheight="22px">{noticeOne?.title}</Text>
            <Text size="17px" lineheight="22px" color="#A9A9A9">{noticeOne?.date}</Text>
          </Tag>
          <hr color="#F5F5F5"/>
          <Content>
            {noticeOne?.title === "🎉 Calog 정식런칭!" && (
              <Text>
              안녕하세요, Calog입니다!<br/><br/>
              Calog는 일일 칼로리를 계산해주고 기록해주는 서비스로 2021.08.26 정식 런칭을 시작합니다🎉<br/><br/>
              예상보다 작업량이 많아서 일정이 조금 지연된 점 사과의 말씀드립니다.<br/><br/>
              아직 부족한 점이 많겠지만 보내주신 소중한 의견을 모아 더 나은 서비스를 제공하기 위해 노력하겠습니다.<br/><br/>
              칼로그 많은 사랑 부탁드리겠습니다! 감사합니다!💗
              </Text>
            )}

            {noticeOne?.title === "🎈피드백 이벤트 안내" && (
              <PostBox>
                <Text>
                안녕하세요, 유저 여러분!<br/><br/>
                다들 식사는 잘 하고 계신가요?<br/><br/>
                운영진이 더 나은 서비스를 제공하기 위해 현재 피드백을 받고있지만 피드백 작성이 손이 많이 가는 일인 것 같아요.<br/><br/>
                그래서 저희가 작은 이벤트를 준비했습니다.🎉<br/><br/>
                피드백을 작성해주신 분들께 추첨을 통해 <span style={{fontWeight:"bold"}}>저희의 마음이 담긴 선물</span>을 드리려고해요!<br/><br/>
                참여방법은 아래 글을 참고해주세요.<br/><br/>
                <span style={{fontWeight:"bold", fontSize:"20px", color:"#f19f13"}}>🎯 참여방법 첫번째!</span><br/>
                1. Calog 페이지에서 서비스 이용 후<br/><span style={{borderBottom:"3px solid #f19f13"}}>"마이페이지" - "의견 보내기"</span>에서 피드백을 제출한다.<br/>
                2. <span style={{borderBottom:"3px solid #f19f13"}}>9월 3일 추첨을 통해 스타벅스 기프티콘</span>을 받아 맛있게 마신다.<br/><br/>
                <span style={{fontWeight:"bold", fontSize:"20px", color:"#f19f13"}}>🎯 참여방법 두번째!</span><br/>
                1. Calog 페이지에서 서비스 이용 후 인스타그램에 접속한다.<br/>
                2. Calog를 이용하며 느끼신 장점과 불편한 점을<br/>
                <span style={{borderBottom:"3px solid #f19f13"}}>#calog #칼로그 #칼로리다이어리 #칼로리가궁금할땐칼로그</span> 태그와 함께 게시글을 작성한다.<br/>
                3. <span style={{borderBottom:"3px solid #f19f13"}}>9월 3일 추첨을 통해 베스킨라빈스 파인트 기프티콘</span>을 받아 맛있게 먹는다.
                </Text>
              </PostBox>
            )}

            {history.location.pathname.includes('notice3') && (
              <PostBox>
                <Text>
                안녕하세요, 칼로그입니다!<br/><br/>
                현재 칼로그는 PWA라는 모바일웹 기술을 적용하여 플레이스토어나 앱스토어에서 다운이 아닌 <span style={{borderBottom:"3px solid #f19f13", fontWeight:"bold"}}>홈 화면에 추가</span>하여 사용하시면 더 원활한 환경에서 확인이 가능해요!<br/><br/>
                자세한 방법은 아래 글을 참고해주세요!<br/><br/>
                <span style={{fontWeight:"bold", fontSize:"20px", color:"#f19f13"}}>🎯 ios</span><br/>
                <span style={{fontWeight:"bold"}}>1.</span>칼로그 URL을 사파리로 연다.<br/>
                <span style={{fontWeight:"bold"}}>2.</span>아래 이미지와 같이 공유하기 아이콘을 누른다.<br/><Image src={ios1} width="100%" height="13vh" b_size="100% 100%"/>
                <span style={{fontWeight:"bold"}}>3.</span>홈 화면에 추가하여 사용한다.<br/><Image src={ios2} width="100%" height="10vh" b_size="100% 100%"/>
                <br/>
                <span style={{fontWeight:"bold", fontSize:"20px", color:"#f19f13"}}>🎯 안드로이드</span><br/>
                <span style={{fontWeight:"bold"}}>1.</span>칼로그 URL을 크롬으로 연다.<br/>
                <span style={{fontWeight:"bold"}}>2.</span>아래 이미지와 같이 설정 아이콘을 누른다.<br/><Image src={and1} width="100%" height="13vh" b_size="100% 100%"/>
                <span style={{fontWeight:"bold"}}>3.</span>홈 화면에 설치하여 사용한다.<br/><Image src={and2} width="100%" height="7vh" b_size="100% 100%"/>
                <br/>
                추후 안드로이드의 경우 플레이스토어에 정식 런칭 예정이며 추가 공지로 돌아오겠습니다.<br/><br/>
                감사합니다❣️<br/><br/>
                </Text>
              </PostBox>
            )}

            {history.location.pathname.includes('notice4') && (
              <PostBox>
                <Text>
                안녕하세요, 칼로그입니다!<br/><br/>
                현재 칼로그에서는 "내가 먹은 칼로리"에 대한 확인이 가능한 서비스입니다.<br/><br/>
                모든 데이터는 <span style={{borderBottom:"3px solid #f19f13"}}>식약청 및 각 브랜드 공식 홈페이지</span>를 기반으로 가지고 온 정식 데이터예요!<br/><br/>
                검색 후 확인이 어려운 칼로리의 경우 영양성분을 아신다면 직접 추가 및 요청도 가능하니 많은 이용 부탁드립니다.<br/><br/>
                감사합니다❣️<br/><br/>
                </Text>
              </PostBox>
            )}
          </Content>
        </Post>
      </Container>
    </React.Fragment>
  );
}


export default NotiDetail;

const Container = styled.div`
  width: 100%;
  overflow-y: hidden;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  padding-top: 30px;
`;

const Post = styled.div`
    padding: 0px 15px 10px 15px;
`;

const Tag = styled.a`
  &:hover{
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 5%;
  line-height: 25px;
`;

const PostBox = styled.div`
  height: 100%;
  overflow-y: scroll;
`;