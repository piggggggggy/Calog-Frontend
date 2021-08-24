import React from 'react';
import { useSelector } from 'react-redux';

// elements & components
import BtnHeader from '../shared/BtnHeader';
import MSBody from '../components/MainSearch_MSBody';
import Loading from './Loading4';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const MainSearch = (props) => {

  const keyword = props.match.params.keyword;
  const is_loaded = useSelector((state) => state.record.is_loaded);

  // 스피너
  if (!is_loaded) {
    return <Loading/>
  }

  return (
    <React.Fragment>
      <BtnHeader title="검색결과"/>
      <MSBody keyword={keyword}/>
    </React.Fragment>
  );
}

MainSearch.defaultProps = {

}

export default MainSearch;