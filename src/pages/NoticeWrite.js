import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { postNoticeSV } from "../redux/modules/notice";

import styled from "styled-components";
import { Input, Grid, Button, Text } from "../elements";

import { Back } from "../img/svg";

import moment from "moment";

/**
 * @역할 공지사항 작성 페이지
 * @담당자 : 성수
 */

const NoticeWrite = () => {
  const dispatch = useDispatch();
  const date = moment().format("YYYY-MM-DD");
  const [noticelist, setNotice] = useState({ date });

  const postNoti = () => {
    dispatch(postNoticeSV(noticelist));
  };

  return (
    <React.Fragment>
      <Container>
        <Head>
          <td
            onClick={() => {
              history.push("/notice");
            }}
          >
            <Grid>{Back}</Grid>
          </td>
          <Text size="17px" lineheight="22px" bold color="#000000">
            공지사항
          </Text>
          <p>&emsp;&emsp;</p>
        </Head>
        <hr color="#F5F5F5" />

        <Body>
          <Grid width="80%" margin="20px 0px 0px 0px">
            <Text>제목</Text>
            <Input
              border_radius="5px"
              type="text"
              value={noticelist.title}
              _onChange={(e) => {
                setNotice({ ...noticelist, title: e.target.value });
              }}
            />
          </Grid>
          <Grid width="80%" margin="20px 0px 0px 0px">
            <Text>비밀번호</Text>
            <Input
              border_radius="5px"
              type="password"
              value={noticelist.password}
              _onChange={(e) => {
                setNotice({ ...noticelist, password: e.target.value });
              }}
            />
          </Grid>
          <Grid width="80%" margin="20px 0px 0px 0px">
            <Text>내용</Text>
            <TextWrite
              rows="10"
              onChange={(e) => {
                setNotice({ ...noticelist, contents: e.target.value });
              }}
            />
          </Grid>
          <Grid width="80%" margin="20px 0px 0px 0px" display="flex">
            <Button
              bg="#FFE899"
              height="40px"
              border_radius="26px"
              _onClick={postNoti}
            >
              작성하기
            </Button>
          </Grid>
        </Body>
      </Container>
    </React.Fragment>
  );
};

export default NoticeWrite;

const Container = styled.div`
  height: 800px;
  width: 100%;
  overflow-y: hidden;
`;

const Head = styled.div`
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
