import React from 'react';

// css
import {Grid, Text, Image} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// components
import BtnHeader from '../shared/BtnHeader';
import km_img from '../img/km_img.png';
import mk_img from '../img/mk_img.jpeg';
import ky_img from '../img/ky_img.jpg';
import jh_img from '../img/jh_img.png';
import iw_img from '../img/iw_img.PNG';
import ny_img from '../img/ny_img.PNG';
import yt_img from '../img/yt_img.png';
import jih_img from '../img/jih_img.png';
import trio from '../img/trio.png';

/** 
 * @역할 팀원 소개 페이지
 * @담당자 김나영
*/

const AboutUs = (props) => {

  return (
    <Wrap>

      {/* 헤더 */}
      <BtnHeader title="About Us" display="none"/>

      {/* 타이틀 */}
      <Grid margin="1.5% 0 0 8%" m_margin="1.5% 0 0 8%">
        <Title>안녕하세요!</Title>
        <Title>Team Calog</Title>
        <Title>입니다.</Title>
      </Grid>

      <GridBox>

        {/* 이미지 좌*/}
        <Grid>

          {/* 민경님 */}
          <Grid is_flex>
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">디자이너</Text>
                <Text size="20px" m_size="17px" bold>김민경</Text>
              </NameWrap>
            </Circle>
            <Image src={mk_img} width="14.5vh" height="17vh" HH_width="148px" HH_height="173px" b_size="88% 80%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">min97118@naver.com</Text>

          {/* 경원님 */}
          <Grid is_flex margin="44% 0 0 0" m_margin="44% 0 0 0">
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">백엔드</Text>
                <Text size="20px" m_size="17px" bold>이경원</Text>
              </NameWrap>
            </Circle>
            <Image src={ky_img} width="14vh" height="17vh" HH_width="148px" HH_height="173px" b_size="80% 85%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">dennis9352@gmail.com</Text>

          {/* 인웅님 */}
          <Grid is_flex margin="44% 0 0 0" m_margin="44% 0 0 0">
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">백엔드</Text>
                <Text size="20px" m_size="17px" bold>오인웅</Text>
              </NameWrap>
            </Circle>
            <Image src={iw_img} width="14.5vh" height="17vh" HH_width="148px" HH_height="173px" b_size="85% 85%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">ohinung@gmail.com</Text>

          {/* 용태님 */}
          <Grid is_flex margin="44% 0 0 0" m_margin="44% 0 0 0">
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">프론트엔드</Text>
                <Text size="20px" m_size="17px" bold>박용태</Text>
              </NameWrap>
            </Circle>
            <Image src={yt_img} width="13.5vh" height="17vh" HH_width="148px" HH_height="173px" b_size="80% 85%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">pyt4105@gmail.com</Text>
        </Grid>

        {/* 이미지 우 */}
        <Grid margin="55% 0 0 0" m_margin="55% 0 0 0">

          {/* 경미님 */}
          <Grid is_flex>
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">디자이너</Text>
                <Text size="20px" m_size="17px" bold>이경미</Text>
              </NameWrap>
            </Circle>
            <Image src={km_img} width="14.5vh" height="17vh" HH_width="148px" HH_height="173px" b_size="85% 85%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">kmkmm0701@naver.com</Text>

          {/* 진홍님 */}
          <Grid is_flex margin="44% 0 0 0" m_margin="44% 0 0 0">
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">백엔드</Text>
                <Text size="20px" m_size="17px" bold>박진홍</Text>
              </NameWrap>
            </Circle>
            <Image src={jh_img} width="14.5vh" height="17vh" HH_width="148px" HH_height="173px" b_size="85% 85%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">duabck@naver.com</Text>

          {/* 나영 */}
          <Grid is_flex margin="44% 0 0 0" m_margin="44% 0 0 0">
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">프론트엔드</Text>
                <Text size="20px" m_size="17px" bold>김나영</Text>
              </NameWrap>
            </Circle>
            <Image src={ny_img} width="14.5vh" height="17vh" HH_width="148px" HH_height="173px" b_size="83% 83%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">nayeongFE@gmail.com</Text>

          {/* 지혁님 */}
          <Grid is_flex margin="44% 0 0 0" m_margin="44% 0 0 0">
            <Circle>
              <NameWrap>
                <Text size="13px" m_size="11px">프론트엔드</Text>
                <Text size="20px" m_size="17px" bold>최지혁</Text>
              </NameWrap>
            </Circle>
            <Image src={jih_img} width="14.5vh" height="17vh" HH_width="148px" HH_height="173px" b_size="85% 85%" margin="0 0 0 auto"/>
          </Grid>
          <Text size="12px" m_size="11px" color={'#7C7C7C'} margin="0 0 0 13%">chltjdtn9703@gmail.com</Text>

        </Grid>
      </GridBox>

      {/* 지방이들 */}
      <Grid padding="3% 3% 9% 3%">
        <Image src={trio} height="17vh" HH_height="173px"  b_size="100% 100%"/>
      </Grid>
    </Wrap>
  );
}

const Wrap = styled.div`
  overflow-x: hidden;
`;

const Title = styled.p`
  font-size: 34px;
  font-weight: bold;
  font-family: 'Pretendard';  

  @media ${theme.device.mobileM} {
    font-size: 30px;
  }

  @media ${theme.device.mobileS} {
    font-size: 26px;
  }
`;

const Circle = styled.div`
  background-color: ${theme.color.light};
  width: 7.3vh;
  height: 7.3vh;
  border-radius: 50%;
  margin-top: 35%;

  @media ${theme.device.mobileHH} {
    width: 74px;
    height: 74px;
  }
`;

const NameWrap = styled.div`
  position: absolute;
  margin-left: 6%;
  width: auto;
  line-height: 24px;

  @media ${theme.device.mobileM} {
    line-height: 18px;
  }
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 10% 2.5%;
`;

export default AboutUs;