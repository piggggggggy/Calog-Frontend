import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Cart_Card';
// icons
import { FaCircle } from "react-icons/fa";
// modules
import { cartOut } from '../redux/modules/cart';
// history
import { history } from '../redux/configStore';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 장바구니에 담은 값들
 * @담당자 : 박용태
*/

const CartBody = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const cart_list = useSelector((state) => state.cart.cart);
  const [type, setType] = useState("아침");
// useEffect

  // 장바구니에 담긴 food의 칼로리 합계
  const sumKcal = () => {
    let result = 0;
    cart_list.map((cart, idx) => {
      result = result + (cart.kcal*cart.amount)
    });
    return result
  };

  // 아침/점심/저녁/간식/야식 선택
  const selectType = (type) => {
    if(type === "morning") {
      setType("아침")
    }else if (type === "lunch") {
      setType("점심") 
    }else if (type === "dinner") {
      setType("저녁")
    }else if (type === "snack") {
      setType("간식")
    }else if (type === "midnightSnack") {
      setType("야식")
    };
  };

  // 기록하기
  const write = () => {
    dispatch(cartOut(type));
    history.push('/record');
  };

  return (
    <React.Fragment>
      <BodyContainer>
        
        {/* 상단 내용 // 모냥만 만든 상태 */}
        <Grid padding="0 9%">
          <Grid>
            <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" color="#EB5858" margin="0 0 4px 0" paddig="0">100kcal 초과했어요!</Text>
            <Text lineheight="41px" m_lineheight="38px" bold size="34px" m_size="28px" color="#2A2A2A" margin="0" paddig="0">{sumKcal()} kcal</Text>
          </Grid>

          <Grid display="flex" margin="3.5vh 0 0 0" m_margin="3.5vh 0 0 0">
            <div onClick={()=>{selectType("morning")}} style={{marginRight: "3vw" }}>
              <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "아침" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">아침</Text>
              <Dot>
                <Grid display={type === "아침" ? 'block' : 'none'}>
                  <FaCircle size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("lunch")}} style={{marginRight: "3%" }}>
              <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "점심" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">점심</Text>
              <Dot>
                <Grid display={type === "점심" ? 'block' : 'none'}>
                  <FaCircle size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("dinner")}} style={{marginRight: "3%" }}>
              <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "저녁" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">저녁</Text>
              <Dot>
                <Grid display={type === "저녁" ? 'block' : 'none'}>
                  <FaCircle size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("snack")}} style={{marginRight: "3%" }}>
              <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "간식" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">간식</Text>
              <Dot>
                <Grid display={type === "간식" ? 'block' : 'none'}>
                  <FaCircle size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("midnightSnack")}} style={{marginRight: "3%" }}>
              <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "야식" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">야식</Text>
              <Dot>
                <Grid display={type === "야식" ? 'block' : 'none'}>
                  <FaCircle size="7px"/>
                </Grid>
              </Dot>
            </div>
          </Grid>
        </Grid>

        <CartListBox>
          {cart_list.map((cart, idx) => {
            return <Card key={cart.foodId} {...cart}/>
          })}
        </CartListBox>

        <CalcBox>
          <div onClick={()=>{write()}}>
            <Text size="17px" m_size="15px" bold padding="0" margin="0">기록하러가기</Text>
          </div>
        </CalcBox>

      </BodyContainer>
    </React.Fragment>
  );
}

CartBody.defaultProps = {

}

const BodyContainer = styled.div`
  position: relative;
  max-width: 420px;
  max-height: 80vh;
  overflow: scroll;
  /* padding: 0 25px; */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CartListBox = styled.div`
  margin-top: 16px;
  padding-bottom: 14vh;

`;

const CalcBox = styled.div`
  position: fixed;
  bottom: 9%;
  max-width: 420px;
  width: 100%;
  padding: 2.8vh 20px;

  & > div {
    width: 100%;
    height: 6.25vh;
    background: #FFE899;
    border: none;
    border-radius: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Dot = styled.div`
  position: relative;
  float: right;
  margin-top: -70%;
`;

export default CartBody;