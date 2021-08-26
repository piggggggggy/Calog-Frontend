import React, {useState, useRef} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import instance from '../redux/modules/instance';

import styled from 'styled-components';
import { Grid, Text, Input, Button } from '../elements';
import theme from '../shared/theme';

import Loading from './Loading2';

import moment from 'moment';
/**
 * @param {*} props
 * @returns 공지사항
 * @역할 유저 피드백 페이지
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 김나영
*/

const Feedback = (props) =>
{
  const phone = useRef();
  const good = useRef();
  const bad = useRef();
  const instagram = useRef();

  const date = moment().format('YYYY-MM-DD');

  const sendFeedback = () => {
    const phoneNum = phone.current.value;
    const instagramId = instagram.current.value;
    const goodContents = good.current.value;
    const badContents = bad.current.value;

    if(!goodContents || !badContents) {
      window.alert('필수항목을 모두 입력해주세요!')
    } else {
      instance
      .post('/api/notice/feedback', {title:'피드백', contents:goodContents + " / " + badContents, date:date, phoneNum:phoneNum, instagramId:instagramId})
      .then((res) => {
        history.replace('/body')
        window.alert("소중한 의견 감사드립니다:) 더 좋은 서비스로 보답하겠습니다!")
      })
      .catch((err) => {
        window.alert("피드백 작성에 오류가 있어요!")
        history.replace('/body')
      });
    }
  }

// loading
const is_loaded = useSelector((state) => state.record.is_loaded);

if(!is_loaded) {
  return (<Loading />);
}

  return (
    <React.Fragment>
      <Grid bg={theme.color.light} height="23.5%">

        {/* 닫기 버튼 */}
        <CloseBtn onClick={()=>{history.goBack()}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="#FFE899"/>
            <path d="M11.5 9.78274L17.9271 3.35566C18.4013 2.88145 19.1701 2.88145 19.6443 3.35566C20.1186 3.82986 20.1186 4.59871 19.6443 5.07291L13.2173 11.5L19.6443 17.9271C20.1186 18.4013 20.1186 19.1701 19.6443 19.6443C19.1701 20.1186 18.4013 20.1186 17.9271 19.6443L11.5 13.2173L5.07291 19.6443C4.59871 20.1186 3.82986 20.1186 3.35566 19.6443C2.88145 19.1701 2.88145 18.4013 3.35566 17.9271L9.78274 11.5L3.35566 5.07291C2.88145 4.59871 2.88145 3.82986 3.35566 3.35566C3.82986 2.88145 4.59871 2.88145 5.07291 3.35566L11.5 9.78274Z" fill="#8C8C8C"/>
          </svg>
        </CloseBtn>

        <Grid margin="0 0 0 6%" m_margin="0 0 0 6%" padding="23% 0 0 0">
          <Text size="28px"><span style={{fontWeight:"bold"}}>칼로그</span>를 위한</Text>
          <Text size="28px"><span style={{fontWeight:"bold"}}>다양한 피드백</span>을 작성해주세요.</Text>
        </Grid>
      </Grid>

      {/* body */}
      <Grid margin="8% 6%" m_margin="8% 6%" >

        {/* 장점 */}
        <Text size="17px" margin="0 0 2% 0" m_size="15px">칼로그 장점<span style={{color:"#FD0000"}}>*</span></Text>
        <TextBox rows={8} placeholder="칼로그 장점을 작성해주세요" ref={good}/>

        {/* 불편한 점 */}
        <Text size="17px" margin="6% 0 2% 0" m_size="15px">칼로그 불편한 점<span style={{color:"#FD0000"}}>*</span></Text>
        <TextBox rows={8} placeholder="칼로그의 불편한 점을 작성해주세요" ref={bad}/>

        {/* 전화번호 */}
        <Text size="17px" margin="6% 0 2% 0" m_size="15px">전화번호(선택)</Text>
        <InputBox placeholder="'-'빼고 전화번호 입력" ref={phone}/>
        <Text size="13px" m_size="9px" lineheight="24px" m_lineheight="24px" color="#6993FF">*이벤트에 참여하시는 모든 분들은 반드시 입력해주세요.</Text>

        {/* 인스타 */}
        <Text size="17px" margin="6% 0 2% 0" m_size="15px">인스타그램 아이디(선택)</Text>
        <InputBox placeholder="인스타그램 아이디 입력" ref={instagram}/>
        <Text size="13px" m_size="9px" lineheight="24px" m_lineheight="24px" color="#6993FF">*인스타그램 후기 이벤트에 참여하시는 모든 분들은 반드시 입력해주세요.</Text>

        {/* 작성하기 버튼 */}
        <Button margin="6% 0 0 0" width="90%" height="50px" bg={theme.color.light} border_radius="60px" _onClick={sendFeedback}>
          <Text size="16px" bold cursor="pointer">작성하기</Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
}


export default Feedback;

const CloseBtn = styled.div`
  float: right;
  margin: 6% 6%;
  cursor: pointer;
`;

const InputBox = styled.input`
  width: 90%;
  padding: 3% 4%;
  border: 1px solid #DADADA;
  border-radius: 6px;

  ::placeholder {
    color: ${theme.color.gray_4};
    font-size: 16px;

    @media ${theme.device.mobileM} {
      font-size: 13px;
    }
  }
`;

const TextBox = styled.textarea`
  width: 90%;
  padding: 3% 4%;
  border: 1px solid #DADADA;
  border-radius: 6px;
  resize: none;

  ::placeholder {
    color: ${theme.color.gray_4};
    font-size: 16px;

    @media ${theme.device.mobileM} {
      font-size: 13px;
    }
  }
`;