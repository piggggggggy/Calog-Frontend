import React, {useState,  useEffect} from 'react';
import styled from 'styled-components';
import theme from '../shared/theme';
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

  // MainBody에서 props로 받아옴
  const favo_list = props.favo_list;
  const [moreFavo, setFavo] = useState(false);

  // 즐겨찾기 덩보기, 더보기
  const changeFavo = () => {
    if (moreFavo) {
      setFavo(false);
    } else {
      setFavo(true);
    }
  };

  // 유저 직접 추가 칼로리
  const userAddFood = useSelector((state) => state.food.addFood)

  return (
    <React.Fragment>

      {/* use1) 즐겨찾기 목록 */}
      {!props.title ? (
        <React.Fragment>
          {favo_list.length !== 0 ?
          <CardContainer>

            {/* 이름
            <Grid margin="0 0 1.3vh 0" m_margin="0 0 1.3vh 0" padding="0 6%">
              <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" color="#8C8C8C" padding="0" margin="0">즐겨찾기 모음</Text>
            </Grid> */}

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
      ) : (

        // use2) 유저가 직접 기록한 칼로리
        <CardContainer>   

          {/* case1) 기록이 있을 때 */}
          {userAddFood?.length !== 0 ? (

            <React.Fragment>
              {userAddFood?.map((food, idx) => {
                return <Card key={food._id} title={"useAdd"} foodId={food._id} {...food}/>
              })}
            </React.Fragment>
          ) : (
            <AddFoodBtn onClick={() => {history.push('/addFood')}}>
              <P>음식 직접 등록하기</P>
            </AddFoodBtn>
          )}
        </CardContainer>
      )}
    </React.Fragment>
  );
};

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  column-gap: 1.8vh;
  margin-top: 7%;
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

const AddFoodBtn = styled.div`
  width: 54%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #F5CC3F;
  border-radius: 44px;
  padding-top: 1.3vh;
  padding-bottom: 1.3vh;
  cursor: pointer;
  margin-top: 2%;

  & > div {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    color: #E6BB2A;

    @media ${theme.device.mobileM} {
      font-size: 14px;
    }
  }
`;

const P = styled.div`
  font-family: 'Pretendard';
`;

export default FavoList;