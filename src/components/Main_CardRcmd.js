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
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const CardRcmd = (props) => {
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
        { backgroundColor: "#FFE899", border: "0.2px solid #f19f13" }
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

  return (
    <React.Fragment>
      <FoodCard style={is_picked()} onClick={()=>{history.push(`/fooddetail/${props.foodId}`)}}>
        
        <div style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
          <Text lineheight="15px" m_lineheight="15px" size="13px" m_size="13px" color="#000000" padding="0" margin="0">{props.name}</Text>
        </div>
        
        <div>  
          <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#000000" padding="0" margin="0">{props.kcal} kcal</Text>
        </div>
        
        {/* 즐겨찾기 버튼 */}
        <BookmarkBox>
          <IoStar  style={is_favorite()} size="21px" onClick={addFavorite}/>
        </BookmarkBox>
        
        {/* 장바구니 버튼 */}
        <CartBox onClick={addCart}>
          <BsFillPlusSquareFill  color="#F19F13" size="17px"/>
        </CartBox>

      </FoodCard>
    </React.Fragment>
  );
}

CardRcmd.defaultProps = {

}

const FoodCard = styled.div`
  position: relative;
  min-width: 41%;
  min-height: 13.5vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1.5vh 3.8%;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
  }
`;

const BookmarkBox = styled.div`
  position: absolute;
  top: 1.3vh;
  left: 9.3%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartBox = styled.div`
  position: absolute;
  bottom: 2vh;
  right: 10.5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export default CardRcmd;