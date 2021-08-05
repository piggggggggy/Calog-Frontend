import React, {useState, useRef, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
// elements & components
import Card from './Main_Card';
import { Grid, Text } from '../elements';
// modules
import { getFavoriteDB } from '../redux/modules/favorite';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값  즐겨찾기 리스트, 인기음식 리스트
 * @담당자 : 박용태
*/

const FavoList = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const favo_list = useSelector((state) => state.favorite.list);
  const is_login = useSelector((state) => state.user.is_login);
  const [moreFavo, setFavo] = useState(false);
// useEffect
  useEffect(() => {
    dispatch(getFavoriteDB());
  }, [])

  const changeFavo = () => {
    if (moreFavo) {
      setFavo(false);
    } else {
      setFavo(true);
    }
  };

  return (
    <React.Fragment>
      {is_login ?
      <CardContainer>
        <Grid margin="0 0 1.3vh 0" m_margin="0 0 1.3vh 0">
          <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" color="#8C8C8C" padding="0" margin="0">즐겨찾기 모음</Text>
        </Grid>
        {!moreFavo ? favo_list.slice(0,4).map((favo, idx) => {     
          return <Card key={favo.foodId} {...favo}/>              
        })
        : favo_list.map((favo, idx) => {
            return <Card key={favo.foodId} {...favo}/>
        })}
        <MoreBtn onClick={changeFavo}>
          <Text size="13px" m_size="13px" padding="0" margin="0">{moreFavo ? "덜보기" : "더보기"}</Text>
        </MoreBtn>
      </CardContainer>
      : ''}
    </React.Fragment>
  );
}

FavoList.defaultProps = {

}

const CardContainer = styled.div`
  width: 100%;
  padding: 0 6%;
  /* height: 100%; */
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
`;

const MoreBtn = styled.div`
  width: 100%;
  height: 4vh;
  /* margin: 1.9vh 0; */
  padding: 1.1vh 6%;
  background: rgba(196, 196, 196, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FavoList;