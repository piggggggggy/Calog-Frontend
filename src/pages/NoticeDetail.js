import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {Back, X} from "../img/svg";
import { history } from '../redux/configStore';
import { getNotiDetailSV, deleteNotiSV } from '../redux/modules/notice';
import _ from 'lodash';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/


const NotiDetail = (props) => {
const dispatch = useDispatch();
const notiId = props.match.params.postid;
const noticeOne = useSelector(state=>state.notice.listone);
const admin_email = useSelector(state=>state.user.user_info?.email);
const notidelete = () => {
  dispatch(deleteNotiSV(notiId));
  history.push("/notice");
}
React.useEffect(()=>{
  dispatch(getNotiDetailSV(notiId));
},[]);
  return (
    <React.Fragment>
      <Container>
          <Head>
            <div onClick={()=>{history.push("/notice")}}>
            <Tag>{Back}</Tag>
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000">공지사항</Text>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/>
          </Head>
          <hr color="#F5F5F5"/>
            <Post>
                <Tag >
                <Text size="17px" lineheight="22px">{noticeOne?.title}</Text>
                <Text size="17px" lineheight="22px" color="#A9A9A9">{noticeOne?.date}</Text>
                </Tag>
                <hr color="#F5F5F5"/>
                <Content>{noticeOne?.contents}</Content>
            </Post>
            {admin_email==="cadmin@calories.com"?
            <Grid width="25%">
                <Button bg="#FFE899" border_radius="15px"
                _onClick={notidelete}>삭제</Button>
            </Grid>
            :""}
      </Container>
    </React.Fragment>
  );
}


export default NotiDetail;

const Container = styled.div`
  height: 866px;
  width: 420px;
  overflow-y: hidden;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 18px 0px 0px 0px;
  padding: 10px;
`;

const Post = styled.div`
    padding-bottom: 10px;
`;

const Tag = styled.a`
  &:hover{
    cursor: pointer;
  }
`;

const Content = styled.div`

`;