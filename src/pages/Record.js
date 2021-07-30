import React from 'react';
//컴포넌트
import BtnHeader from '../shared/BtnHeader';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 카트에 담은 칼로리 리스트를 본격적으로 기록하러 갈 수 있는 페이지
 * @담당자 : 김나영
*/

const Record = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      {/* 헤더 */}
      <BtnHeader title="기록하기" display="none"/>
    </React.Fragment>
  );
}

Record.defaultProps = {

}

export default Record;