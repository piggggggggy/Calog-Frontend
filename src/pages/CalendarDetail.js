import React, {useState, useEffect, useRef} from 'react';
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
import Record_img from '../components/Record_img';

// 이미지 업로드(압축해서 s3)
import S3upload from 'react-aws-s3';
import imageCompression from "browser-image-compression";

// 데이터
import {useDispatch, useSelector} from 'react-redux';
import {getRecordDB, addRecordDB, addImage} from '../redux/modules/record';

// slick
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// lazy loading
import LazyLoad from 'react-lazyload';

//moment
import moment from 'moment';

/** 
 * @param {object} r
 * @returns {object} r 유저가 기록한 foodRecords의 리스트를 반환
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
  const type = useSelector((state) => state.record.type);

  // 화면 로딩 시 선택한 날짜의 기록 데이터 불러오기
  useEffect(() => {
    dispatch(getRecordDB(SelectDate))
  },[history.location.pathname]);

  // slick setting
  // dots 유 / 반복 유 / 속도 / 한 번에 보여줄 스크롤 / 스크롤 시 1장 / 자동 넘김 방지
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  // 기록
  const record_list = useSelector((state) => state.record.record[0]);
  const record_map = record_list?.foodRecords;

  // 기록한 날짜
  const record_date = record_list?.date;
  const date = moment(record_date).format('M월 D일');

  // 기록한 시기의 bmr
  const record_bmr = record_list?.bmr;

  // 푸드 리스트와 현재 버튼 타입이 일치하는 목록을 맵 돌리기
  let same_food = [];
  for (let idx=0; idx<record_map?.length; idx++) {
    const list_type = record_map[idx].type
    if(list_type === type || (type?.length === 0 && list_type === "아침")) {
      same_food.push(record_map[idx])
    }
  };

  // 이미지 빈값 제외하기
  let image_list = [];
  let image_url = record_list?.url;
  for(let idx = 0; idx <image_url?.length; idx++) {
    const url = record_list.url[idx]
    url !== "" && image_list.push(url)
  };

  // 이미지 리스트와 현재 버튼 타입이 일치하는 목록을 맵 돌리기
  let same_list = [];
  for (let idx=0; idx<image_url?.length; idx++) {
    const list_type = image_url[idx].type
    if(list_type === type || (type?.length === 0 && list_type === "아침")) {
      for (let list=0; list<image_url[idx].url.length; list++) {
        const urlList = image_url[idx].url[list]
        same_list.push(urlList)
      }
    }
  };

  // 메모와 현재 버튼 타입이 일치하는 목록을 맵 돌리기
  const memo = record_list?.contents;
  let memo_list = [];
  for(let idx = 0; idx <memo?.length; idx++) {
    const list_type = memo[idx].type
    if(list_type === type || (type?.length === 0 && list_type === "아침")) {
      memo_list.push(memo[idx].contents)
    }
  };

  // 이미지
  const [fileUrl, setFileUrl] = useState({
    file : []
  });

  const {file} = fileUrl;

  // 리사이징 옵션
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  // 리사이징 후 프리뷰
  const chgPreview = async (e) => {

    // 원본
    const imageFile = e.target.files;

    let files = []

    for(let idx=0; idx<imageFile?.length; idx++) {
      let image = imageFile[idx]

      // 리사이징
      try {
        const compressedFile = await imageCompression(image, options);
        const imageUrl = URL.createObjectURL(compressedFile);
        files.push(imageUrl)
      } catch (error) {
        window.alert('앗, 이미지 업로드에 오류가 있어요! 관리자에게 문의해주세요😿')
      }
    }
    setFileUrl({
      file: files
    })
    dispatch(addImage(files))
  };

  
  // 이미지 업로드
  const fileUpload = useRef();

  const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_REGION;
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_ID;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  }

  // 메모
  const [inputMemo, setInputMemo] = useState();
  const chgMemo = (e) => {
    setInputMemo(e.target.value)
  };

  // 비활성화 btn
  const noFunc = () => {
    window.alert('사진과 메모를 기록하는 경우 클릭이 가능해요!')
  }

  // 사진과 메모 중 기록이 하나라도 있을 경우에만 버튼 활성화;
  const [btn, setBtn] = useState({
    color: '#9E9E9E',
    func: noFunc,
    fontColor: 'white',
  });
  const {color, func, fontColor} = btn

  // upload btn
  const submitBtn = async (e) => {
    e.preventDefault();
    let file = fileUpload.current.files;
    let image_list = []
      if (file?.length > 0) {

        for(let i=0; i<file?.length; i++) {
          let newFileName = file[i].name;
          const ReactS3Client = new S3upload(config);
          
          // 리사이징하여 업로드
          try {
            const resizeFile = await imageCompression(file[i], options);
            ReactS3Client.uploadFile(resizeFile, newFileName).then(data => {
              if(data.status === 204) {
                let imgUrl = data.location
                image_list.push(imgUrl)
                if(i === file?.length-1) {
                // case1) 메모에 입력된 내용이 없을 때
                inputMemo === undefined ? dispatch(addRecordDB(image_list, "")) :

                // case2) 메모에 입력된 내용이 있을 때
                dispatch(addRecordDB(image_list, inputMemo))
                }
              }
            });
          } catch (error) {window.alert('앗, 게시글 업로드에 오류가 있어요! 관리자에게 문의해주세요😿')}
        }
      } else {

        // 업로드 할 이미지가 없을 때
        // case1) 메모에 입력된 내용이 없을 때
        inputMemo === undefined ? dispatch(addRecordDB([""], "")) : 

        // case2) 메모에 입력된 내용이 있을 때
        dispatch(addRecordDB([""], inputMemo))
      }
  };

  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded);

  if(!is_loaded) {
    return (<Loading />);
  };

  // 기록 삭제 버튼
  const delRecord = (async () => {
    setModalOpen(true)
  });

  return (
    <React.Fragment>
      <Wrap>

        {/* 헤더 */}
        <Grid padding="3.6vh 6.2%" bg={theme.color.light}>

          {/* 뒤로가기 버튼 */}
          <Grid _onClick={() => history.goBack()} cursor="pointer">  
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7695 18.23L9.99953 20L-0.000469208 10L9.99953 0L11.7695 1.77L3.53953 10L11.7695 18.23Z" fill="#757575"/>
            </svg>
          </Grid>
        </Grid>

        
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
            <DashBoard_When data_type={type} {...record_list}/>
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
                return <CalendarDetail_Food data_type={type} key={r._id} {...r}/>
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
        <Text size="13px" margin="2% 9.7% 0 9.7%">이미지가 여러장인 경우, 한번에 선택이 가능해요!</Text>

        {/* 이미지 */}
          {same_list?.length > 0 ? (
            <Grid margin="4% 9.7% 0 9.7%" bg={'#eee'} width="81%" height="221px" border_radius="8px" m_margin="4% 9.7% 0 9.7%">
              <Slider {...settings}>
                {same_list?.map((i, idx) => {
                  return <CalendarDetail_Image key={i.url} {...[i]} />
                })}
              </Slider>
            </Grid>
          ) : (
            <LazyLoad>

            {/* 이미지 여러장 업로드 */}
            <label htmlFor="imgFile">
              <Record_img />
              <FileBox type="file" multiple accept="image/*" ref={fileUpload} onChange={chgPreview} id="imgFile"/>
            </label>
          </LazyLoad>
          )}

        {/* 메모title */}
        <Grid margin="2% 9.7% 0 9.7%" width="13.5%" m_margin="2% 9.7% 0 9.7%">
          <Button height="25px" bg={theme.color.light} border_radius="15.5px">
            <Text size="13px" bold>메모</Text>
          </Button>
        </Grid>

        {/* 메모 */}
          {memo_list?.length > 0 ? (
            <Grid margin="4% 9.7% 8% 9.7%" width="81%" m_margin="4% 9.7% 8% 9.7%" cursor="default">
              {memo_list?.map((r, idx) => {
                return <Text margin="0 0 3% 0" size="15px" m_size="13px">{r}</Text>
              })}
            </Grid>
          ) : (
            <Grid padding="5% 5.5%">
              <TextArea rows={10} onChange={chgMemo} placeholder="메모를 작성해주세요."/>
            </Grid>
          )}

        {/* 기록하기 버튼 */}
        {/* 사진과 메모 중 기록이 없는 경우에만 활성화 */}
        <Button
        _onClick={func}
        width="90%" height="56px" border_radius="44px" bg={color} margin="0 auto 13% auto">
          <Text size="16px" bold color={fontColor}>기록하기</Text>
        </Button>

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

const FileBox = styled.input`
  display: none;
`;

const TextArea = styled.textarea`
  resize: none;
  display: block;
  width: 100%;
  padding: 5% 7%;
  border: none;
  background: #EEEEEE;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
`;

const BmrInfo = styled.div`
  position: relative;
  width: 100%;
  padding: 2% 0 0 10%;
  margin-bottom: 3%;
  font-size: 13px;
  cursor: default;
`;

const DelTitle = styled.p`
  font-size: 13px;
  border-bottom: 1px solid ${theme.color.gray_5};
  color: ${theme.color.gray_5};
  width: auto;
  cursor: pointer;
`;

export default CalenderDetail;