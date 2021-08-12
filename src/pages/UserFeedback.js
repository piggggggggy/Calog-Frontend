import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import instance from '../redux/modules/instance';

import styled from 'styled-components';
import { Grid, Text, Input, Button } from '../elements';

import {Back} from "../img/svg";

import Loading from './Loading2';

import moment from 'moment';
/**
 * @param {*} props
 * @returns 공지사항
 * @역할 공지사항 페이지
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 성수
*/

const Feedback = (props) =>
{
  const dispatch = useDispatch();
  const [feedback, setFeed] = useState({});
  const {title, contents} = feedback;
  const date = moment().format('YYYY-MM-DD');
  console.log(title, contents, date);
  const sendfeedback = () => {
      instance
      .post('/api/notice/feedback', {title, contents, date})
      .then((res)=>
      {history.replace('/body')
       window.alert("의견이 전달되었어요.")})
      .catch((err)=>
      {console.log(err)});
  }

// loading
const is_loaded = useSelector((state) => state.record.is_loaded);

if(!is_loaded) {
  return (<Loading />);
}


  return (
    <React.Fragment>
      <Container>
        <Head>
          <td onClick={()=>
            {
              history.push("/body")
            }}>
            <Grid cursor>
              {Back}
            </Grid>
          </td>
          <Text
          size="17px"
          lineheight="22px"
          bold
          color="#000000">
            의견 보내기
          </Text>
          <p>&emsp;&emsp;</p>
        </Head>
        <hr color="#F5F5F5"/>

        <Body>
          <Grid
          width="80%"
          margin="20px 0px 0px 0px">
            <Text>
              제목
            </Text>
            <Input
            border_radius="5px"
            type="text"
            value={feedback.title}
            _onChange={(e)=>
            {
              setFeed({...feedback,title:e.target.value})
            }}/>
          </Grid>
          <Grid
          width="80%"
          margin="20px 0px 0px 0px">
            <Text>내용</Text>
            <TextWrite rows="10"
            onChange={(e)=>
            {
              setFeed({...feedback,contents:e.target.value})
            }}/>
          </Grid>
          <Grid
          width="80%"
          margin="20px 0px 0px 0px"
          display="flex">
            <Button
            bg="#FFE899"
            height="40px"
            border_radius="26px"
            _onClick={sendfeedback}>
              작성하기
            </Button>
          </Grid>
        </Body>

      </Container>
    </React.Fragment>
  );
}


export default Feedback;

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

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextWrite = styled.textarea`
  border-radius: 5px;
  width: 100%;
`;