import React, {useEffect, useState} from 'react';
import {Grid} from '../elements';
import styled from 'styled-components';
//history
import {history} from '../redux/configStore';
//redux
import {useSelector} from 'react-redux';


const Nav = (props) => {
  
  const [url, setUrl] = useState();
  const currentUrl = window.location.pathname;
  
  useEffect(() => {
    setUrl(currentUrl);
  },[])

  const navOn = (url) => {
    history.push(url);
    setUrl(window.location.pathname)
  }

  const is_login = useSelector((state) => state.user.is_login)

  // 캘린더 로그인/비로그인
  const CalendarBtn = () => {
    is_login ? navOn('/loading/calendar') : navOn('/calendar')
  }

  return (
    <React.Fragment>
      <Wrap>
        {/* 칼로리 사전 */}
          <Grid width="auto" margin="auto 0" _onClick={() => navOn('/')}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 22.3332H21.3333V10.3039L12 3.04521L2.66667 10.3039V22.3332H10.6667V14.3332H13.3333V22.3332ZM24 23.6665C24 24.0202 23.8595 24.3593 23.6095 24.6093C23.3594 24.8594 23.0203 24.9999 22.6667 24.9999H1.33333C0.979712 24.9999 0.640573 24.8594 0.390525 24.6093C0.140476 24.3593 3.20947e-07 24.0202 3.20947e-07 23.6665V9.65321C-0.000140645 9.45002 0.0461562 9.2495 0.135355 9.06694C0.224553 8.88438 0.354294 8.72463 0.514667 8.59987L11.1813 0.303874C11.4154 0.121802 11.7035 0.0229492 12 0.0229492C12.2965 0.0229492 12.5846 0.121802 12.8187 0.303874L23.4853 8.59987C23.6457 8.72463 23.7754 8.88438 23.8646 9.06694C23.9538 9.2495 24.0001 9.45002 24 9.65321V23.6665Z"
                fill={url === "/" ? '#F19F13' : "black"}/>
            </svg>
          </Grid>
        {/* 대시보드 */}
          <Grid width="auto" margin="auto 0" _onClick={() => navOn('/dashboard')}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.666 3.26676H25.9993C26.353 3.26676 26.6921 3.40724 26.9422 3.65729C27.1922 3.90734 27.3327 4.24648 27.3327 4.6001V25.9334C27.3327 26.287 27.1922 26.6262 26.9422 26.8762C26.6921 27.1263 26.353 27.2668 25.9993 27.2668H1.99935C1.64573 27.2668 1.30659 27.1263 1.05654 26.8762C0.806491 26.6262 0.666016 26.287 0.666016 25.9334V4.6001C0.666016 4.24648 0.806491 3.90734 1.05654 3.65729C1.30659 3.40724 1.64573 3.26676 1.99935 3.26676H7.33268V0.600098H9.99935V3.26676H17.9993V0.600098H20.666V3.26676ZM17.9993 5.93343H9.99935V8.6001H7.33268V5.93343H3.33268V11.2668H24.666V5.93343H20.666V8.6001H17.9993V5.93343ZM24.666 13.9334H3.33268V24.6001H24.666V13.9334ZM5.99935 17.9334H8.66602V20.6001H5.99935V17.9334ZM11.3327 17.9334H21.9993V20.6001H11.3327V17.9334Z"
                fill={url === "/dashboard" ? '#F19F13' : "black"}/>
            </svg>
          </Grid>
        {/* 캘린더 */}
          <Grid width="auto" margin="auto 0" _onClick={CalendarBtn}>
            <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.667969 13.5333H8.66797V24.2H0.667969V13.5333ZM19.3346 6.86662H27.3346V24.2H19.3346V6.86662ZM10.0013 0.199951H18.0013V24.2H10.0013V0.199951ZM3.33464 16.2V21.5333H6.0013V16.2H3.33464ZM12.668 2.86662V21.5333H15.3346V2.86662H12.668ZM22.0013 9.53329V21.5333H24.668V9.53329H22.0013Z"
                fill={url === "/calendar" ? '#F19F13' : "black"}/>
            </svg>
          </Grid>
        {/* 마이페이지 */}
          <Grid width="auto" margin="auto 0" _onClick={() => navOn('/body')}>
            <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 25C0 22.4741 1.05357 20.0517 2.92893 18.2656C4.8043 16.4796 7.34784 15.4762 10 15.4762C12.6522 15.4762 15.1957 16.4796 17.0711 18.2656C18.9464 20.0517 20 22.4741 20 25H17.5C17.5 23.1056 16.7098 21.2888 15.3033 19.9492C13.8968 18.6097 11.9891 17.8571 10 17.8571C8.01088 17.8571 6.10322 18.6097 4.6967 19.9492C3.29018 21.2888 2.5 23.1056 2.5 25H0ZM10 14.2857C5.85625 14.2857 2.5 11.0893 2.5 7.14286C2.5 3.19643 5.85625 0 10 0C14.1438 0 17.5 3.19643 17.5 7.14286C17.5 11.0893 14.1438 14.2857 10 14.2857ZM10 11.9048C12.7625 11.9048 15 9.77381 15 7.14286C15 4.51191 12.7625 2.38095 10 2.38095C7.2375 2.38095 5 4.51191 5 7.14286C5 9.77381 7.2375 11.9048 10 11.9048Z"
                fill={url === "/body" ? '#F19F13' : "black"}/>
            </svg>
          </Grid>
      </Wrap>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  width: 100%;
  max-width: 420px;
  min-height: 9.3%;
  position: fixed;
  bottom: 0;
  z-index: 500;
`;

export default Nav;