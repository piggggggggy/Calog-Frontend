import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// elements & components
import { Grid, Text } from '../elements';
// icons
import { IoIosArrowDropleft,IoIosArrowDropright } from 'react-icons/io';
// modules
import { setUpAmount, setDownAmount } from '../redux/modules/cart';
// theme
import theme from '../shared/theme'

/** 
 * @param {*} props
 * @returns 푸드카드
 * @역할 검색결과, 즐겨찾기에 사용되는 푸드 카드
 * @필수값 카드에 들어갈 푸드 정보
 * @담당자 : 박용태
*/

const Card = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const [count, setCount] = useState(props.amount);
  const [left, setLeft] = useState(false);
// useEffect

  // 갯수 카운팅하기!
  const upCount = () => {
    setCount(count + 0.5);
    dispatch(setUpAmount(props.foodId));
  };

  const downCount = () => {
    if(count > 0.5){
      setCount(count - 0.5);
      dispatch(setDownAmount(props.foodId));
    }
  };

  // swipe
  const handleSwipe = (e) => {
    setLeft(true);
  };

  const styles = left ? {left: "-300"} : {left: "0"}

  return (
    <React.Fragment>

      <CardContainer>
        <FoodCard style={{left: "-300"}} onClick={handleSwipe}>
          
          <Grid>
            {/* 이름 */}
            <NameBox>{props.name}</NameBox>
          
            {/* kcal */}
            <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#2A2A2A" margin="0.9vh 0 0 0" padding="0">{props.kcal} kcal</Text>
          </Grid>
          
          {/* 카운트 */}
          <CountBox>
            <div onClick={downCount}><IoIosArrowDropleft color="gray" size="18%"/></div>
            <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#000000" margin="0" padding="0">{count}</Text>
            <div onClick={upCount}><IoIosArrowDropright color="gray" size="5vw"/></div>
          </CountBox>

        </FoodCard>
      </CardContainer>
      
    </React.Fragment>
  );
}

Card.defaultProps = {

}

const CardContainer = styled.div`
  position: relative;
  min-width: 88%;
  /* height: calc(4.4vh + 58px); */

  @media ${theme.device.mobileM} {
    /* height: calc(4.4vh + 53px); */
  }
`;

const FoodCard = styled.div`
  position: relative;
  min-width: 100%;
  top: 0px;
  display: grid;
  grid-template-columns: 60% 32%;
  gap: 8%;
  padding: 2.2vh 4.8% 2.2vh 8.6%;
  background: #fff;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
`;

const NameBox = styled.div`
  /* max-width: 200px;  */
  line-height: 22px;
  size: 17px; 
  font-size: 15px; 
  margin: 0; 
  padding: 0;
  /* text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;  */

  @media ${theme.device.mobileM} {
    line-height: 20px; 
    font-size: 15px; 
  }
`;

const CountBox = styled.div`
  /* min-width: 32%;
  max-width: 32%; */
  /* padding: 0 4.8%; */
  display: flex;
  align-items: center;
  justify-content: space-between;  

  & > div {
    width: 5vw;
    height: 5vw;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;

export default Card;