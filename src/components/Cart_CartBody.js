import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// elements & components
import { Grid, Text } from '../elements';
import Card from './Cart_Card';
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
        <Grid is_flex padding="0 32px">
          <Grid>
            <Text lineheight="22px" size="17px" color="#EB5858" margin="0 0 4px 0" paddig="0">100kcal 초과했어요!</Text>
            <Text lineheight="41px" bold size="34px" color="#2A2A2A" margin="0" paddig="0">{sumKcal()} kcal</Text>
          </Grid>
          <Grid width="60px" display="flex" fd="column" jc="space-between" align-items="flex-end">
            <div  onClick={()=>{selectType("morning")}}>
              <Text lineheight="24px" bold size="20px" color={type === "아침" ? "black":"#C4C4C4"} margin="5px 0" padding="0">아침</Text>
            </div>
            <div onClick={()=>{selectType("lunch")}}>
              <Text lineheight="24px" bold size="20px" color={type === "점심" ? "black":"#C4C4C4"} margin="5px 0" padding="0">점심</Text>
            </div>
            <div onClick={()=>{selectType("dinner")}}>
              <Text lineheight="24px" bold size="20px" color={type === "저녁" ? "black":"#C4C4C4"} margin="5px 0" padding="0">저녁</Text>
            </div>
          </Grid>
        </Grid>

        <CartListBox>
          {cart_list.map((cart, idx) => {
            return <Card key={cart.foodId} {...cart}/>
          })}
        </CartListBox>

        <CalcBox>
          <div onClick={()=>{write()}}>기록하러가기</div>
        </CalcBox>

      </BodyContainer>
    </React.Fragment>
  );
}

CartBody.defaultProps = {

}

const BodyContainer = styled.div`
  max-width: 100%;
  /* padding: 0 25px; */
`;

const CartListBox = styled.div`
  margin-top: 32px;
  padding-bottom: 14vh;
`;

const CalcBox = styled.div`
  position: fixed;
  bottom: 9%;
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
export default CartBody;