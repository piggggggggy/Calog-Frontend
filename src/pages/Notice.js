import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import { getNoticeSV } from '../redux/modules/notice';

import styled from 'styled-components';
import { Grid, Text } from '../elements';

import {Back} from "../img/svg";

import Loading from './Loading4';
/**
 * @param {*} props
 * @returns 공지사항
 * @역할 공지사항 페이지
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 성수
*/

const Notice = (props) =>
{
  const dispatch = useDispatch();
  const admin = useSelector((state)=>state.user.user_info?.email);
  const notilist = useSelector(state=>state.notice.list);
  const notilist_reverse =[];

  // 공지사항 리스트 배열 뒤집기
  notilist.map((i)=>{notilist_reverse.unshift(i)});

  React.useEffect(()=>
  {
    dispatch(getNoticeSV());
  },[]);

// loading
const is_loaded = useSelector((state) => state.record.is_loaded)

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
            <Grid>
              {Back}
            </Grid>
          </td>
          <Text size="17px" lineheight="22px" bold color="#000000">
            공지사항
          </Text>
          {/* 관리자 아이디만 쓰기 버튼 표시 */}
          {/* 보여주는 것보다 어디 숨겨놔야할 듯 */}
          {admin==="cadmin@calories.com"?
          <Tag onClick={()=>
          {
            history.push("/notiwrite")
          }}>
            <Text size="13px" lineheight="25px">
              <u>쓰기</u>
            </Text>
          </Tag>
          :
          <p>&emsp;&emsp;</p>
          }
        </Head>

        <hr color="#F5F5F5"/>
        <PostList>
        {notilist_reverse.map((l)=>
        {
          return(
            <Post key={l._id}>
                <Tag onClick={()=>{history.push(`/notice/${l.id}`)}}>
                  <Text size="17px"  ineheight="22px">
                    {l.title}
                  </Text>
                  <Text size="17px" lineheight="22px" color="#A9A9A9">
                    {l.date}
                  </Text>
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