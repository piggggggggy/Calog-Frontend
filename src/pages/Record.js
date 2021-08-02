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
import { BiCamera, BiChevronDown } from "react-icons/bi";
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
        dispatch(addRecordDB(cart.date, food_list, imgUrl))
      } else {
        window.alert('게시글 업로드에 오류가 있어요! 관리자에게 문의해주세요.')
      }
    });
    //업로드 할 이미지가 없을 때
    } else {
      const food_list = [{...cart_list, type:cart.type}]
      dispatch(addRecordDB(cart.date, food_list))
    }
  }

  return (
    <React.Fragment>
      {/* 헤더 */}
      <BtnHeader title="기록하기" display="none"/>
      {/* 날짜 */}
      <Record_Date />
      {/* 기록할 칼로리의 시점 */}
      <Record_When />
      {/* 칼로리 리스트 - 맵 */}
      <Grid margin="24px auto" height="287px">
        {cart_list.map((c, idx) => {
          return <Record_List key={c.foodId} {...c}/>
        })}
      </Grid>
      {/* 리스트가 5개 이상일 경우 활성화 */}
      {cart_list >=5 &&
        <Grid margin="22px auto" width="30px">
        <BiChevronDown size="30px"/>
      </Grid>
      }
      {/* 사진 */}
      <Grid padding="16px 48px 0 48px">
        <Text size="17px" bold>내가 먹은 음식</Text>
      </Grid>
      <Grid>
        <label for="imgFile">
            {!fileUrl ?
            <Grid bg={'#eee'} width="374px" height="236px" margin="16px auto 23px auto" border_radius="44px" padding="15% 30%">
              <BiCamera size="118px" color={'white'}/>
            </Grid> :
              <Image src={fileUrl} width="374px" height="236px" margin="3% auto"/>
            }
        </label>
        <FileBox type="file" accept="image/*" ref={fileUpload} onChange={chgPreview} id="imgFile"/>
        {/* btn */}
        <Button
          _onClick={submitBtn}
          width="380px" height="56px" border_radius="44px" bg={theme.color.light} margin="0 auto 12% auto">
          <Text>기록하기</Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
}

const FileBox = styled.input`
  display: none;
`;

export default Record;