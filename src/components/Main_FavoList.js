import React, {useState,  useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configStore';

// elements & components
import Card from './Main_Card';
import { Grid, Text } from '../elements';
import Loading from '../pages/Loading2';

// modules
import { getFavoriteDB } from '../redux/modules/favorite';

/** 
 * @param {*} props
 * @returns 즐겨찾기 리스트
 * @역할 즐겨찾기 리스트
 * @담당자 : 박용태
*/

const FavoList = (props) => {

  // const dispatch = useDispatch();
  // const favo_list = useSelector((state) => state.favorite.list);
  const favo_list = props.favo_list;
  // const is_login = useSelector((state) => state.user.is_login);
  const [moreFavo, setFavo] = useState(false);
  console.log(favo_list)
  // 즐겨찾기 목록 불러오기
  // useEffect(() => {
  //   history.listen(() => {
  //     if(is_login) {
  //       dispatch(getFavoriteDB());
  //     }
  //   })
  // }, [])

   // loading
  // const is_loaded = useSelector((state) => state.record.is_loaded)

  // if(!is_loaded) {
  //   return (<Loading />);
  // }

  // 즐겨찾기 덩보기, 더보기
  const changeFavo = () => {
    if (moreFavo) {
      setFavo(false);
    } else {
      setFavo(true);
    }
  };

  return (
    <React.Fragment>
      {favo_list.length !== 0 ?
      <CardContainer>

        {/* 이름 */}
        <Grid margin="0 0 1.3vh 0" m_margin="0 0 1.3vh 0" padding="0 6%">
          <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" color="#8C8C8C" padding="0" margin="0">즐겨찾기 모음</Text>
        </Grid>

        {/* 카드리스트 */}
        {!moreFavo ? favo_list.slice(0,4).map((favo, idx) => {     
          return <Card key={favo.foodId} {...favo}/>              
        })
        : favo_list.map((favo, idx) => {
            return <Card key={favo.foodId} {...favo}/>
        })}

        {/* 버튼 */}
        {favo_list?.length > 4 ? <MoreBtn onClick={changeFavo}>
          <Text size="13px" m_size="13px" padding="0" margin="0">{moreFavo ? "덜보기" : "더보기"}</Text>
        </MoreBtn> : ''}
      </CardContainer>
      : ''}
    </React.Fragment>
  );
}

FavoList.defaultProps = {

}

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  column-gap: 1.8vh;
`;

const MoreBtn = styled.div`
  width: 100%;
  height: 4vh;
  padding: 1.1vh 6%;
  background: rgba(196, 196, 196, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FavoList;