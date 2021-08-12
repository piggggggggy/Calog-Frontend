import React, {useState, useEffect} from 'react';
import {Button, Grid, Text, Image} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// history
import {history} from '../redux/configStore';

// 컴포넌트
import CalendarDetail_Date from'../components/CalendarDetail_Date';
import CalendarDetail_Info from '../components/CalendarDetail_Info';
import DashBoard_When from '../components/DashBoard_When';
import CalendarDetail_Food from '../components/CalendarDetail_Food';
import CalendarDetail_Image from '../components/CalendarDetail_Image';
import Loading from './Loading2';
import Modal from '../components/Modal';

// 데이터
import {useDispatch, useSelector} from 'react-redux';
import {getRecordDB, delRecordDB} from '../redux/modules/record';

// slick
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//img
import noImg from '../img/noImg.png';

//moment
import moment from 'moment'

// modal
import { Confirm } from 'react-st-modal';

/** 
 * @param {list} r
 * @returns {list} r 유저가 기록한 foodRecords의 리스트를 반환
 * @역할 캘린더의 특정 날짜를 눌렀을 때 보이는 상세 컴포넌트
 * @담당자 : 김나영
*/

const CalenderDetail = (props) => {
  const dispatch = useDispatch();

  // Modal
  const [ modalOpen, setModalOpen ] = useState(false);

  // 날짜
  const _SelectDate = history.location.pathname.split('/');
  const SelectDate = _SelectDate[2];

  // 타입
  const type = useSelector((state) => state.record.type)

  // 화면 로딩 시 선택한 날짜의 기록 데이터 불러오기
  useEffect(() => {
    dispatch(getRecordDB(SelectDate))
  },[history.location.pathname]);

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

  // 기록
  const record_list = useSelector((state) => state.record.record[0])
  const record_map = record_list?.foodRecords

  // 기록한 날짜
  const record_date = record_list?.date
  const date = moment(record_date).format('M월 D일')

  // 기록한 시기의 bmr
  const record_bmr = record_list?.bmr

  // 푸드 리스트와 현재 버튼 타입이 일치하는 목록을 맵 돌리기
  let same_food = []
  for (let idx=0; idx<record_map?.length; idx++) {
    const list_type = record_map[idx].type
    list_type === type && same_food.push(record_map[idx])
  }

  // 이미지 빈값 제외하기
  let image_list = []
  let image_url = record_list?.url
  for(let idx = 0; idx <image_url?.length; idx++) {
    const url = record_list.url[idx]
    url !== "" && image_list.push(url)
  };

  // 이미지 리스트와 현재 버튼 타입이 일치하는 목록을 맵 돌리기
  let same_list = []
  for (let idx=0; idx<image_url?.length; idx++) {
    const list_type = image_url[idx].type
    if(list_type === type) {
      for (let list=0; list<image_url[idx].url.length; list++) {
        const urlList = image_url[idx].url[list]
        same_list.push(urlList)
      }
    }
  }

  // 메모와 현재 버튼 타입이 일치하는 목록을 맵 돌리기
  const memo = record_list?.contents
  let memo_list = []
  for(let idx = 0; idx <memo?.length; idx++) {
    const list_type = memo[idx].type
    list_type === type && memo_list.push(memo[idx].contents)
  };

  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded)

  if(!is_loaded) {
    return (<Loading />);
  }

  // 기록 삭제 버튼
  const delRecord = (async () => {
    setModalOpen(true)
  })
    // let result = window.confirm('선택된 기록을 삭제하시겠어요? 추가 기록이 확인되면 리스트는 삭제됩니다.')
    // const record_id = record_list?._id
    //   result && (
    //     dispatch(delRecordDB(record_id, record_date, type))
    //   )
    

  return (
    <React.Fragment>

        {/* 헤더 */}
        <Grid padding="3.6vh 6.2%" bg={theme.color.light}>

          {/* 뒤로가기 버튼 */}
          <Grid _onClick={() => history.goBack()}>  
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7695 18.23L9.99953 20L-0.000469208 10L9.99953 0L11.7695 1.77L3.53953 10L11.7695 18.23Z" fill="#757575"/>
            </svg>
          </Grid>
        </Grid>

        <Wrap>
          <TopBack/>

          {/* 캘린더 */}
          <CalendarDetail_Date SelectDate={SelectDate}/>

          {/* bmr info */}
          <BmrInfo>
            <Text color={'rgba(158, 135, 55, 0.6)'}>{date} 기초대사량 {record_bmr}kcal</Text> 
          </BmrInfo>

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
          {same_food?.length > 0 ? (
            <React.Fragment>
              {same_food?.map((r, idx) => {
                return <CalendarDetail_Food key={r._id} {...r}/>
              })}
            </React.Fragment>
          ) : (
            <Grid text_align="center">
              <Text size="15px" m_size="13px">기록된 식단이 없어요😿</Text>
            </Grid>
          )}
        </Grid>

        {/* 사진title */}
        <Grid margin="6.3% 9.7% 0 9.7%" width="13.5%" m_margin="6.3% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>사진</Text>
          </Button>
        </Grid>

        {/* 이미지 */}
        <Grid margin="4% 9.7% 0 9.7%" bg={'#eee'} width="81%" height="221px" border_radius="8px" m_margin="4% 9.7% 0 9.7%">
          {same_list?.length > 0 ? (
            <Slider {...settings}>
              {same_list?.map((i, idx) => {
                return <CalendarDetail_Image key={i.url} {...[i]} />
              })}
            </Slider>
          ) : (
            <Image height="221px" src={noImg} b_size="100% 100%"/>
          )}
        </Grid>

        {/* 메모title */}
        <Grid height="3vh"/>
        <Grid margin="6.3% 9.7% 0 9.7%" width="13.5%" m_margin="6.3% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>메모</Text>
          </Button>
        </Grid>

        {/* 메모 */}
        <Grid margin="4% 9.7% 8% 9.7%" width="81%" m_margin="4% 9.7% 8% 9.7%">
          {memo_list?.length > 0 ? (
            <React.Fragment>
              {memo_list?.map((r, idx) => {
                return <Text margin="0 0 3% 0" size="15px" m_size="13px">{r}</Text>
              })}
            </React.Fragment>
          ) : (
            <Grid text_align="center">
              <Text size="15px" m_size="13px">기록된 메모가 없어요😿</Text>
            </Grid>
          )}
        </Grid>

        {/* 삭제하기 버튼 */}
        {/* 식단 기록이 있는 경우에만 활성화 */}
        {same_food?.length > 0 && (
          <Button bg={"white"} margin="0 auto 7% auto" width="auto" _onClick={delRecord}>
            <DelTitle>{type} 정보 전체 삭제</DelTitle>
          </Button>
        )}
        <Modal open={modalOpen} title="삭제"/>

        </Wrap>
    </React.Fragment>
  );
};

const TopBack = styled.div`
  position: absolute;
  width: 100%;
  min-width: 280px;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 21vh;
`;

const Wrap = styled.div`
  position: relative;
  max-width: 420px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BmrInfo = styled.div`
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 5.8%;
  margin-bottom: 2%;
  font-size: 13px;
`;

const DelTitle = styled.p`
  font-size: 13px;
  border-bottom: 1px solid ${theme.color.gray_5};
  color: ${theme.color.gray_5};
  width: auto;
`;

export default CalenderDetail;