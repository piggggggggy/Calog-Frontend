import React from 'react';
// elements & components
import BtnHeader from '../shared/BtnHeader';
import FDbody from '../components/FoodDetail_FDbody';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 푸드Id에 해당하는 상세 푸드 데이터
 * @담당자 : 박용태
*/

const FoodDetail = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <BtnHeader title="칼로리 상세"/>
      <FDbody/>
    </React.Fragment>
  );
}

FoodDetail.defaultProps = {

}

export default FoodDetail;