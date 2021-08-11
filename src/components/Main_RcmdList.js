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

/** 
 * @param {*} props
 * @returns 추천음식
 * @역할 추천음식을 보여주는 컴포넌트
 * @담당자 : 박용태
*/

const RcmdList = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const recommended_list = useSelector((state) => state.search.recommend);
// useEffect
  useEffect(() => {
    dispatch(getRecommendedDB())
  }, [])

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


  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded)

  if(!is_loaded) {
    return (<Loading />);
  }

  if (!recommended_list) {
    return <></>;
  };

  return (
    <React.Fragment>

      {/* 타이틀 */}
      <Grid padding="0 0 0 8%" margin="2.6vh 0 0 0" m_margin="2.6vh 0 0 0">
        <Text lineheight="24px" m_lineheight="20px" size="20px" m_size="17px" bold color="#2A2A2A" padding="0" margin="0">오늘 칼로리즈가 많이 먹은 음식</Text>
      </Grid>

      {/* 추천리스트 */}
      <RecommendContainer 
        onMouseDown={dragStart}
        onMouseMove={isDrag ? throttleDragMove : null}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}
        ref={refX}>
        {recommended_list && recommended_list.map((r, idx) => {
          return <CardRcmd key={r.foodId} {...r}/>
        })}
      </RecommendContainer>
    </React.Fragment>
  );
}

RcmdList.defaultProps = [
  
];

const RecommendContainer = styled.div`
  margin: 1.7vh 0 0 0;
  padding: 0 3% 3vh 5.2%;
  display: flex;
  align-items: center;
  gap: 2%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  } 
`;

export default RcmdList;