import React from 'react';
import styled from 'styled-components';
// elements & components
import MainBody from '../components/Main_MainBody';
import LogoHeader from '../shared/LogoHeader';
import BtnHeader from '../shared/BtnHeader';
import MSBody from '../components/MainSearch_MSBody';
// import 

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const MainSearch = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <BtnHeader title="검색결과"/>
      <MSBody/>
    </React.Fragment>
  );
}

MainSearch.defaultProps = {

}

export default MainSearch;