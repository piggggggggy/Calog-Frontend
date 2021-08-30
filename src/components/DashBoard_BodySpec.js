import React, { useState } from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import theme from '../shared/theme';

// 데이터
import {useDispatch, useSelector} from 'react-redux';
import {addBodySpecDB} from '../redux/modules/dashboard';

/** 
 * @역할  대시보드 바디스펙 컴포넌트
 * @필수값  유저의 바디스펙(키, 몸무게, bmr)
 * @담당자  김나영
*/

const DashBoard_BodySpec = (props) => {
  const dispatch = useDispatch();

  const {height, weight, bmr, is_login} = props;

  //바디스펙 블라인드
  const blind = useSelector((state) => state.dashboard.specBlind)

  // 키 on off
  // debounce
  // TODO 우선 배포 후 상황에 따라 디바운스 유지
  // const height_debounce = _.debounce((k) =>
  //   is_login && (k === "hHide" ? dispatch(addBodySpecDB("height_true")) : dispatch(addBodySpecDB("height_false")), 300));
  // const height_keyPress = useCallback(height_debounce, []);

  const [heightShow, setHeightShow] = useState({
    hShow: blind.height_blind === true ? "block" : "none",
    hHide: blind.height_blind === true ? "none" : "block"
  });
  const {hShow, hHide} = heightShow;
  const heightOn = (e) => {
    setHeightShow({
      hShow: "none",
      hHide: "block",
    })
    // height_keyPress(e.target.id);
    is_login && dispatch(addBodySpecDB("height_false"))
  };
  const heightOff = (e) => {
    setHeightShow({
      hShow: "block",
      hHide: "none",
    })
    // height_keyPress(e.target.id);
    is_login && dispatch(addBodySpecDB("height_true"))
  };

  // 몸무게 on off
  // debounce
  // TODO 우선 배포 후 상황에 따라 디바운스 유지
  // const weight_debounce = _.debounce((k) =>
  //   is_login && (k === "wHide" ? dispatch(addBodySpecDB("weight_true")) : dispatch(addBodySpecDB("weight_false")), 300));
  // const weight_keyPress = useCallback(weight_debounce, []);

  const [weightShow, setWeightShow] = useState({
    wShow: blind.weight_blind === true ? "block" : "none",
    wHide: blind.weight_blind === true ? "none" : "block"
  });
  const {wShow, wHide} = weightShow;
  const weightOn = (e) => {
    setWeightShow({
      wShow: "none",
      wHide: "block",
    })
    // weight_keyPress(e.target.id);
    is_login && dispatch(addBodySpecDB("weight_false"))
  };
  const weightOff = (e) => {
    setWeightShow({
      wShow: "block",
      wHide: "none",
    })
    // weight_keyPress(e.target.id);
    is_login && dispatch(addBodySpecDB("weight_true"))
  };

  // 기초대사량 on off
  // debounce
  // TODO 우선 배포 후 상황에 따라 디바운스 유지
  // const bmr_debounce = _.debounce((k) =>
  //   is_login && (k === "kHide" ? dispatch(addBodySpecDB("bmr_true")) : dispatch(addBodySpecDB("bmr_false")), 300));
  // const bmr_keyPress = useCallback(bmr_debounce, []);

  const [kcalShow, setKcalShow] = useState({
    kShow: blind.bmr_blind === true ? "block" : "none",
    kHide: blind.bmr_blind === true ? "none" : "block"
  });
  const {kShow, kHide} = kcalShow;
  const kcalOn = (e) => {
    setKcalShow({
      kShow: "none",
      kHide: "block",
    })
    // bmr_keyPress(e.target.id);
    is_login && dispatch(addBodySpecDB("bmr_false"))
  };
  const kcalOff = (e) => {
    setKcalShow({
      kShow: "block",
      kHide: "none",
    })
    // bmr_keyPress(e.target.id);
    is_login && dispatch(addBodySpecDB("bmr_true"))
  };

  return (
    <React.Fragment>
      <Wrap>
        <Grid is_flex text_align="center">

          {/* 키 */}
          <Grid>
            <Text size="12px" m_size="11px">키</Text>
            <Grid display={hHide} m_margin="11% 0 0 0">
              <Text size="13px" bold margin="10% 0 0 0" m_size="12px">{height === "" ? 0 : height}cm</Text>
            </Grid>
            <Grid display={hShow}>
              <Text size="13px" bold margin="10% 0 0 0" m_size="12px">나만의 비밀☝🏻</Text>
            </Grid>

            {/* 숨김/표시 버튼 */}
            <Grid margin="10% 0 0 0" m_margin="10% 0 0 0" >
              <Grid display={hShow} _onClick={heightOn}>
                <Svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="hShow" d="M8 10.5901C10.7564 10.5901 13.2145 9.14412 14.4145 6.8564C13.9855 6.0282 13.3818 5.3154 12.6618 4.73838L13.6873 3.7812C14.6982 4.61619 15.4982 5.66162 16 6.8564C14.7418 9.83655 11.6364 11.9478 8 11.9478C7.07636 11.9478 6.18909 11.812 5.35273 11.5608L6.55273 10.4407C7.02545 10.529 7.50545 10.5901 8 10.5901ZM7.22182 9.81619L8.72727 8.41097C9.14182 8.24125 9.47636 7.92898 9.65818 7.54204L11.1636 6.13681C11.2218 6.36762 11.2655 6.61201 11.2655 6.86319C11.2727 8.54674 9.80364 9.91123 8 9.91123C7.73091 9.91123 7.47636 9.87728 7.22182 9.81619ZM0.734545 12.036L2.68364 10.2167C1.49818 9.34778 0.56 8.19373 0 6.8564C1.25818 3.87624 4.36364 1.76501 8 1.76501C9.10545 1.76501 10.1673 1.96188 11.1418 2.32167L13.6291 0L14.6545 0.95718L1.76 13L0.734545 12.036ZM6.18909 6.94465L8.08727 5.17285C8.05818 5.16606 8.02909 5.15927 8 5.15927C6.99636 5.15927 6.18182 5.91958 6.18182 6.8564C6.18182 6.89034 6.18909 6.9107 6.18909 6.94465ZM3.71636 9.25274L4.98909 8.06475C4.82182 7.69138 4.72727 7.28407 4.72727 6.8564C4.72727 5.17285 6.19636 3.80157 8 3.80157C8.45818 3.80157 8.89455 3.88982 9.28727 4.04595L10 3.38068C9.36 3.21775 8.69091 3.12271 8 3.12271C5.24364 3.12271 2.78545 4.56867 1.58545 6.8564C2.09455 7.82715 2.83636 8.6282 3.71636 9.25274Z" fill="#9B9B9B"/>
                </Svg>
              </Grid>
              <Grid display={hHide} _onClick={heightOff}>
                <Svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="hHide" d="M8 9.53333C10.7564 9.53333 13.2145 7.97133 14.4145 5.5C13.2145 3.02867 10.7564 1.46667 8 1.46667C5.24364 1.46667 2.78545 3.02867 1.58545 5.5C2.78545 7.97133 5.24364 9.53333 8 9.53333ZM8 11C4.36364 11 1.25818 8.71933 0 5.5C1.25818 2.28067 4.36364 0 8 0C11.6364 0 14.7418 2.28067 16 5.5C14.7418 8.71933 11.6364 11 8 11ZM8 7.33333C9.00364 7.33333 9.81818 6.512 9.81818 5.5C9.81818 4.488 9.00364 3.66667 8 3.66667C6.99636 3.66667 6.18182 4.488 6.18182 5.5C6.18182 6.512 6.99636 7.33333 8 7.33333ZM8 8.8C6.19636 8.8 4.72727 7.31867 4.72727 5.5C4.72727 3.68133 6.19636 2.2 8 2.2C9.80364 2.2 11.2727 3.68133 11.2727 5.5C11.2727 7.31867 9.80364 8.8 8 8.8Z" fill="#9B9B9B"/>
                </Svg>
              </Grid>
            </Grid>
          </Grid> 

          {/* 몸무게 */}
          <Grid>
            <Text size="12px" m_size="11px">몸무게</Text>
            <Grid display={wHide} m_margin="11% 0 0 0">
              <Text size="13px" bold margin="10% 0 0 0" m_size="12px">{weight}kg</Text>
            </Grid>
            <Grid display={wShow}>
              <Text size="13px" bold margin="10% 0 0 0" m_size="12px">나만의 비밀☝🏻</Text>
            </Grid>

            {/* 숨김/표시 버튼 */}
            <Grid margin="10% 0 0 0" m_margin="10% 0 0 0" cursor="pointer">
              <Grid display={wShow} _onClick={weightOn}>
                <Svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="wShow" d="M8 10.5901C10.7564 10.5901 13.2145 9.14412 14.4145 6.8564C13.9855 6.0282 13.3818 5.3154 12.6618 4.73838L13.6873 3.7812C14.6982 4.61619 15.4982 5.66162 16 6.8564C14.7418 9.83655 11.6364 11.9478 8 11.9478C7.07636 11.9478 6.18909 11.812 5.35273 11.5608L6.55273 10.4407C7.02545 10.529 7.50545 10.5901 8 10.5901ZM7.22182 9.81619L8.72727 8.41097C9.14182 8.24125 9.47636 7.92898 9.65818 7.54204L11.1636 6.13681C11.2218 6.36762 11.2655 6.61201 11.2655 6.86319C11.2727 8.54674 9.80364 9.91123 8 9.91123C7.73091 9.91123 7.47636 9.87728 7.22182 9.81619ZM0.734545 12.036L2.68364 10.2167C1.49818 9.34778 0.56 8.19373 0 6.8564C1.25818 3.87624 4.36364 1.76501 8 1.76501C9.10545 1.76501 10.1673 1.96188 11.1418 2.32167L13.6291 0L14.6545 0.95718L1.76 13L0.734545 12.036ZM6.18909 6.94465L8.08727 5.17285C8.05818 5.16606 8.02909 5.15927 8 5.15927C6.99636 5.15927 6.18182 5.91958 6.18182 6.8564C6.18182 6.89034 6.18909 6.9107 6.18909 6.94465ZM3.71636 9.25274L4.98909 8.06475C4.82182 7.69138 4.72727 7.28407 4.72727 6.8564C4.72727 5.17285 6.19636 3.80157 8 3.80157C8.45818 3.80157 8.89455 3.88982 9.28727 4.04595L10 3.38068C9.36 3.21775 8.69091 3.12271 8 3.12271C5.24364 3.12271 2.78545 4.56867 1.58545 6.8564C2.09455 7.82715 2.83636 8.6282 3.71636 9.25274Z" fill="#9B9B9B"/>
                </Svg>
              </Grid>
              <Grid display={wHide} _onClick={weightOff}>
                <Svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="wHide" d="M8 9.53333C10.7564 9.53333 13.2145 7.97133 14.4145 5.5C13.2145 3.02867 10.7564 1.46667 8 1.46667C5.24364 1.46667 2.78545 3.02867 1.58545 5.5C2.78545 7.97133 5.24364 9.53333 8 9.53333ZM8 11C4.36364 11 1.25818 8.71933 0 5.5C1.25818 2.28067 4.36364 0 8 0C11.6364 0 14.7418 2.28067 16 5.5C14.7418 8.71933 11.6364 11 8 11ZM8 7.33333C9.00364 7.33333 9.81818 6.512 9.81818 5.5C9.81818 4.488 9.00364 3.66667 8 3.66667C6.99636 3.66667 6.18182 4.488 6.18182 5.5C6.18182 6.512 6.99636 7.33333 8 7.33333ZM8 8.8C6.19636 8.8 4.72727 7.31867 4.72727 5.5C4.72727 3.68133 6.19636 2.2 8 2.2C9.80364 2.2 11.2727 3.68133 11.2727 5.5C11.2727 7.31867 9.80364 8.8 8 8.8Z" fill="#9B9B9B"/>
                </Svg>
              </Grid>
            </Grid>
          </Grid> 

          {/* 기초대사량 */}
          <Grid>
            <Text size="12px" m_size="11px">기초대사량</Text>
            <Grid display={kHide} m_margin="11% 0 0 0">
              <Text size="13px" bold margin="10% 0 0 0" m_size="12px">{bmr}kcal</Text>
            </Grid>
            <Grid display={kShow}>
              <Text size="13px" bold margin="10% 0 0 0" m_size="12px">나만의 비밀☝🏻</Text>
            </Grid>
            
            {/* 숨김/표시 버튼 */}
            <Grid margin="10% 0 0 0" m_margin="10% 0 0 0" cursor="pointer">
              <Grid display={kShow} _onClick={kcalOn}>
                <Svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="kShow" d="M8 10.5901C10.7564 10.5901 13.2145 9.14412 14.4145 6.8564C13.9855 6.0282 13.3818 5.3154 12.6618 4.73838L13.6873 3.7812C14.6982 4.61619 15.4982 5.66162 16 6.8564C14.7418 9.83655 11.6364 11.9478 8 11.9478C7.07636 11.9478 6.18909 11.812 5.35273 11.5608L6.55273 10.4407C7.02545 10.529 7.50545 10.5901 8 10.5901ZM7.22182 9.81619L8.72727 8.41097C9.14182 8.24125 9.47636 7.92898 9.65818 7.54204L11.1636 6.13681C11.2218 6.36762 11.2655 6.61201 11.2655 6.86319C11.2727 8.54674 9.80364 9.91123 8 9.91123C7.73091 9.91123 7.47636 9.87728 7.22182 9.81619ZM0.734545 12.036L2.68364 10.2167C1.49818 9.34778 0.56 8.19373 0 6.8564C1.25818 3.87624 4.36364 1.76501 8 1.76501C9.10545 1.76501 10.1673 1.96188 11.1418 2.32167L13.6291 0L14.6545 0.95718L1.76 13L0.734545 12.036ZM6.18909 6.94465L8.08727 5.17285C8.05818 5.16606 8.02909 5.15927 8 5.15927C6.99636 5.15927 6.18182 5.91958 6.18182 6.8564C6.18182 6.89034 6.18909 6.9107 6.18909 6.94465ZM3.71636 9.25274L4.98909 8.06475C4.82182 7.69138 4.72727 7.28407 4.72727 6.8564C4.72727 5.17285 6.19636 3.80157 8 3.80157C8.45818 3.80157 8.89455 3.88982 9.28727 4.04595L10 3.38068C9.36 3.21775 8.69091 3.12271 8 3.12271C5.24364 3.12271 2.78545 4.56867 1.58545 6.8564C2.09455 7.82715 2.83636 8.6282 3.71636 9.25274Z" fill="#9B9B9B"/>
                </Svg>
              </Grid>
              <Grid display={kHide} _onClick={kcalOff}>
                <Svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="kHide" d="M8 9.53333C10.7564 9.53333 13.2145 7.97133 14.4145 5.5C13.2145 3.02867 10.7564 1.46667 8 1.46667C5.24364 1.46667 2.78545 3.02867 1.58545 5.5C2.78545 7.97133 5.24364 9.53333 8 9.53333ZM8 11C4.36364 11 1.25818 8.71933 0 5.5C1.25818 2.28067 4.36364 0 8 0C11.6364 0 14.7418 2.28067 16 5.5C14.7418 8.71933 11.6364 11 8 11ZM8 7.33333C9.00364 7.33333 9.81818 6.512 9.81818 5.5C9.81818 4.488 9.00364 3.66667 8 3.66667C6.99636 3.66667 6.18182 4.488 6.18182 5.5C6.18182 6.512 6.99636 7.33333 8 7.33333ZM8 8.8C6.19636 8.8 4.72727 7.31867 4.72727 5.5C4.72727 3.68133 6.19636 2.2 8 2.2C9.80364 2.2 11.2727 3.68133 11.2727 5.5C11.2727 7.31867 9.80364 8.8 8 8.8Z" fill="#9B9B9B"/>
                </Svg>
              </Grid>
            </Grid>
          </Grid> 
        </Grid>
      </Wrap>
    </React.Fragment>
  );
};

DashBoard_BodySpec.defaultProps = {
  "height" : 0,
  "weight" : 0,
  "bmr" : 0,
};

const Wrap = styled.div`
  width: 88%;
  height: 92px;
  background-color: white;
  border-radius: 20px;
  margin: 7.8% auto 0 auto;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.05));
  padding: 4% 0;

  @media ${theme.device.mobileS} {  
    padding: 6% 0;
  }
`;

const Svg = styled.svg`
  cursor: pointer;
`;

export default DashBoard_BodySpec;