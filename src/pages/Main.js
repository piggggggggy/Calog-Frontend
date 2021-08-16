import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// modules
import { getRecentDB } from '../redux/modules/recent';
import { getFavoriteDB } from '../redux/modules/favorite';
import { getRecommendedDB, getMostUsedKeyDB } from '../redux/modules/search';

// elements & components
import MainBody from '../components/Main_MainBody';
import LogoHeader from '../shared/LogoHeader';

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

  // 최근검색어, 즐겨찾기, 추천음식, 인기검색어
  useEffect(() => {
    if (is_login) {
      dispatch(getRecentDB());
      dispatch(getFavoriteDB());
    }
    dispatch(getRecommendedDB())
    dispatch(getMostUsedKeyDB());

  }, []);

  return (
    <React.Fragment>
      
      {/* 헬멧 */}
      <Helmet>
        <title>[Calog] 칼로리 검색</title>
        <meta property="og:title" content="[Calog] 칼로리 검색" />
        <meta property="og:description" content="내가 먹는 모든 음식의 칼로리가 궁금하다면?" />
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