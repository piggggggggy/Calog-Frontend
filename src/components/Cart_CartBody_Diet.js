import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// elements & components
import { Grid, Text, Input, Button } from '../elements';
import Card from './Cart_Card';

// modules
import { addRecordDB } from '../redux/modules/record';
import { CustomSV } from '../redux/modules/DietCustom';

// history
import { history } from '../redux/configStore';

/** 
 * @param {*} props
 * @returns 장바구니 담긴 내용, 계산된 칼로리, 기초대사량과 비교
 * @역할 장바구니 역할
 * @담당자 : 박용태
*/

const CartBodyDiet = (props) => {

  const dispatch = useDispatch();

  // 카드 담긴 내용
  const cart = useSelector((state) => state.cart);
  const cart_list = cart.cart;
  const is_login = useSelector((state) => state.user.is_login);
  
  // 최근삭제목록의 유무확인을 위한...
  const user_info = useSelector((state) => state.user.user_info);
  const _recentDeleted_list = is_login ? user_info.deleteList : undefined;
  const recentDeleted_list = _recentDeleted_list === undefined ? [] : _recentDeleted_list;

  const recordCustom = () => {
    if(is_login){
      dispatch(CustomSV(diet, cart.cart));
      history.push('/');
    } else {
      if (window.confirm('로그인이 필요해요! 로그인 페이지로 이동할까요?')) {
        history.push('/signsocial');
      };
    };
  };

  const [diet, setDiet] = useState("");

  return (
    <React.Fragment>
      <BodyContainer>
        {/* 식단 이름 */}
        <DietName>
            <DietInputContainer>
                <Input _onChange={(e)=>{setDiet(e.target.value)}} type="text" value={diet} width="150%" border="none" placeholder="식단 이름 입력"/>
                <Line/>
            </DietInputContainer>
            <Button width="15%" height="5vh" bg="#6A6A6A" border_radius="6px">
                <Text color="#FFFFFF" size="13px">완료</Text>
            </Button>
        </DietName>
        
        {/* 카트에 담긴 내용 */}
        <CartListBox>
          {cart_list.map((cart, idx) => {
            return <Card key={cart.foodId} {...cart}/>
          })}
        </CartListBox>

        
        {/* 식단 만들기 버튼*/}
          <CalcBox style={!is_login || recentDeleted_list.length === 0 ? {bottom: "9%"} : {bottom: "21%"}}>
            <div onClick={()=>{recordCustom()}}>
              <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" bold padding="0" margin="0" cursor="pointer">식단 추가하기</Text>
            </div>
          </CalcBox>

      </BodyContainer>
    </React.Fragment>
  );
}

CartBodyDiet.defaultProps = {

}

const BodyContainer = styled.div`
  position: relative;
  max-width: 420px;
  max-height: 70vh;
  overflow: scroll;
  /* padding-top: 3vh; */

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
  /* gap: 2vh; */
`;

const CalcBox = styled.div`
  position: fixed;
  /* bottom: 21%; */
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

const DietName = styled.div`
    display: flex;
    margin: 5% 0px;
`;

const DietInputContainer = styled.div`
    margin-top: 0.5%;
    margin-left: 5%;
    margin-right: -3%;
`;

const Line = styled.div`
  margin-top: 5%;
  background-color: #C4C4C4;
  width: 150%;
  border: 1px solid #6A6A6A;
`;

export default CartBodyDiet;