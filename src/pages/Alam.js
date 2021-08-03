import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSV } from '../redux/modules/user';
import {emailCheck, pwdCheck, pwdDupli, NickCheck} from "../shared/common";
import {Back, X} from "../img/svg";
import { history } from '../redux/configStore';
import _ from 'lodash';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const Alam = (props) => {
const dispatch = useDispatch();
const [user_info, setUserInfo] = useState({});


  return (
    <React.Fragment>
      <Container>
          <Head>
            <div onClick={()=>{history.push("/body")}}>
            <Tag>{Back}</Tag>
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000">공지사항</Text>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/>
            <Tag>글쓰기</Tag>
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


export default Alam;

const Container = styled.div`
  height: 866px;
  width: 420px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 28px 0px 0px 0px;
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