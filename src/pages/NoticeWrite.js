import React, { useEffect, useState } from 'react';
import { Input, Grid, Button, Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {Back, X} from "../img/svg";
import { history } from '../redux/configStore';
import { postNoticeSV } from '../redux/modules/notice';
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const NoticeWrite = (props) => {
const dispatch = useDispatch();
let date = new Date().toLocaleDateString();
const [noticelist, setNotice] = useState({date});
const postNoti = () => {
  dispatch(postNoticeSV(noticelist));
}
console.log(noticelist);
  return (
    <React.Fragment>
      <Container>
          <Head>
            <div onClick={()=>{history.push("/notice")}}>
            <Tag>{Back}</Tag>
            </div>
            <Text size="17px" lineheight="22px" bold color="#000000">공지사항 작성</Text>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/>
          </Head>
          <hr color="#F5F5F5"/>
          <Body>
            <Grid width="80%" margin="20px 0px 0px 0px">
            <Text>제목</Text>
            <Input border_radius="5px"
            _onChange={(e)=>{setNotice({...noticelist,title:e.target.value})}}/>
            </Grid>
            <Grid width="80%" margin="20px 0px 0px 0px">
            <Text>비밀번호</Text>
            <Input border_radius="5px"
            _onChange={(e)=>{setNotice({...noticelist,password:e.target.value})}}/>
            </Grid>
            <Grid width="80%" margin="20px 0px 0px 0px">
            <Text>내용</Text>
            <TextWrite rows="10"
            onChange={(e)=>{setNotice({...noticelist,contents:e.target.value})}}/>
            </Grid>
            <Grid width="80%" margin="20px 0px 0px 0px" display="flex">
              <Button bg="#FFE899" height="40px" border_radius="26px"
              _onClick={postNoti}>작성하기</Button>
            </Grid>
          </Body>
      </Container>
    </React.Fragment>
  );
}


export default NoticeWrite;

const Container = styled.div`
  height: 866px;
  width: 420px;
  overflow-y: hidden;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 28px 0px 0px 0px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Post = styled.div`
    padding-bottom: 10px;
    
`;

const Tag = styled.a`
  &:hover{
    cursor: pointer;
  }
`;

const TextWrite = styled.textarea`
  border-radius: 5px;
  width: 100%;
`;