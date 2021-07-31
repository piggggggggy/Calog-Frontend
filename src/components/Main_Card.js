import React from 'react';
import styled from 'styled-components';
// elements & components
import { Grid, Text } from '../elements';
// icons
import { IoStar } from 'react-icons/io5';
import { AiOutlinePlusCircle, AiFillPlusCircle } from 'react-icons/ai';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const Card = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      {/* 검색 결과 낱개 카드 */}
      <FoodCard>

        <BookmarkBox>
          <IoStar color="#E4E4E4" size="21px"/>
        </BookmarkBox>

        <CartBox>
          <AiOutlinePlusCircle size="17px"/>
        </CartBox>

        <Text size="13px" lineheight="18px" margin="0" padding="0">쌀밥</Text>
        <Text size="22px" lineheight="" bold margin="0" padding="0">310 kcal</Text>
        
      </FoodCard>

    </React.Fragment>
  );
}

Card.defaultProps = {

}

const FoodCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 48%;
  height: 12.5vh;
  min-height: 95px;
  padding: 5.2vh 6% 2vh 6%;
  margin-bottom: 16px;
  background: #FFFFFF;
  border: 1px solid #F19F13;
  border-radius: 28px;
  box-shadow: 0px 4px 15px -4px rgba(0, 0, 0, 0.14);
  cursor: pointer;
  z-index: 5;
`;

const BookmarkBox = styled.div`
  position: absolute;
  z-index: 10;
  right: 2vh;
  top: 1.5vh;
  padding: 1px;
  cursor: pointer;
  z-index: 10;
`;

const CartBox = styled.div`
  position: absolute;
  z-index: 10;
  left: 2vh;
  top: 1.5vh;
  padding: 3px;
  cursor: pointer;
  z-index: 10;
`;


export default Card;