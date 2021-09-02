import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import theme from "../shared/theme";
// history
import { history } from "../redux/configStore";
// modules
import { addCartRx, deleteCartRx } from "../redux/modules/cart";
import { addFavoriteDB, deleteFavoriteDB } from "../redux/modules/favorite";
// elements & components
import { Text } from "../elements";
// icons
import { BsFillPlusSquareFill } from "react-icons/bs";
import { IoStar } from "react-icons/io5";

/**
 * @param {*} props
 * @returns 뚱뚱이 카드
 * @역할 횡스크롤 이슈를 해결하고자 급조한 컴포넌트입니다.
 * @담당자 : 박용태
 */

const CardRcmd2 = (props) => {
  const dispatch = useDispatch();
  const cart_list = useSelector((state) => state.cart.cart);
  const favorite_list = useSelector((state) => state.favorite.list);
  const is_login = useSelector((state) => state.user.is_login);

  // 장바구니 담기!
  const addCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cartUnit = {
      foodId: props.foodId,
      name: props.name,
      forOne: props.forOne,
      measurement: props.measurement,
      kcal: Math.round(props.kcal * 10) / 10,
      amount: 1,
    };
    let index = cart_list.findIndex((cart) => cart.foodId === props.foodId);
    if (index !== -1) {
      dispatch(deleteCartRx(props.foodId));
    } else {
      dispatch(addCartRx(cartUnit));
    }
  };

  // 장바구니에 담긴 food일 경우 배경 #FFE899
  const is_picked = () => {
    const cartCheck = cart_list.findIndex((c) => c.foodId === props.foodId);
    if (cartCheck !== -1) {
      return { backgroundColor: "#FFFBD9", border: "1px solid #F19F13" };
    } else {
      return { backgroundColor: "#ffffff" };
    }
  };

  // 즐겨찾기 확인
  const favoCheck =
    favorite_list && favorite_list.findIndex((f) => f.foodId === props.foodId);

  const is_favorite = () => {
    if (favoCheck !== -1) {
      return { color: "#F19F13" };
    } else {
      return { color: "#E4E4E4" };
    }
  };

  // 로그인 페이지 이동!
  const confirm = () => {
    if (
      window.confirm(
        "로그인이 필요한 기능이에요! 로그인 페이지로 이동하시겠어요?"
      )
    ) {
      history.push("/signsocial");
    } else {
      return;
    }
  };

  // 즐겨찾기 추가 함수
  const addFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!is_login) {
      confirm();
      return;
    }
    if (favoCheck === -1) {
      let data = {
        foodId: props.foodId,
        name: props.name,
        kcal: Math.round(props.kcal * 10) / 10,
      };
      dispatch(addFavoriteDB(data));
    } else {
      dispatch(deleteFavoriteDB(props.foodId));
    }
  };

  // 브랜드명 분리
  const NameNBrand =
    props.name.indexOf("[") === 0 ? props.name.split(":") : false;
  const brand = props.name.indexOf("[") === 0 ? NameNBrand[0] : "";
  const name = props.name.indexOf("[") === 0 ? NameNBrand[1] : props.name;

  return (
    <React.Fragment>
      <FoodCard
        style={is_picked()}
        onClick={() => {
          history.push(`/fooddetail/${props.foodId}`);
        }}
      >
        {/* 이름 */}
        <NameContainer>
          <NameBox>{brand}</NameBox>
          <NameBox>{name}</NameBox>
        </NameContainer>

        {/* 칼로리 */}
        <div>
          <Text
            lineheight="28px"
            m_lineheight="25px"
            size="20px"
            m_size="17px"
            bold
            color="#000000"
            padding="0"
            margin="0"
            cursor="pointer"
          >
            {Math.round(props.kcal * 10) / 10} kcal
          </Text>
        </div>

        {/* 즐겨찾기 버튼 */}
        <BookmarkBox>
          <IoStar style={is_favorite()} size="21px" onClick={addFavorite} />
        </BookmarkBox>

        {/* 장바구니 버튼 */}
        <CartBox onClick={addCart}>
          <BsFillPlusSquareFill color="#F19F13" size="24px" />
        </CartBox>
      </FoodCard>
    </React.Fragment>
  );
};

CardRcmd2.defaultProps = {};

const FoodCard = styled.div`
  position: relative;
  min-width: 44%;
  max-width: 44%;
  min-height: 13.5vh;
  max-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: calc(1.3vh + 20px) 3.8% 1.5vh 3.8%;
  margin-right: 2%;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 30px;
`;

const NameBox = styled.div`
  font-family: "Pretendard";
  max-height: 30px;
  max-width: 120px;
  min-width: 100px;
  line-height: 15px;
  font-size: 13px;
  color: #000000;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${theme.device.mobileS} {
    max-width: 110px;
  }
`;

const BookmarkBox = styled.div`
  position: absolute;
  top: 1.3vh;
  left: 9.3%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CartBox = styled.div`
  position: absolute;
  bottom: 1.8vh;
  right: 10.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media only screen and (max-width: 320px) {
    right: 7%;
  }
`;

export default CardRcmd2;
