import React from 'react';
import styled from 'styled-components';
import {Grid, Text, Button} from '../elements';
import theme from '../shared/theme';


/** 
 * @역할 모달 카드
 * @필수값 title
 * @담당자 : 김나영
*/

const Modal = (props) => {

  const {open, title} = props

  return (
    <Grid display={open ? "block" : "none"}>

      {/* 바탕 */}
      <Wrap>

        {/* 흰색 박스 */}
        <InnerBox>

          {/* 내용 */}
          <Grid padding="10.6% 0 0 8.5%">

            {/* 삭제 모달인 경우 */}
            {/* {title === "삭제"} && ( */}
              <Text size="28px" bold m_size="23px">삭제하시겠습니까?</Text>
              <Grid margin="2% 0 0 0" m_margin="2% 0 0 0">
                <Text size="18px" bold color={theme.color.gray_6} m_size="14px">삭제된 식단은 장바구니에 추가되며<br/>기록이 작성되면 사라져요!</Text>
              </Grid>
              
            {/* ) */}
          </Grid>

          {/* 버튼 */}
          {/* 삭제 모달인 경우 - 버튼 2개 */}
          <Grid display="flex" jc="space-around" margin="4% 0 0 0">
            <Btn>
              <Text size="16px" bold m_size="12px">취소</Text>
            </Btn>
            <Btn>
              <Text size="16px" bold m_size="12px">삭제</Text>
            </Btn>
          </Grid>

        </InnerBox>

      </Wrap>
    </Grid>
  );
}

const Wrap = styled.div`
  position: relative;
  background-color: rgba(30, 30, 30, 0.1);
  width: 100%;
  height: 100%;
  animation: modal-bg-show .3s;

  @keyframes modal-bg-show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
`;

const InnerBox = styled.div`
  background-color: white;
  position: relative;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90.5%;
  height: 22.5vh;
  border-radius: 10px;
  animation: modal-show .3s;

  @keyframes modal-show {
    from {
        opacity: 0;
        margin-top: -50px;
    }
    to {
        opacity: 1;
        margin-top: 0;
    }
}
`;

const Btn = styled.button`
  width: 40%;
  height: 40px;
  background-color: ${theme.color.light};
  border: none;
  border-radius: 44px;
`;



export default Modal;