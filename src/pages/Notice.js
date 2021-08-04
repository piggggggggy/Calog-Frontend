import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {Back} from "../img/svg";
import { history } from '../redux/configStore';
import { getNoticeSV, putNotiSV, deleteNotiSV, getNotiDetailSV } from '../redux/modules/notice';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Notice = (props) => {
const dispatch = useDispatch();
const admin = useSelector((state)=>state.user.user_info.email);
console.log();
React.useEffect(()=>{
  // dispatch(putNotiSV({title:"ㅇㅇㅇ 제목 수정", contents:"1번 내용 수정",password:"zkffhfltm1@"},"610a5853ec4ceb2aec1cd015"));
  // dispatch(deleteNotiSV("610a5e75e1d2a82c7297f5d9"));
  dispatch(getNoticeSV());
  // dispatch(getNotiDetailSV("610a5853ec4ceb2aec1cd015"));
},[]);


  return (
    <React.Fragment>
      <Container>
          <Head>
            <div onClick={()=>{history.push("/body")}}>
            <Tag>{Back}</Tag>
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000">공지사항</Text>
            &nbsp;
            <Tag onClick={()=>{history.push("/notiwrite")}}>
              {admin==="cadmin@calories.com"?<Text size="13px"><u>쓰기</u></Text>:<Text></Text>}
            </Tag>
          </Head>
          <hr color="#F5F5F5"/>
          <PostList>
            <Post>
                <Tag onClick={()=>{history.push(`/notice/${"postId"}`)}}>
                <Text size="17px" lineheight="22px">칼로리즈 서비스 런칭 공지</Text>
                <Text size="17px" lineheight="22px" color="#A9A9A9">2021.08.13</Text>
                </Tag>
                <hr color="#F5F5F5"/>
            </Post>
            <Post>
            <Tag onClick={()=>{history.push(`/notice/${"postId"}`)}}>
                <Text size="17px" lineheight="22px">공지사항의 제목이 길 경우에는 이렇게 길어지다가 끝 처리를 ...</Text>
                <Text size="17px" lineheight="22px" color="#A9A9A9">2021.08.13</Text>
                </Tag>
                <hr color="#F5F5F5"/>
            </Post>
          </PostList>
      </Container>
    </React.Fragment>
  );
}


export default Notice;

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
  padding-top: 10px;
`;

const PostList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Post = styled.div`
    padding-bottom: 10px;
    
`;

const Tag = styled.a`
  &:hover{
    cursor: pointer;
  }
`;