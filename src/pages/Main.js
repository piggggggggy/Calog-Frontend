import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// css
import styled from 'styled-components';

// modules
import { getRecentDB } from '../redux/modules/recent';
import { getFavoriteDB } from '../redux/modules/favorite';
import { getRecommendedDB, getMostUsedKeyDB } from '../redux/modules/search';
import { ChkModal } from '../redux/modules/dashboard';

// elements & components
import MainBody from '../components/Main_MainBody';
import LogoHeader from '../shared/LogoHeader';
import Loading from './Loading4';
import Modal from '../components/Modal';

// helmet
import {Helmet} from 'react-helmet';

/** 
 * @param {*} props
 * @returns Header, MainBody
 * @역할 Main 페이지
 * @담당자 : 박용태
*/

const Main = (props) => {

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const is_loaded = useSelector((state) => state.record.is_loaded);

  // 최근검색어, 즐겨찾기, 추천음식, 인기검색어
  useEffect(() => {
    if (is_login) {
      dispatch(getRecentDB());
      dispatch(getFavoriteDB());
    }
    dispatch(getRecommendedDB())
    dispatch(getMostUsedKeyDB());

  }, []);

  // 홈 화면 추가 안내
  const ModalState = useSelector((state) => state.dashboard.chk_modal)
  const [addHome, setAddHome] = useState(ModalState)
  const [modal, setModal] = useState(true)
  const close = (e) => {
    const clicked = e.target.closest('.info');
    if (clicked) return;
    else {
      setModal(false)
      dispatch(ChkModal(true))
    }
  }

  if (!is_loaded) {
    return <Loading/>;
  }

  return (
    <React.Fragment>
      
      {/* 헬멧 */}
      <Helmet>
        <title>[Calog] 칼로리 검색</title>
      </Helmet>

      <LogoHeader/>
      <MainBody/>

    {window.navigator.standalone === addHome && (
      <Add onClick={close} >
        <Modal title="addHome" open={modal} className="info"/>
      </Add>
    )}
    </React.Fragment>
  );
}

const Add = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

export default Main;