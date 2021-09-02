import React, { useState } from "react";

// elements & components
import BtnHeader from "../shared/BtnHeader";
import CartBody from "../components/Cart_CartBody";
import CartBodyDiet from "../components/Cart_CartBody_Diet";

import styled from "styled-components";
import { Text } from "../elements";
/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @담당자 : 박용태
 */

const Cart = () => {
  const [selectNav, setSelect] = useState(0);

  return (
    <React.Fragment>
      <BtnHeader title="음식담기" />
      <Nav>
        <div
          onClick={() => {
            setSelect(0);
          }}
        >
          <Text
            size="15px"
            m_size="13px"
            lineheight="22px"
            m_lineheight="20px"
            color="#111E30"
            cursor="pointer"
          >
            캘린더에 기록
          </Text>
        </div>
        <div
          onClick={() => {
            setSelect(1);
          }}
        >
          <Text
            size="15px"
            m_size="13px"
            lineheight="22px"
            m_lineheight="20px"
            color="#111E30"
            cursor="pointer"
          >
            식단 만들기
          </Text>
        </div>
      </Nav>
      <Line>
        <div style={selectNav === 0 ? { left: "7.6%" } : { left: "50%" }} />
      </Line>
      {selectNav === 0 ? <CartBody /> : <CartBodyDiet />}
    </React.Fragment>
  );
};

Cart.defaultProps = {};

const Nav = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 0 7.6%;

  & > div {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
`;

const Line = styled.div`
  position: relative;
  margin-top: 2%;
  margin-bottom: 3%;
  height: 1px;
  background-color: #c4c4c4;
  width: 100%;

  & > div {
    position: absolute;
    width: 42.4%;
    /* left: 7.6%; */
    bottom: 0;
    border: 1px solid black;
    transition: 0.5s ease;
  }
`;

export default Cart;
