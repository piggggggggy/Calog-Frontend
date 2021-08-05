import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// modules
import { getRecentDB } from '../redux/modules/recent';
// elements & components
import MainBody from '../components/Main_MainBody';
import LogoHeader from '../shared/LogoHeader';
// import 

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const Main = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
// useEffect
  useEffect(() => {
    dispatch(getRecentDB());
  }, []);


  return (
    <React.Fragment>
      <LogoHeader/>
      <MainBody/>
    </React.Fragment>
  );
}

Main.defaultProps = {

}

export default Main;