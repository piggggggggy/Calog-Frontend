import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import theme from "../shared/theme";

// middleware
import { useDispatch } from "react-redux";

// css
import { FiShare } from "react-icons/fi";

/**
 * @역할 모달 카드
 * @필수값 title
 * @담당자 : 김나영
 */

const Modal = (props) => {
  const dispatch = useDispatch();

  const { open, title } = props;

  // 모달 열고 닫기
  const [display, setDisplay] = useState("block");

  return (
    <Grid display={open ? display : "none"}>
      {/* 바탕 */}
      <Wrap>
        {/* 흰색 박스 */}
        <InnerBox>
          {/* 내용 */}
          <Grid padding="10.6% 0 10.6% 0">
            {/* 홈 화면 추가 모달인 경우 */}
            {title === "addHome" && (
              <React.Fragment>
                <Grid margin="0 0 0 8.5%" m_margin="0 0 0 8.5%">
                  <FiShare size="25px" color={theme.color.gray_7} />
                  <Grid margin="2% 0 0 0" m_margin="2% 0 0 0">
                    <Text
                      size="18px"
                      bold
                      color={theme.color.gray_6}
                      m_size="14px"
                    >
                      홈 화면에 추가하면 앱처럼 사용할 수 있어요!
                    </Text>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </InnerBox>
      </Wrap>
    </Grid>
  );
};

const Wrap = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(30, 30, 30, 0.5);
  width: 100%;
  height: 100%;
  animation: modal-bg-show 0.3s;

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
  height: auto;
  border-radius: 10px;
  animation: modal-show 0.3s;

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

export default Modal;
