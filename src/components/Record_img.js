import React from 'react';
import {Grid, Image} from '../elements';
import styled from 'styled-components';

//del Image
import {delImage} from '../redux/modules/record';
import {useDispatch, useSelector} from 'react-redux';

/** 
 * @역할 기록 페이지에서 이미지 미리보기 컴포넌트
 * @담당자 : 김나영
*/


const Record_img = (props) => {
  const dispatch = useDispatch();

  // 유저가 셀렉한 이미지 미리보기 리스트
  const url_list = useSelector((state) => state.record.img);

  // 각 미리보기의 삭제 버튼 >> 이미지를 셀렉했을 때마다 미리보기가 추가되는게 아닌 default 박스가 있고 거기에 채워지는 방식으로 디자인됨
  const delBtnA = (e) => {
    e.preventDefault();
    dispatch(delImage(0))
  };

  const delBtnB = (e) => {
    e.preventDefault();
    dispatch(delImage(1))
  };

  const delBtnC = (e) => {
    e.preventDefault();
    dispatch(delImage(2))
  };

  return (
    <React.Fragment>

      {/* 미리보기 이미지 리스트가 없을 때 */}
      {url_list?.length === 0 && (
        <Grid is_flex>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <path d="M13 2L13 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <path d="M13 2L13 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <path d="M13 2L13 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid> 
        </Grid>
      )}
      
      {/* 이미지 추가 1 */}
      {url_list?.length === 1 && (
        <Grid is_flex>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" border_radius="8px">
            <Image src={url_list[0]} height="12.9vh" b_size="100% 100%" border_radius="8px"/>
            <DelBtn onClick={delBtnA}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#404040"/>
                <path d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z" fill="white"/>
              </svg>
            </DelBtn>
          </Grid>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <path d="M13 2L13 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <path d="M13 2L13 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid> 
        </Grid>
      )}

      {/* 이미지 추가 2 */}
      {url_list?.length === 2 && (
        <Grid is_flex>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" border_radius="8px">
            <Image src={url_list[0]} height="12.9vh" b_size="100% 100%" border_radius="8px"/>
            <DelBtn onClick={delBtnA}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#404040"/>
                <path d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z" fill="white"/>
              </svg>
            </DelBtn>
          </Grid>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" border_radius="8px">
            <Image src={url_list[1]} height="12.9vh" b_size="100% 100%" border_radius="8px"/>
            <DelBtn onClick={delBtnB}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#404040"/>
                <path d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z" fill="white"/>
              </svg>
            </DelBtn>
          </Grid>
          <Grid bg={'#EEEEEE'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13H24" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <path d="M13 2L13 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid> 
        </Grid>
      )}

      {/* 이미지 추가 3 */}
      {url_list?.length === 3 && (
        <Grid is_flex>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" border_radius="8px" margin="4% 0 5% 0%" m_margin="4% 0 5% 0%">
            <Image src={url_list[0]} height="12.9vh" b_size="100% 100%" border_radius="8px"/>
            <DelBtn onClick={delBtnA}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#404040"/>
                <path d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z" fill="white"/>
              </svg>
            </DelBtn>
          </Grid>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" border_radius="8px">
            <Image src={url_list[1]} height="12.9vh" b_size="100% 100%" border_radius="8px"/>
            <DelBtn onClick={delBtnB}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#404040"/>
                <path d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z" fill="white"/>
              </svg>
            </DelBtn>
          </Grid>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" border_radius="8px">
            <Image src={url_list[2]} height="12.9vh" b_size="100% 100%" border_radius="8px"/>
            <DelBtn onClick={delBtnC}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#404040"/>
                <path d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z" fill="white"/>
              </svg>
            </DelBtn>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

const DelBtn = styled.div`
  position: relative;
  float: right;
  margin-top: -102%;
  margin-right: -4%;
`;

export default Record_img;