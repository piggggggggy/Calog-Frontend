import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {Back} from "../img/svg";
import { history } from '../redux/configStore';
import { getNoticeSV, putNotiSV } from '../redux/modules/notice';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Notice = (props) => {
const dispatch = useDispatch();
const admin = useSelector((state)=>state.user.user_info?.email);
const notilist = useSelector(state=>state.notice.list);
console.log(notilist);
const notilist_reverse =[];
notilist.map((i)=>{})
React.useEffect(()=>{
  // dispatch(putNotiSV({title:"ㅇㅇㅇ 제목 수정", contents:"1번 내용 수정",password:"zkffhfltm1@"},"610a5853ec4ceb2aec1cd015"));
  dispatch(getNoticeSV());
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
          {notilist.map((l)=>{
            return(
              <Post key={l._id}>
                  <Tag onClick={()=>{history.push(`/notice/${l.id}`)}}>
                  <Text size="17px" lineheight="22px">{l.title}</Text>
                  <Text size="17px" lineheight="22px" color="#A9A9A9">{l.date}</Text>
                  </Tag>
                  <hr color="#F5F5F5"/>
              </Post>
              );
          })}
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