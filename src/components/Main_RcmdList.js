import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// elementc & components
import { Text } from "../elements";
import CardRcmd from "./Main_CardRcmd";
import CardRcmd2 from "./Main_CardRcmd2";

// horizontal scroll
import HorizontalScroll from "react-scroll-horizontal";

/**
 * @param {*} props
 * @returns 추천음식
 * @역할 추천음식을 보여주는 컴포넌트
 * @담당자 : 박용태
 */

const RcmdList = () => {
  // 추천 리스트
  const recommended_list = useSelector((state) => state.search.recommend);

  // 이름 가져오기위해!
  const user = useSelector((state) => state.user.user_info);

  // 로그인 체크
  const is_login = useSelector((state) => state.user.is_login);

  return (
    <React.Fragment>
      {/* 타이틀 */}
      <TitleBox>
        <Text
          lineheight="24px"
          m_lineheight="20px"
          size="20px"
          m_size="17px"
          bold
          color="#2A2A2A"
          padding="0"
          margin="0"
        >
          {is_login
            ? `${user.nickname}님을 위한 추천 음식`
            : "칼로거님을 위한 추천 음식"}
        </Text>
      </TitleBox>

      {/* 추천리스트 */}
      {window.navigator.standalone ||
      window.navigator.fullscreen ||
      window.navigator.browser ? (
        <RecommendContainerM>
          {recommended_list &&
            recommended_list.map((r, idx) => {
              return <CardRcmd2 key={idx} {...r} />;
            })}
        </RecommendContainerM>
      ) : (
        <RecommendContainer>
          <HorizontalScroll>
            {recommended_list &&
              recommended_list.map((r, idx) => {
                return <CardRcmd key={idx} {...r} />;
              })}
          </HorizontalScroll>
        </RecommendContainer>
      )}
    </React.Fragment>
  );
};

RcmdList.defaultProps = [];

const TitleBox = styled.div`
  position: relative;
  padding: 0 0 0 8%;
  margin: 2.6vh 0 0 0;
`;

const RecommendContainer = styled.div`
  position: relative;
  height: 13.5vh;
  min-height: 110px;
  margin: 1.7vh 0 0 0;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  z-index: 5;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecommendContainerM = styled.div`
  position: relative;
  margin: 1.7vh 0 0 0;
  padding: 0 3% 3vh 5.2%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  z-index: 5;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default RcmdList;
