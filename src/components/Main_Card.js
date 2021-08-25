import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// theme
import theme from '../shared/theme';

// history
import { history } from '../redux/configStore';

// modules
import { addCartRx } from '../redux/modules/cart';
import { addFavoriteDB, deleteFavoriteDB } from '../redux/modules/favorite';

// icons
import { IoStar } from 'react-icons/io5';
import { BsFillPlusSquareFill } from 'react-icons/bs';


/** 
 * @param {*} props
 * @returns 카드
 * @역할 검색결과 카드 / 즐겨찾기 카드
 * @담당자 : 박용태
*/

const Card = (props) => {
  
  
  // dispatch
  const dispatch = useDispatch();
  
  // 장바구니 체크용
  const cart_list = useSelector((state) => state.cart.cart);

  // 즐겨찾기 체크용 
  const favorite_list = useSelector((state) => state.favorite.list);
  
  // 로그인 체크
  const is_login = useSelector((state) => state.user.is_login);

  // 장바구니 담기!
  const addCart = (e) => {
    const cartUnit = {
      foodId: props.foodId,
      name: props.name,
      // forOne: props.forOne,
      // grams: props.grams,
      kcal: Math.round(props.kcal * 10)/10,
      amount: 1,
    };
    e.preventDefault();
    e.stopPropagation();
    dispatch(addCartRx(cartUnit));
  };

  // 장바구니에 담긴 food일 경우 배경 #FFE899
  const is_picked = () => {
    const cartCheck = cart_list && cart_list.findIndex((c) => c.foodId === props.foodId);
    if (cartCheck !== -1) {
      return (
        { backgroundColor: "#FFFBD9", border: "1px solid #F19F13" }
        )
    }else{
      return (
        { backgroundColor: "#ffffff" }
      )
    }
  };

  // 즐겨찾기 확인
  const favoCheck = favorite_list && favorite_list.findIndex((f) => f.foodId === props.foodId);
 
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
      window.alert("로그인이 필요한 기능이에요!")
      return;
    }
    if (favoCheck === -1) {
      let data = {
        foodId : props.foodId,
        name: props.name,
        kcal: Math.round(props.kcal * 10)/10
      };
      dispatch(addFavoriteDB(data));
    } else {
      dispatch(deleteFavoriteDB(props.foodId));
    }
  };
  
  // 브랜드명 분리
  const NameNBrand = props.name.indexOf('[') === 0 ? props.name.split(':') : false;
  const brand = props.name.indexOf('[') === 0 ? NameNBrand[0] : '';
  const name = props.name.indexOf('[') === 0 ? NameNBrand[1] : props.name;

  return (
    <React.Fragment>

      {/* 검색 결과 낱개 카드 */}
      <FoodCard style={is_picked()} onClick={()=>{history.push(`/fooddetail/${props.foodId}`)}}>

        {/* 즐겨찾기 */}
        <BookmarkBox  onClick={addFavorite}>
          <IoStar style={is_favorite()} width="100%"/>
        </BookmarkBox>

        {/* 이름 */}
        <NameContainer >
          <Name>{brand}</Name>
          <Name>{name}</Name>
        </NameContainer>

        {/* 칼로리 */}
        <div style={{display: "flex", alignItems: "center", justifyContent: 'flex-end'}}>
          <KcalBox>{Math.round(props.kcal * 10)/10} kcal</KcalBox>
        </div>

        {/* 장바구니 */}
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
  grid-template-columns: 13% 48% 26% 13%;
  width: 87%;
  padding-top: 1.7vh;
  padding-bottom: 1.7vh;
  min-height: 40px;
  /* max-height: 80px; */
  margin-bottom: 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);

  & > div {
    display: flex;
    align-items: center;
    width: 100%;

    & > svg {
      width: 100%;
    }
  }
`;

const KcalBox = styled.div`
  font-size: 17px;
  line-height: 22px;
  font-weight: bold;
  margin: 0;
  padding: 0;

  @media ${theme.device.mobileM} {
    font-size: 15px;
    line-height: 20px;
  }

  @media ${theme.device.mobileS} {
    font-size: 13px;
    line-height: 18px;
  }
`;

const NameContainer = styled.div`
  height: 36px;
  
  @media ${theme.device.mobileM} {
    height: 30px;
  }
`;

const Name = styled.div`
  font-family: 'Pretendard';  
  font-size: 15px;
  line-height: 18px;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  

  @media ${theme.device.mobileM} {
    font-size: 13px;
    line-height: 15px;
  }

  @media ${theme.device.mobileS} {
    white-space: nowrap;
  }
  
`;

const BookmarkBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 25%;
  padding-right: 20%;
`;

const CartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


export default Card;