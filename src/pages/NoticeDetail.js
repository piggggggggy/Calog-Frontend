import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import { getNotiDetailSV, deleteNotiSV } from '../redux/modules/notice';

import styled from 'styled-components';
import { Grid, Button, Text } from '../elements';

import {Back} from "../img/svg";

/**
 * @param {*} props
 * @returns 공지 상세보기
 * @역할 공지 상세보기 페이지
 * @필수값 공지사항 게시글 고유 id
 * @담당자 : 성수
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
          <Text
          size="17px"
          lineheight="22px"
          bold
          color="#000000">
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
            {noticeOne?.contents}
          </Content>
        </Post>
        {/* 관리자 아이디 삭제 버튼 표시 / 관리자 아이디 숨겨야함 */}
        {admin_email==="cadmin@calories.com"?
        <Grid width="25%">
            <Button
            bg="#FFE899"
            border_radius="15px"
            _onClick={notidelete}>
              삭제
            </Button>
        </Grid>
        :""}
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
`;