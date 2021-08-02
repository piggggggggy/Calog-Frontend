import React, {useRef, useState} from 'react';
import { Button, Grid, Text, Image } from '../elements';
import styled from 'styled-components';
//컴포넌트
import BtnHeader from '../shared/BtnHeader';
import Record_Date from '../components/Record_Date';
import Record_When from '../components/Record_When';
import Record_List from '../components/Record_List';
import theme from '../shared/theme';
//이모지
import Camera from '../img/Group.png'
//이미지 업로드
import S3upload from 'react-aws-s3';
//for axios
import {useSelector, useDispatch} from 'react-redux';
import {addRecordDB} from '../redux/modules/record';

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
  const fileUpload = useRef()
  //preview
  const [fileUrl, setFileUrl] = useState(null);
  const chgPreview = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl)
  }

  //upload btn
  const submitBtn = (e) => {
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
    ReactS3Client.uploadFile(file, newFileName).then(data => {
      if(data.status === 204) {
        let imgUrl = data.location
        const food_list = [{...cart_list, type:cart.type}]
        dispatch(addRecordDB(cart.date, food_list, imgUrl, inputMemo))
      } else {
        window.alert('게시글 업로드에 오류가 있어요! 관리자에게 문의해주세요.')
      }
    });
    //업로드 할 이미지가 없을 때
    } else {
      const food_list = [{...cart_list, type:cart.type}]
      dispatch(addRecordDB(cart.date, food_list, inputMemo))
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
      {/* 칼로리 리스트 - 맵 */}
      <Grid margin="46% auto 24px auto" height={cart_list.length <=3 ? '200px' : 'auto'} m_margin="50% auto 24px auto">
        {cart_list.map((c, idx) => {
          return <Record_List key={c.foodId} {...c}/>
        })}
      </Grid>
      {/* 리스트가 5개 이상일 경우 활성화 */}
      {cart_list.length >=5 &&
        <Grid margin="22px auto" width="30px">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.23 0.229981L20 1.99998L10 12L-7.73692e-08 1.99998L1.77 0.229981L10 8.45998L18.23 0.229981Z" fill="#757575"/>
          </svg>
        </Grid>
      }
      {/* 사진 */}
      <Grid padding="16px 8% 0 8%">
        <Text size="17px" bold color={theme.color.gray_7}>내가 먹은 음식</Text>
      </Grid>
      <Grid>
        <label htmlFor="imgFile">
            {!fileUrl ?
            <Grid bg={'#FFFBED'} width="89%" height="236px" margin="4% auto 5% auto" border_radius="8px" padding="15% 0" m_margin="4% auto 5% auto">
              <Image src={Camera} width="21%" height="62px" margin="auto"/>
              <Text width="44%" size="17px" bold color={'#aeaeae'} margin="6% auto 0 auto" m_size="13px">+ 여기를 눌러 사진 등록</Text>
            </Grid> :
              <Image src={fileUrl} width="89%" height="236px" margin="4% auto 5% auto" b_size="100% 100%" border_radius="8px"/>
            }
        </label>
        <FileBox type="file" accept="image/*; capture=camera" ref={fileUpload} onChange={chgPreview} id="imgFile"/>
      </Grid>
      {/* 메모 */}
      <Grid padding="1% 8% 0 8%">
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