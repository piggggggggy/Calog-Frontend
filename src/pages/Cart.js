import React from 'react';
// elements & components
import BtnHeader from '../shared/BtnHeader';
import CartBody from '../components/Cart_CartBody';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const Cart = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <BtnHeader/>
      <CartBody/>
    </React.Fragment>
  );
}

Cart.defaultProps = {

}

export default Cart;