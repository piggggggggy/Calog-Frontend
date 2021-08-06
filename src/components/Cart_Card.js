import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// elements & components
import { Text } from '../elements';
// icons
import { IoIosArrowDropleft,IoIosArrowDropright } from 'react-icons/io';
// modules
import { setUpAmount, setDownAmount } from '../redux/modules/cart';
// theme
import theme from '../shared/theme'

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 카드에 들어갈 푸드 정보
 * @담당자 : 박용태
*/

const Card = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const [count, setCount] = useState(props.amount);
  const [left, setLeft] = useState(false);
  // const swipe = useRef();
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
    // e.preventDefault();
    // e.stopPropagation();
    setLeft(true);
  };

  const styles = left ? {left: "-300"} : {left: "0"}

  return (
    <React.Fragment>
      <CardContainer>
        <FoodCard style={{left: "-300"}} onClick={handleSwipe}>
            <NameBox>{props.name}</NameBox>
            <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#2A2A2A" margin="8px 0 0 0" padding="0">{props.kcal} kcal</Text>
            <CountBox>
              <div onClick={downCount}><IoIosArrowDropleft color="gray" size="27px"/></div>
              <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#000000" margin="0" padding="0">{count}</Text>
              <div onClick={upCount}><IoIosArrowDropright color="gray" size="27px"/></div>
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
  height: calc(4.4vh + 58px);

  @media ${theme.device.mobileM} {
    height: calc(4.4vh + 53px);
  }
`;

const FoodCard = styled.div`
  position: absolute;
  min-width: 100%;
  /* left: 40%; */
  top: 0px;
  padding: 2.2vh 7.6%;
  background: #fff;
  border: 1px solid #F19F13;
  border-radius: 16px;
  cursor: pointer;
`;

const NameBox = styled.div`
  max-width: 200px; 
  line-height: 22px;
  size: 17px; 
  font-size: 15px; 
  margin: 0; 
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap; 

  @media ${theme.device.mobileM} {
    line-height: 20px; 
    font-size: 15px; 
  }
`;

const CountBox = styled.div`
  position: absolute;
  right: 5%;
  top: 4.5vh;
  min-width: 32%;
  max-width: 32%;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  /* gap: auto; */

  & > div {
    width: 27px;
    height: 27px;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;

export default Card;