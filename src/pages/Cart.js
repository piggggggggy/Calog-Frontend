import React from 'react';

// elements & components
import BtnHeader from '../shared/BtnHeader';
import CartBody from '../components/Cart_CartBody';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @담당자 : 박용태
*/

const Cart = (props) => {

  return (
    <React.Fragment>
      <BtnHeader title="음식담기"/>
      <CartBody/>
    </React.Fragment>
  );
}

Cart.defaultProps = {

}

export default Cart;