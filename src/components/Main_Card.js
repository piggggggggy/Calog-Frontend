import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// history
import { history } from '../redux/configStore';
// modules
import { addCartRx } from '../redux/modules/cart';
import { addFavoriteDB, deleteFavoriteDB, getFavoriteDB } from '../redux/modules/favorite';
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
  const dispatch = useDispatch();
// props
  const cart_list = useSelector((state) => state.cart.cart);
  const favorite_list = useSelector((state) => state.favorite.list);
  const is_login = useSelector((state) => state.user.is_login);
// useEffect

  // 장바구니 담기!
  const addCart = (e) => {
    const cartUnit = {
      foodId: props.foodId,
      name: props.name,
      forOne: props.forOne,
      grams: props.grams,
      kcal: props.kcal,
      amount: 1,
    };
    e.preventDefault();
    e.stopPropagation();
    dispatch(addCartRx(cartUnit));
  };

  // 장바구니에 담긴 food일 경우 배경 #FFE899
  const is_picked = () => {
    const cartCheck = cart_list.findIndex((c) => c.foodId === props.foodId);
    if (cartCheck !== -1) {
      return (
        { backgroundColor: "#FFE899" }
        )
    }else{
      return (
        { backgroundColor: "#ffffff" }
      )
    }
  };

  // 즐겨찾기 확인
  const is_favorite = () => {
    const favoCheck = favorite_list.findIndex((f) => f.foodId === props.foodId);
    if (favoCheck !== -1) {
      return (
        { color: "#F19F13" }
        )
    }else{
      return (
        { color: "#E4E4E4" }
      )
    }
  };
  
  // 즐겨찾기 추가 함수
  const addFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if (!is_login) {
    //   window.alert("로그인부터 하세요.")
    //   return;
    // }
    let data = {
      foodId : props.foodId,
      name: props.name,
      kcal: props.kcal
    };
    
    dispatch(addFavoriteDB(data));

  };
    
  return (
    <React.Fragment>

      {/* 검색 결과 낱개 카드 */}
      <FoodCard style={is_picked()} onClick={()=>{history.push(`/fooddetail/${props.foodId}`)}}>

        <BookmarkBox>
          <IoStar style={is_favorite()} size="21px" onClick={addFavorite}/>
        </BookmarkBox>

        <CartBox onClick={addCart} style={{zIndex: "10"}}>
          <AiOutlinePlusCircle size="17px"/>
        </CartBox>

        <Text size="13px" m_size="13px" lineheight="18px" m_lineheight="15px" margin="0" padding="0">{props.name}</Text>
        <Text size="22px" m_size="20px" lineheight="24px" m_lineheight="22px" bold margin="0" padding="0">{props.kcal} kcal</Text>
        
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
  min-height: 98px;
  padding: 5.2vh 6% 1.7vh 6%;
  margin-bottom: 16px;
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
  top: 1.3vh;
  padding: 1px;
  cursor: pointer;
  z-index: 10;
`;

const CartBox = styled.div`
  position: absolute;
  z-index: 10;
  left: 2vh;
  top: 1.5vh;
  padding: 2px;
  cursor: pointer;
  z-index: 10;
`;


export default Card;