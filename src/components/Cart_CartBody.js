import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// elements & components
import { Grid, Text } from '../elements';
import Card from './Cart_Card';
import Cart_Date from './Cart_Date';

// icons
import { FaCircle } from "react-icons/fa";

// modules
import { cartOut, delCartAll } from '../redux/modules/cart';
import { addCartDB } from '../redux/modules/record';

// history
import { history } from '../redux/configStore';

/** 
 * @param {*} props
 * @returns 장바구니 담긴 내용, 계산된 칼로리, 기초대사량과 비교
 * @역할 장바구니 역할
 * @담당자 : 박용태
*/

const CartBody = (props) => {

  const dispatch = useDispatch();

  // 카드 담긴 내용

  const cart = useSelector((state) => state.cart);

  const cart_list = cart.cart;

  const is_login = useSelector((state) => state.user.is_login);
  
  const user = useSelector((state) => state.user);

  // user를 이용한 칼로리 기록
  const bmr =!is_login ? 0 : user.user_info.bmr[0].bmr;

  // 대사량과 나의 칼로리 기록
  const record = useSelector((state) => state.record.record);
  const foodRecord = record.length === 0 ? [] : record[0]?.foodRecords;

  // 장바구니에 담긴 food의 칼로리 합계
  const sumKcal = () => {
    let result = 0;
    cart_list.map((cart, idx) => {
      result = result + (cart.kcal * cart.amount)
    });
    return result
  };

  // 아침/점심/저녁/간식/야식 선택
  const [type, setType] = useState("아침");

  const selectType = (type) => {
    if(type === "아침") {
      setType("아침");
      dispatch(cartOut(type));
    }else if (type === "점심") {
      setType("점심");
      dispatch(cartOut(type));
    }else if (type === "저녁") {
      setType("저녁");
      dispatch(cartOut(type));
    }else if (type === "간식") {
      setType("간식");
      dispatch(cartOut(type));
    }else if (type === "야식") {
      setType("야식");
      dispatch(cartOut(type));
    };
  };

  const recordDB = () => {
    if(is_login){
      dispatch(addCartDB(cart.date, cart_list, cart.type))
    } else {
      if (window.confirm('로그인이 필요해요! 로그인 페이지로 이동할까요?')) {
        history.push('/signsocial');
      };
    };
  };

  // 현재 남은(초과한) 칼로리 계산
  const totalKcal = () => {
    let result = 0
    if (foodRecord?.length !== 0) {
      foodRecord?.map((f, idx) => {
        result += f.resultKcal;
      });
      return result;
    } else {
      return 0;
    }
  };

  return (
    <React.Fragment>
      <BodyContainer>

        <Cart_Date/>
        
        <Grid padding="0 9%">
          {/* 상단 내용 */}
          <Grid>
            <Text lineheight="41px" m_lineheight="38px" bold size="34px" m_size="28px" color="#2A2A2A" margin="0" paddig="0">{Math.round(sumKcal() * 10)/10} kcal</Text>
            <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" color={totalKcal() >= bmr ? "#EB5858" : "#6993FF"} margin="0.9vh 0 0 0" paddig="0">
              {bmr === 0 ? "바디스펙이 없어 기초대사량 확인이 어려워요!" : 
              totalKcal() >= bmr ? 
              "오늘은 이미 기초대사량을 초과했어요!" 
              : `현재 기초대사량까지 ${Math.round((bmr - totalKcal())*10)/10} kcal 남았어요!`}
            </Text>
          </Grid>

          {/* 푸드 시간 타입 */}
          <Grid display="flex" margin="2.7vh 0 0 0" m_margin="2.7vh 0 0 0">
            <div onClick={()=>{selectType("아침")}} style={{marginRight: "3%" }}>
              <Text cursor="pointer" lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "아침" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">아침</Text>
              <Dot>
                <Grid display={type === "아침" ? 'block' : 'none'}>
                  <FaCircle color="#F19F13" size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("점심")}} style={{marginRight: "3%" }}>
              <Text cursor="pointer" lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "점심" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">점심</Text>
              <Dot>
                <Grid display={type === "점심" ? 'block' : 'none'}>
                  <FaCircle color="#F19F13" size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("저녁")}} style={{marginRight: "3%" }}>
              <Text cursor="pointer" lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "저녁" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">저녁</Text>
              <Dot>
                <Grid display={type === "저녁" ? 'block' : 'none'}>
                  <FaCircle color="#F19F13" size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("간식")}} style={{marginRight: "3%" }}>
              <Text cursor="pointer" lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "간식" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">간식</Text>
              <Dot>
                <Grid display={type === "간식" ? 'block' : 'none'}>
                  <FaCircle color="#F19F13" size="7px"/>
                </Grid>
              </Dot>
            </div>
            <div onClick={()=>{selectType("야식")}} style={{marginRight: "3%" }}>
              <Text cursor="pointer" lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold color={type === "야식" ? "black":"#C4C4C4"} padding="0" margin="0 10px 0 0">야식</Text>
              <Dot>
                <Grid display={type === "야식" ? 'block' : 'none'}>
                  <FaCircle color="#F19F13" size="7px"/>
                </Grid>
              </Dot>
            </div>
          </Grid>
        </Grid>

        {/* 카트에 담긴 내용 */}
        <CartListBox>
          
          {cart_list.map((cart, idx) => {
            return <Card key={cart.foodId} {...cart}/>
          })}

          {cart_list.length === 0 ?
            <></>
            :
            <Grid width="45px" _onClick={() => {dispatch(delCartAll())}} cursor="pointer">
              <Text color="#8C8C8C" size="13px" m_size="13px" lineheight="18px" m_lineheight="18px" cursor="pointer">전체삭제</Text>
              <Line></Line>
            </Grid>
          }
          
        </CartListBox>

        
        {/* 기록하기 버튼*/}
          <CalcBox>
            <div onClick={()=>{recordDB()}}>
              <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold padding="0" margin="0" cursor="pointer">기록하기</Text>
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
  max-height: 75vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-height: 750px) {
    max-height: 70vh;

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
  background: #FFFFFF;

  & > div {
    width: 100%;
    height: 6.25vh;
    background: #FFE899;
    border: none;
    border-radius: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Dot = styled.div`
  position: relative;
  float: right;
  margin-top: -70%;
`;

const Line = styled.div`
  border: 1px solid #8C8C8C;
`;

export default CartBody;