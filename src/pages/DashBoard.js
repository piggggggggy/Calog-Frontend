import React from 'react';
// import LogoHeader from '../shared/LogoHeader';
import BtnHeader from '../shared/BtnHeader';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const DashBoard = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      {/* <LogoHeader /> */}
      <BtnHeader />
    </React.Fragment>
  );
}

DashBoard.defaultProps = {

}

export default DashBoard;