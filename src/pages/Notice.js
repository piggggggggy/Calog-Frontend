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
const notilist_reverse =[];
notilist.map((i)=>{notilist_reverse.unshift(i)});

React.useEffect(()=>{
  // dispatch(putNotiSV({title:"ㅇㅇㅇ 제목 수정", contents:"1번 내용 수정",password:"zkffhfltm1@"},"610a5853ec4ceb2aec1cd015"));
  dispatch(getNoticeSV());
},[]);


  return (
    <React.Fragment>
      <Container>
          <Head>
            <td onClick={()=>{history.push("/loading/body")}}>
            <Grid>{Back}</Grid>
            </td>
            <Text size="17px" lineheight="22px" bold color="#000000">공지사항</Text>
              {admin==="cadmin@calories.com"?
              <Tag onClick={()=>{history.push("/loading/notiwrite")}}>
              <Text size="13px" lineheight="25px"><u>쓰기</u></Text>
              </Tag>
              :
              <p>&emsp;&emsp;</p>
              }
          </Head>
          <hr color="#F5F5F5"/>
          <PostList>
          {notilist_reverse.map((l)=>{
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
  height: 100%;
  width: 100%;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  padding-top: 30px;
`;

const PostList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Post = styled.div`
    padding: 0px 15px 10px 15px;
`;

const Tag = styled.a`
  &:hover{
    cursor: pointer;
  }
`;