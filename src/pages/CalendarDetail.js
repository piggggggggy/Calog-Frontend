import React, {useEffect} from 'react';
import {Button, Grid, Image, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// history
import {history} from '../redux/configStore';

// 컴포넌트
import CalendarDetail_Date from'../components/CalendarDetail_Date';
import CalendarDetail_Info from '../components/CalendarDetail_Info';
import DashBoard_When from '../components/DashBoard_When';
import CalendarDetail_Food from '../components/CalendarDetail_Food';

// 데이터
import {useDispatch, useSelector} from 'react-redux';
import {getRecordDB} from '../redux/modules/record';

// slick
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/** 
 * @param {list} r
 * @returns {list} r 유저가 기록한 foodRecords의 리스트를 반환
 * @역할 캘린더의 특정 날짜를 눌렀을 때 보이는 상세 컴포넌트
 * @담당자 : 김나영
*/

const CalenderDetail = (props) => {
  const dispatch = useDispatch();

  // 날짜
  const _SelectDate = history.location.pathname.split('/');
  const SelectDate = _SelectDate[2];

  // 화면 로딩 시 선택한 날짜의 기록 데이터 불러오기
  useEffect(() => {
    dispatch(getRecordDB(SelectDate))
  },[]);

  // 기록
  const record_list = useSelector((state) => state.record.record[0]);
  const record_map = record_list?.foodRecords
  
  // slick setting
  // dots 유 / 반복 유 / 속도 / 한 번에 보여줄 스크롤 / 스크롤 시 1장 / 자동 넘김 방지
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  }

  // 이미지 빈값 제외하기
  let image_list = []
  let image_url = record_list?.url
  for(let idx = 0; idx <image_url?.length; idx++) {
    const url = record_list.url[idx]
    url !== "" && image_list.push(url)
  };

  return (
    <React.Fragment>
      <Grid>

        {/* 배경 */}
        <TopBack />

        {/* 헤더 */}
        <Grid is_flex padding="2.9vh 6.2%">

          {/* 뒤로가기 버튼 */}
          <Grid width="3vh" _onClick={() => history.goBack()}>  
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7695 18.23L9.99953 20L-0.000469208 10L9.99953 0L11.7695 1.77L3.53953 10L11.7695 18.23Z" fill="#757575"/>
            </svg>
          </Grid>
        </Grid>

        {/* 캘린더 */}
        <CalendarDetail_Date SelectDate={SelectDate}/>

        {/* 안내 메시지 */}
        <CalendarDetail_Info {...record_list}/>

        {/* 기록 시기 */}
        <Grid margin="9.7% 0 0 2%" m_margin="9.7% 0 0 2%">
          <DashBoard_When />
        </Grid>

        {/* 식단title */}
        <Grid margin="10% 9.7% 0 9.7%" width="13.5%" m_margin="10% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>식단</Text>
          </Button>
        </Grid>

        {/* 맵돌리기 */}
        <Grid width="80.9%" margin="4% auto 0 auto" m_margin="4% auto 0 auto">
          {record_map?.map((r, idx) => {
            return <CalendarDetail_Food key={r._id} {...r}/>
          })}
        </Grid>

        {/* 사진title */}
        <Grid margin="6.3% 9.7% 0 9.7%" width="13.5%" m_margin="6.3% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>사진</Text>
          </Button>
        </Grid>

        {/* 이미지 */}
        <Grid margin="4% 9.7% 0 9.7%" bg={'#eee'} width="81%" height="221px" border_radius="8px" m_margin="4% 9.7% 0 9.7%">
          {(image_url?.length === 1 && record_list.url[0] === "") ?
            (
              <Grid text_align="center" padding="30% 0">
                <Text size="22px" m_size="18px" bold>업로드된 이미지가 없어요!</Text>
              </Grid>
            ) : (
              <Slider {...settings}>
                {image_list.map((r, idx) => {
                  return (
                    <React.Fragment>
                      <Image height="221px" src={r} b_size="100% 100%"/> 
                    </React.Fragment>
                    )
                })}
              </Slider>
            )
          }
        </Grid>

        {/* 메모title */}
        <Grid margin="6.3% 9.7% 0 9.7%" width="13.5%" m_margin="6.3% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>메모</Text>
          </Button>
        </Grid>

        {/* 메모 */}
        <Grid margin="4% 9.7% 27% 9.7%" width="81%" m_margin="4% 9.7% 27% 9.7%">
          {record_list?.contents?.map((r, idx) => {
            return <Text margin="0 0 3% 0">{r}</Text>
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const TopBack = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 30vh;
`;

export default CalenderDetail;