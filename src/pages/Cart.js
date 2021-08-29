import React, {useState} from 'react';

// elements & components
import BtnHeader from '../shared/BtnHeader';
import CartBody from '../components/Cart_CartBody';
import CartBodyDiet from '../components/Cart_CartBody_Diet';

import styled from 'styled-components';
import { Text } from '../elements';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @담당자 : 박용태
*/

const Cart = (props) => {
const [selectNav, setSelect] = useState(0);


  return (
    <React.Fragment>
      <BtnHeader title="음식담기"/>
      <Nav>
        <Text size="15px" lineheight="22px" color="#111E30">
          <div onClick={()=>{setSelect(0)}}>캘린더에 기록</div>
        </Text>
        <Text size="15px" lineheight="22px" color="#111E30">
          <div onClick={()=>{setSelect(1)}}>식단 만들기</div>
        </Text>
      </Nav>
      <Line/>
      {selectNav===0?
      <CartBody/>
      :
      <CartBodyDiet/>
      }
    </React.Fragment>
  );
}

Cart.defaultProps = {

}


const Nav = styled.div`
  display: flex;
`;

const Line = styled.div`
  margin-top: 2%;
  margin-bottom: 3%;
  height: 1px;
  background-color: #C4C4C4;
  width: 100%;
`;


export default Cart;