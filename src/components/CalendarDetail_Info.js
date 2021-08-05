import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import theme from '../shared/theme';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const CalenderDetail_Info = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <Wrap>
        <Grid is_flex padding="0 9%">
          <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
            <P>Good<br/>기초대사량을<br/>충분히 채운 하루네요!</P>
            <Text size="15px" bold m_size="11px" color={theme.color.gray_6} margin="3.8% 0 0 0">기초대사량보다 5kcal 더 섭취했어요.</Text>
          </Grid>
          <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
            <Svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="22" fill="#6993FF"/>
              <path d="M17.8368 18.852C18.3682 18.319 18.6667 17.596 18.6667 16.8422C18.6667 16.0884 18.3682 15.3655 17.8368 14.8325C17.3054 14.2994 16.5848 14 15.8333 14C15.0819 14 14.3612 14.2994 13.8299 14.8325C13.2985 15.3655 13 16.0884 13 16.8422C13 17.596 13.2985 18.319 13.8299 18.852C14.3612 19.385 15.0819 19.6845 15.8333 19.6845C16.5848 19.6845 17.3054 19.385 17.8368 18.852Z" fill="white"/>
              <path d="M29.1701 18.852C28.6388 19.385 27.9181 19.6845 27.1667 19.6845C26.4152 19.6845 25.6945 19.385 25.1632 18.852C24.6318 18.319 24.3333 17.596 24.3333 16.8422C24.3333 16.0884 24.6318 15.3655 25.1632 14.8325C25.6945 14.2994 26.4152 14 27.1667 14C27.9181 14 28.6388 14.2994 29.1701 14.8325C29.7015 15.3655 30 16.0884 30 16.8422C30 17.596 29.7015 18.319 29.1701 18.852Z" fill="white"/>
              <path d="M16.7921 24.6744C17.223 24.9291 17.5356 25.3448 17.6614 25.8304C18.1544 27.4807 19.9148 28.2103 21.5015 28.2103C23.0882 28.2103 24.8505 27.4789 25.3416 25.8304C25.4748 25.3535 25.7887 24.948 26.2162 24.7004C26.6437 24.4529 27.1509 24.383 27.6291 24.5059C28.1072 24.6287 28.5185 24.9344 28.7748 25.3576C29.0311 25.7808 29.1121 26.2879 29.0004 26.7702C28.022 30.0823 24.8732 31.9999 21.5015 31.9999C18.2583 31.9999 14.8318 30.1051 14.0026 26.774C13.8793 26.2878 13.9533 25.7724 14.2083 25.3408C14.4633 24.9092 14.8785 24.5967 15.3629 24.4718C15.8473 24.3469 16.3612 24.4197 16.7921 24.6744Z" fill="white"/>
            </Svg>
            <br/><br/><br/><br/>
          </Grid>
        </Grid>
      </Wrap>
    </React.Fragment>
  );
}

CalenderDetail_Info.defaultProps = {

}

const Wrap = styled.div`
  background-color: white;
  width: 88%;
  height: 22.5vh;
  margin: 0 auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
`;

const Svg = styled.svg`
  width: 44px;
  height: 44px;

  @media ${theme.device.mobileMini} {
    width: 35px;
    height: 35px;
  }
`;

const P = styled.p`
  font-size: 22px;
  font-weight: bold;
  line-height: 28px;
  
  @media ${theme.device.mobileMini} {
    font-size: 17px;
    line-height: 20px;
  }
`;

export default CalenderDetail_Info;