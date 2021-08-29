import React, {useEffect, useState, useRef} from 'react';

// css
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
import CalendarDate_Image from '../components/CalendarDate_Image';
import Loading from './Loading2';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {getRecordDB, addRecordDB, delImgDB, typeChk, delMemoDB, delRecordDB} from '../redux/modules/record';

//moment
import moment from 'moment';

// img
import imageCompression from "browser-image-compression";
import addFood from '../img/addFood.png';
import addImg from '../img/addImage.png';
import addMemo from '../img/addMemo.png';

// 이미지 업로드(압축해서 s3)
import S3upload from 'react-aws-s3';

/** 
 * @param {object} r
 * @returns {object} r 유저가 기록한 foodRecords의 리스트를 반환
 * @역할 캘린더의 특정 날짜를 눌렀을 때 보이는 상세 컴포넌트
 * @담당자 : 김나영
*/

const CalendarDate = (props) => {
  const dispatch = useDispatch();

  // 화면 로딩 시 선택한 날짜의 기록 데이터 불러오기
  useEffect(() => {
    dispatch(getRecordDB(SelectDate))
    dispatch(typeChk('아침'))
  },[history.location.pathname]);

  // 날짜
  const _SelectDate = history.location.pathname.split('/');
  const SelectDate = _SelectDate[2];

  // 기록
  const record_list = useSelector((state) => state.record.record);
  const record_map = record_list?.foodRecords;

  // 기록한 날짜
  const record_date = record_list?.date;
  const date = moment(record_date).format('M월 D일');

  // 기록한 시기의 bmr
  const record_bmr = record_list?.bmr;

  // 타입
  const type = useSelector((state) => state.record.type);

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
      const urlList = image_url[idx].url
      same_list.push(urlList)
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

  // 사진이나 메모가 입력되면 기록하기 활성화
  // 비활성화 btn
  const noFunc = () => {
    window.alert('사진과 메모를 기록하는 경우 클릭이 가능해요!')
  }

  // 메모
  const [inputMemo, setInputMemo] = useState();

  // 이미지 업로드
  const [fileUpload, setFileUpload] = useState({
    fileFile: []
  });
  const {fileFile} = fileUpload

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

  // 리사이징 옵션
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  //활성화 btn
  // upload btn
  const fileList = useSelector((state) => state.record.img.newFileList)
  const submitBtn = async () => {
    let image_list = []
      if (fileList?.length > 0) {

        for(let i=0; i<fileList?.length; i++) {
          let newFileName = fileList[i].name;
          const ReactS3Client = new S3upload(config);
          
          // 리사이징하여 업로드
          try {
            const resizeFile = await imageCompression(fileList[i], options);
            ReactS3Client.uploadFile(resizeFile, newFileName).then(data => {
              if(data.status === 204) {
                let imgUrl = data.location
                image_list.push(imgUrl)
                if(i === fileList?.length-1) {
                // case1) 메모에 입력된 내용이 없을 때
                inputMemo === undefined ? dispatch(addRecordDB(type, image_list, "", record_list?.recordId, SelectDate)) :

                // case2) 메모에 입력된 내용이 있을 때
                dispatch(addRecordDB(type, image_list, inputMemo, record_list?.recordId, SelectDate))
                }
              }
            });
          } catch (error) {window.alert('앗, 게시글 업로드에 오류가 있어요! 관리자에게 문의해주세요😿')}
        }
      } else {
        // 업로드 할 이미지가 없을 때
        // case3) 메모에 입력된 내용이 있을 때
        dispatch(addRecordDB(type, undefined, inputMemo, record_list?.recordId, SelectDate))
      }
  };

  // 이미지 미리보기
  const previewImg = useSelector((state) => state.record.img)
  const [btn, setBtn] = useState({
    color: previewImg?.length === 0 || previewImg.files?.length === 0 ? '#9E9E9E' : theme.color.light,
    fontColor: previewImg?.length === 0 || previewImg.files?.length === 0 ? 'white' : 'black',
  })

  const {color, fontColor} = btn

  // 이미지 컴포넌트에서 props로 부모 상태 변경
  const setBtnFunc = (btn) => {
    setBtn(prevState => ({
      color: btn.color,
      fontColor: btn.fontColor,
    }))
  }
  const fileInfo = (file) => {
    setFileUpload(prevState => ({
      fileFile: file
    }))
  }

  // 메모
  const chgMemo = (e) => {
    setInputMemo(e.target.value)
    inputMemo?.length > 1 ? (
      setBtn({
        color: theme.color.light,
        fontColor: 'black',
      })
    ) : (
      setBtn({
        color: '#9E9E9E',
        fontColor: 'white',
      })
    )
  };

  // 이미지 삭제
  const DelImg = () => {
    dispatch(delImgDB(record_list?.recordId, type, SelectDate))
  }

  // 메모 삭제
  const delMemo = () => {
    dispatch(delMemoDB(record_list?.recordId, type, SelectDate))
  }

  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded);
  
  if(!is_loaded) {
    return (<Loading />);
  };
  
  // 기록 삭제 버튼
  const delRecord = (async () => {
    const result = window.confirm(`${type}에 대한 기록을 모두 삭제하시겠어요?`)
    result ? dispatch(delRecordDB(record_list?.recordId, SelectDate, type)) : history.push(`/loading/calendar/${SelectDate}`)
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

        <TopBack>

          {/* 캘린더 */}
          <CalendarDetail_Date SelectDate={SelectDate}/>

          {/* bmr info */}
          <BmrInfo>
            <Text color={'rgba(158, 135, 55, 0.6)'}>{date} 기초대사량 {record_bmr}kcal</Text> 
          </BmrInfo>

          {/* 안내 메시지 */}
          <CalendarDetail_Info {...record_list}/>
        </TopBack>

        {/* 기록 시기 */}
        <Grid margin="9.7% 0 0 2%" m_margin="9.7% 0 0 2%">
          <DashBoard_When data_type={type} inputMemo={inputMemo} {...record_list}/>
        </Grid>

        {/* 식단title */}
        <Grid display="flex" jc="space-between" margin="6% auto 0 auto" m_margin="6% auto 0 auto" width="87%">
          <Button width="13.5%" height="25px" bg={theme.color.light} border_radius="15.5px" margin="0">
            <Text size="13px" bold>식단</Text>
          </Button>

          {/* 식단이 있을 때에만 편집이 가능 */}
          {same_food?.length !== 0 && (
            <EditBtn>
              <Text color={'#8C8C8C'} size="13px" m_size="11px">편집</Text>
            </EditBtn>
          )}
        </Grid>

        {/* case1) 식단이 없을 때 */}
        {same_food?.length === 0 ? (
          <Image src={addFood} width="85%" height="15vh" margin="2% auto 0 auto" _onClick={() => history.push('/')} cursor="pointer"/>
        ) : (

          // case2) 식단이 있을 때
          <Grid width="80.9%" margin="4% auto 0 auto" m_margin="4% auto 0 auto">
          {same_food?.map((r, idx) => {
              return <CalendarDetail_Food data_type={type} key={r._id} {...r}/>
            })}
          </Grid>
        )}

        {/* 사진title */}
        <Grid display="flex" jc="space-between" margin="6% auto 0 auto" m_margin="6% auto 0 auto" width="87%">
          <Button width="13.5%" height="25px" bg={theme.color.light} border_radius="15.5px" margin="0">
            <Text size="13px" bold>사진</Text>
          </Button>

          {/* 이미지 리스트가 있을 때에만 삭제 가능 */}
          {same_list?.length !== 0 && (
            <EditBtn onClick={DelImg}>
              <Text color={'#8C8C8C'} size="13px" cursor="pointer" m_size="11px">삭제</Text>
            </EditBtn>
          )}
        </Grid>

        {/* case1) 식단이 없을 때 */}
        {same_food?.length === 0 ? (
          <React.Fragment>
            <Text color={theme.color.gray_7} size="13px" margin="2% 9.7% 0 9.7%" m_size="12px">이미지가 여러장인 경우, 한번에 선택이 가능해요!</Text>
            <Image src={addImg} width="85%" height="15vh" margin="2% auto 0 auto"/>
          </React.Fragment>
        ) : (

          // case2) 식단이 있을 때
          <CalendarDate_Image same_list={same_list} setBtnFunc={setBtnFunc} submitBtn={submitBtn} noFunc={noFunc} fileInfo={fileInfo} type={type}/>
        )}

        {/* 메모title */}
        <Grid display="flex" jc="space-between" margin="4.5% auto 0 auto" m_margin="4.5% auto 0 auto" width="87%">
          <Button width="13.5%" height="25px" bg={theme.color.light} border_radius="15.5px" margin="0">
            <Text size="13px" bold>메모</Text>
          </Button>

          {/* 메모가 있을 때에만 삭제 가능 */}
          {memo_list?.length !== 0 && (
            <EditBtn onClick={delMemo}>
              <Text color={'#8C8C8C'} size="13px" m_size="11px" cursor="pointer">삭제</Text>
            </EditBtn>
          )}
        </Grid>

        {/* case1) 식단이 없을 때 */}
        {same_food?.length === 0 ? (
          <Image src={addMemo} width="83%" height="30vh" margin="2% auto 4.5% auto"/>
        ) : (

          // case2) 식단이 있을 때
          <React.Fragment>

            {/* case2-1) 메모가 있을 때 */}
            {memo_list?.length !== 0 ? (
              <Grid margin="4% 9.7% 8% 9.7%" width="81%" m_margin="4% 9.7% 8% 9.7%" cursor="default">
                {memo_list?.map((r, idx) => {
                  return <Text margin="0 0 3% 0" size="15px" m_size="13px">{r}</Text>
                })}
              </Grid>
            ) : (

              // case2-2) 메모가 없을 때
              <Grid padding="5% 5.5%">
                <TextArea rows={10} onChange={chgMemo} placeholder="메모를 작성해주세요."/>
              </Grid>
            )}
          </React.Fragment>
        )}

        {/* 기록하기 버튼 */}
        {/* 전체 삭제 버튼은 사진과 메모, 식단이 모두 있는 경우에만 활성화 */}
        {(same_list?.length !== 0 && memo_list?.length !== 0 && same_food?.length !== 0) ? (
          <Button bg={"white"} margin="0 auto 7% auto" width="auto" _onClick={delRecord}>
            <DelTitle>{type} 정보 전체 삭제</DelTitle>
          </Button>
        ) : (
          <Button
          _onClick={(previewImg?.length === 0 || previewImg.files?.length === 0) && !inputMemo ? noFunc : submitBtn}
          width="88%" height="56px" border_radius="44px" bg={color} margin="0 auto 5% auto">
            <Text size="16px" bold color={fontColor} cursor="pointer">기록하기</Text>
          </Button>
        )}
      </Wrap>
    </React.Fragment>
  )
};

const Wrap = styled.div`
  position: relative;
  max-width: 420px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopBack = styled.div`
  width: 100%;
  min-width: 280px;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 31vh;

  @media ${theme.device.mobileM} {
    height: 33vh;
  }

  @media only screen and (min-width: 414px) {
    height: 33vh;
  }

`;

const BmrInfo = styled.div`
  position: relative;
  width: 100%;
  padding: 2% 0 0 10%;
  margin-bottom: 3%;
  font-size: 13px;
  cursor: default;
`;

const EditBtn = styled.div`
  float: right;
  margin-right: 4%;
  border-bottom: 1px solid #8C8C8C;
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

  ::placeholder {
    @media ${theme.device.mobileM} {
      font-size: 13px;
    }
  }
`;

const DelTitle = styled.p`
  font-size: 13px;
  border-bottom: 1px solid ${theme.color.gray_5};
  color: ${theme.color.gray_5};
  width: auto;
  cursor: pointer;
`;

export default CalendarDate;