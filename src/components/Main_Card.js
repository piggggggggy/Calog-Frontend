import React from 'react';
import styled from 'styled-components';
// elements & components
import { Grid, Text } from '../elements';
// icons
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
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
      <FoodCard>
        <BookmarkBox>
          <BsBookmark size="20px"/>
        </BookmarkBox>
        <CartBox>
          <AiOutlinePlusCircle size="20px"/>
        </CartBox>
        <Text margin="0" padding="0">쌀밥</Text>
        <Text size="1.2rem" bold color="green" margin="0" padding="0">310 kcal</Text>
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
  width: 47%;
  height: 160px;
  margin: 6px 0;
  padding: 15px;
  background: lightgray;
  border: none;
  border-radius: 20px;
`;

const BookmarkBox = styled.div`
  position: absolute;
  z-index: 10;
  right: calc(1rem + 5px);
  top: 1rem;
  width: 1rem;
  height: 1rem;
  /* background: yellow; */
`;

const CartBox = styled.div`
  position: absolute;
  z-index: 10;
  left: 1rem;
  top: 1rem;
  width: 1rem;
  height: 1rem;
  /* background: black; */
`;


export default Card;