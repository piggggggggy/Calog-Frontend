import React, {useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import _, { throttle } from 'lodash';

// elementc & components
import { Grid, Text } from '../elements';
import CardRcmd from './Main_CardRcmd';
import Loading from '../pages/Loading2';

// modules
import { getRecommendedDB } from '../redux/modules/search';

// horizontal scroll
import HorizontalScroll from "react-scroll-horizontal";

/** 
 * @param {*} props
 * @returns 추천음식
 * @역할 추천음식을 보여주는 컴포넌트
 * @담당자 : 박용태
*/

const RcmdList = (props) => {

  // 추천 리스트
  const recommended_list = useSelector((state) => state.search.recommend);
  console.log(recommended_list);
  
  // 이름 가져오기위해!
  const user = useSelector((state) => state.user.user_info);

  // 로그인 체크
  const is_login = useSelector((state) => state.user.is_login);
  
  // 횡 스와이프 구현!
  const refX = useRef(null);
  const [isDrag, setDrag] = useState(false);
  const [startX, setStart] = useState();

  const dragStart = (e) => {
    e.preventDefault();
    setDrag(true);
    setStart(e.pageX + refX.current.scrollLeft)
  };

  const dragEnd = (e) => {
    setDrag(false);
  };

  const dragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = refX.current;
 
      refX.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStart(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStart(e.pageX + scrollLeft);
      }
    }
  };

  const delay = 50;
  const throttleDragMove = throttle(dragMove, delay);

  return (
    <React.Fragment>

      {/* 타이틀 */}
      <TitleBox>
        <Text lineheight="24px" m_lineheight="20px" size="20px" m_size="17px" bold color="#2A2A2A" padding="0" margin="0">
          {is_login ? `${user.nickname}님을 위한 추천 음식` : "칼로거님을 위한 추천 음식"}
        </Text>
      </TitleBox>

      {/* 추천리스트 */}
      <RecommendContainer 
        // onMouseDown={dragStart}
        // onMouseMove={isDrag ? throttleDragMove : null}
        // onMouseUp={dragEnd}
        // onMouseLeave={dragEnd}
        // ref={refX}
        >
          <HorizontalScroll>
            {recommended_list && recommended_list.map((r, idx) => {
              return <CardRcmd key={r.foodId} {...r}/>
            })}
          </HorizontalScroll>
        
      </RecommendContainer>
    </React.Fragment>
  );
}

RcmdList.defaultProps = [
  
];

const TitleBox = styled.div`
  position: relative;
  padding: 0 0 0 8%;
  margin: 2.6vh 0 0 0;
`;

const RecommendContainer = styled.div`
  position: relative;
  height: 200px;
  margin: 1.7vh 0 0 0;
  /* padding: 0 3% 3vh 5.2%; */
  padding: 0 0 3vh 0;
  display: flex;
  align-items: center;
  /* gap: 1.7vh; */
  overflow-x: scroll;
  z-index: 5;

  &::-webkit-scrollbar {
    display: none;
  } 
`;

export default RcmdList;