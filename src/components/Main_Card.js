import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// history
import { history } from '../redux/configStore';
// modules
import { addCartRx } from '../redux/modules/cart';
import { addFavoriteDB, deleteFavoriteDB } from '../redux/modules/favorite';
// elements & components
import { Grid, Text } from '../elements';
// icons
import { IoStar } from 'react-icons/io5';
import { BsFillPlusSquareFill } from 'react-icons/bs';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 favorite_list, is_logtin
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
  const favoCheck = favorite_list.findIndex((f) => f.foodId === props.foodId);
 
  const is_favorite = () => {
    
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
    if (!is_login) {
      window.alert("로그인부터 하세요.")
      return;
    }
    if (favoCheck === -1) {
      let data = {
        foodId : props.foodId,
        name: props.name,
        kcal: props.kcal
      };
      dispatch(addFavoriteDB(data));
    } else {
      dispatch(deleteFavoriteDB(props.foodId));
    }
  };
  
  // 즐겨찾기 해제
    
  return (
    <React.Fragment>

      {/* 검색 결과 낱개 카드 */}
      <FoodCard style={is_picked()} onClick={()=>{history.push(`/fooddetail/${props.foodId}`)}}>

        <BookmarkBox  onClick={addFavorite}>
          <IoStar style={is_favorite()} size="21px"/>
        </BookmarkBox>

        <div >
          <Text size="15px" m_size="13px" lineheight="18px" m_lineheight="15px" margin="0" padding="0">{props.name}</Text>
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: 'flex-end'}}>
          <Text size="17px" m_size="15px" lineheight="22px" m_lineheight="20px" bold margin="0" padding="0">{props.kcal} kcal</Text>
        </div>

        <CartBox onClick={addCart} style={{zIndex: "10"}}>
          <BsFillPlusSquareFill color="#F19F13" size="17px"/>
        </CartBox>

      </FoodCard>

    </React.Fragment>
  );
}

Card.defaultProps = {

}

const FoodCard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 10% 52% 26% 12%;
  width: 87%;
  height: 6.4vh;
  margin-bottom: 16px;
  border: 1px solid #F19F13;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);

  & > div {
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const BookmarkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


export default Card;