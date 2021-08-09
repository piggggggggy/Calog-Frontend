import React, {useRef, useState} from 'react';
import { Button, Grid, Text, Image } from '../elements';
import styled from 'styled-components';
//컴포넌트
import BtnHeader from '../shared/BtnHeader';
import Record_Date from '../components/Record_Date';
import Record_When from '../components/Record_When';
import Record_ListBody from '../components/Record_ListBody';
import theme from '../shared/theme';
//이모지
import Camera from '../img/Group.png'
//이미지 업로드(압축해서 s3)
import S3upload from 'react-aws-s3';
import imageCompression from "browser-image-compression";
//for axios
import {useSelector, useDispatch} from 'react-redux';
import {addRecordDB} from '../redux/modules/record';
//lazy loading
import LazyLoad from 'react-lazyload';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 카트에 담은 칼로리 리스트를 본격적으로 기록하러 갈 수 있는 페이지
 * @담당자 : 김나영
*/

const Record = (props) => {
  const dispatch = useDispatch()

  //카트
  const cart = useSelector((state) => state.cart)
  //카트 - 리스트
  const cart_list = cart.cart

  //메모
  const [inputMemo, setInputMemo] = useState()
  const memo = (e) => {
    setInputMemo(e.target.value)
  }

  //이미지
  //preview
  const [fileUrl, setFileUrl] = useState(null);
  //리사이징 옵션
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }
  //+ 리사이징 후 프리뷰
  const chgPreview = async (e) => {
    const fileArr = e.target.files;

    let fileUrls = [];

    let file;
    let filesLength = fileArr.length > 3 ? 3 : fileArr.length;

    for (let idx = 0; idx < filesLength; idx++) {
      file = fileArr[idx];

      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result)
      }
    }
    // //원본
    // const imageFile = e.target.files[0];
    // //리사이징
    // try {
    //   const compressedFile = await imageCompression(imageFile, options);
    //   const imageUrl = URL.createObjectURL(compressedFile);
    //   setFileUrl(imageUrl)
    // } catch (error) {
    //   window.alert('앗, 이미지 업로드에 오류가 있어요! 관리자에게 문의해주세요😿')
    // }
  }
  //이미지 업로드
  const fileUpload = useRef()
  //upload btn
  const submitBtn = async (e) => {
    e.preventDefault();
    let file = fileUpload.current.files[0];
    //업로드 할 이미지가 있을 때
    if (file) {
      let newFileName = fileUpload.current.files[0].name;
      const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      };
      const ReactS3Client = new S3upload(config);
      //리사이징하여 업로드
      try {
        const resizeFile = await imageCompression(file, options);
        ReactS3Client.uploadFile(resizeFile, newFileName).then(data => {
          if(data.status === 204) {
            let imgUrl = data.location

            // case1) 메모에 입력된 내용이 없을 때
            inputMemo === undefined ? dispatch(addRecordDB(cart.date, cart_list, cart.type, [imgUrl], [""])) : 

              // case2) 메모에 입력된 내용이 있을 때
              dispatch(addRecordDB(cart.date, cart_list, cart.type, [imgUrl], [inputMemo]))
          } else {
            window.alert('앗, 게시글 업로드에 오류가 있어요! 관리자에게 문의해주세요😿')
          }
        });
      } catch (error) {window.alert('앗, 게시글 업로드에 오류가 있어요! 관리자에게 문의해주세요😿')}

    //업로드 할 이미지가 없을 때
    } else {

      // case1) 메모에 입력된 내용이 없을 때
      inputMemo === undefined ? dispatch(addRecordDB(cart.date, cart_list, cart.type, [""], [""])) : 

      // case2) 메모에 입력된 내용이 있을 때
      dispatch(addRecordDB(cart.date, cart_list, cart.type, [""], [inputMemo]))
    }
  }

  return (
    <React.Fragment>
      {/* 상단 고정 */}
      <FixTop>
        {/* 헤더 */}
        <BtnHeader title="기록하기" display="none"/>
        {/* 날짜 */}
        <Record_Date />
        {/* 기록할 칼로리의 시점 */}
        <Record_When />
      </FixTop>
      {/* 칼로리 리스트 */}
      <Record_ListBody list={cart_list}/>
      {/* 사진 */}
      <Grid padding="13.5% 7.7% 0 7.7%">
        <Text size="17px" bold color={theme.color.gray_7}>내가 먹은 음식</Text>
      </Grid>
      <Grid>
        <LazyLoad>
          <label htmlFor="imgFile">
            {/* 이미지 여러장 업로드 */}
            <Grid display="flex">
              <Grid bg={'#FFFBED'} width="27.3%" height="12.9vh" margin="4% 0 5% 5.6%" border_radius="8px" m_margin="4% 0 5% 5.6%">
                <Image src={fileUrl} width="89%" height="236px" margin="4% auto 5% auto" b_size="100% 100%" border_radius="8px"/>
              </Grid>

              {/* 이미지 추가 */}
              <Grid bg={'#FFFBED'} width="27.3%" height="12.9vh" margin="4% 0 5% 5.6%" border_radius="8px" m_margin="4% 0 5% 5.6%">
                <Grid width="21%" margin="auto" padding="36% 0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12H23" stroke="#D2D2D2" stroke-linecap="round"/>
                    <path d="M12 1L12 23" stroke="#D2D2D2" stroke-linecap="round"/>
                  </svg>
                </Grid>
              </Grid>
            </Grid>
          </label>
          <FileBox type="file" multiple accept="image/*" ref={fileUpload} onChange={chgPreview} id="imgFile"/>
        </LazyLoad>
      </Grid>
      <Grid padding="1% 7.7% 0 7.7%">
        <Text size="17px" bold color={theme.color.gray_7}>메모하기</Text>
      </Grid>
      <TextArea rows={10} onChange={memo} placeholder="메모를 작성해주세요."/>
      {/* btn */}
      <Button
        _onClick={submitBtn}
        width="90%" height="56px" border_radius="44px" bg={theme.color.light} margin="0 auto 11% auto">
        <Text size="16px" bold>기록하기</Text>
      </Button>
  </React.Fragment>
  );
}

const FixTop = styled.div`
  position: fixed;
  background-color: white;
  height: 26%;
  top: 0;
  width: 100%;
  max-width: 420px;

  @media ${theme.device.mobileH} {
    height: 21%
  }
`;

const FileBox = styled.input`
  display: none;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 89%;
  display: block;
  margin: 4% auto 7% auto;
  padding: 5% 7%;
  border: none;
  background: #FFFBED;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
`;

export default Record;