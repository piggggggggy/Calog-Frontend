import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// modules
import { getRecentDB } from '../redux/modules/recent';
import { getFavoriteDB } from '../redux/modules/favorite';
import { getRecommendedDB, getMostUsedKeyDB } from '../redux/modules/search';

// elements & components
import MainBody from '../components/Main_MainBody';
import LogoHeader from '../shared/LogoHeader';
import Loading from './Loading4';

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
    </React.Fragment>
  );
}

Main.defaultProps = {

}

export default Main;