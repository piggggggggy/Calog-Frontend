import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// css
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
import { MdAddBox } from "react-icons/md";

// modules
import { getRecentDB } from '../redux/modules/recent';
import { getFavoriteDB } from '../redux/modules/favorite';
import { getRecommendedDB, getMostUsedKeyDB } from '../redux/modules/search';

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
  const [display, setDisplay] = useState(false)
  const close = (e) => {
    const clicked = e.target.closest('.info');
    if (clicked) return;
    else {
      setDisplay(true);
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
        <meta property="og:image" content="%PUBLIC_URL%/icons/helmet.png" />
      </Helmet>

      <LogoHeader/>
      <MainBody/>

    {window.navigator.standalone === {display} && (
      <Add onClick={close} >
        <AddHome className="info">
          <Grid is_flex width="95%" margin="auto" m_margin="auto">
            <MdAddBox size="30px" color={theme.color.gray_7}/>
            <Text margin="auto 2%" m_size="12px">홈 화면에 추가하면 앱처럼 사용할 수 있어요!</Text>
          </Grid>
        </AddHome>
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
  margin-bottom: 13%;
  background-color: rgba(30, 30, 30, 0.3);
  z-index: 1000;
  text-align: center;
`;

const AddHome = styled.div`
  position: absolute;
  background-color: ${theme.color.light};
  width: 98%;
  height: 8vh;
  bottom: 0;
  left: 1%;
  right: 1%;
  margin: 0 auto 5% auto;
  padding: 3.5% 6%;
  border-radius: 10px;
  z-index: 200;

  @media ${theme.device.mobileM} {
    padding: 2% 6%;
  }
`;

export default Main;