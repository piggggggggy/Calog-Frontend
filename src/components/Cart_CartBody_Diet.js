import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// elements & components
import { Grid, Text } from "../elements";
import Card from "./Cart_Card";

// modules
import { CustomSV } from "../redux/modules/DietCustom";
import { delCartAll } from "../redux/modules/cart";

// history
import { history } from "../redux/configStore";

/**
 * @param {*} props
 * @returns 장바구니 담긴 내용, 계산된 칼로리, 기초대사량과 비교
 * @역할 장바구니 역할
 * @담당자 : 박용태, 김나영
 */

const CartBodyDiet = () => {
  const dispatch = useDispatch();

  // 카드 담긴 내용
  const cart = useSelector((state) => state.cart);
  const cart_list = cart.cart;
  const is_login = useSelector((state) => state.user.is_login);

  // 커스텀 식단
  const recordCustom = () => {
    if (is_login) {
      dispatch(CustomSV(diet, cart.cart));
      history.push("/");
    } else {
      if (window.confirm("로그인이 필요해요! 로그인 페이지로 이동할까요?")) {
        history.push("/signsocial");
      }
    }
  };

  const [diet, setDiet] = useState("");

  return (
    <React.Fragment>
      <BodyContainer>
        {/* 식단 이름 */}
        <DietName>
          <DietInputContainer>
            <input
              onChange={(e) => {
                setDiet(e.target.value);
              }}
              type="text"
              value={diet}
              placeholder="식단 이름 입력"
            />
            <Line />
          </DietInputContainer>
        </DietName>

        {/* 카트에 담긴 내용 */}
        <CartListBox>
          {cart_list.map((cart, idx) => {
            return <Card key={cart.foodId} {...cart} />;
          })}

          {cart_list.length === 0 ? (
            <></>
          ) : (
            <Grid
              width="45px"
              _onClick={() => {
                dispatch(delCartAll());
              }}
              cursor="pointer"
            >
              <Text
                color="#8C8C8C"
                size="13px"
                m_size="13px"
                lineheight="18px"
                m_lineheight="18px"
                cursor="pointer"
              >
                전체삭제
              </Text>
              <div style={{ border: "1px solid #8C8C8C" }}></div>
            </Grid>
          )}
        </CartListBox>

        {/* 식단 만들기 버튼*/}
        <CalcBox>
          <div
            onClick={() => {
              recordCustom();
            }}
          >
            <Text
              lineheight="22px"
              m_lineheight="20px"
              size="17px"
              m_size="15px"
              bold
              padding="0"
              margin="0"
              cursor="pointer"
            >
              식단 추가하기
            </Text>
          </div>
        </CalcBox>
      </BodyContainer>
    </React.Fragment>
  );
};

CartBodyDiet.defaultProps = {};

const BodyContainer = styled.div`
  position: relative;
  max-width: 420px;
  max-height: 70vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CartListBox = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2.5vh;
  padding-bottom: 24vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalcBox = styled.div`
  position: fixed;
  bottom: 9%;
  max-width: 420px;
  width: 100%;
  padding: 2vh 20px 2.8vh 20px;
  z-index: 60;
  background: #ffffff;

  & > div {
    width: 100%;
    height: 6.25vh;
    background: #ffe899;
    border: none;
    border-radius: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const DietName = styled.div`
  display: flex;
  margin: 5% 0px;
  padding: 0 7.6%;
`;

const DietInputContainer = styled.div`
  margin-top: 0.5%;
  width: 50%;

  & > input {
    width: 100%;
    border: none;
    outline: none;

    &::placeholder {
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
      color: #e6e6e6;
    }
  }
`;

const Line = styled.div`
  margin-top: 5%;
  background-color: #c4c4c4;
  width: 100%;
  border: 1px solid #6a6a6a;
`;

export default CartBodyDiet;
