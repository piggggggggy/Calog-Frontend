import React from 'react';
import {Grid, Image} from '../elements';
import styled from 'styled-components';

//del Image
import {delImage} from '../redux/modules/record';
import {useDispatch, useSelector} from 'react-redux';


const Record_img = (props) => {
  const dispatch = useDispatch()

  const url_list = useSelector((state) => state.record.img)

  const delBtnA = (e) => {
    e.preventDefault();
    dispatch(delImage(0))
  }

  const delBtnB = (e) => {
    e.preventDefault();
    dispatch(delImage(1))
  }

  const delBtnC = (e) => {
    e.preventDefault();
    dispatch(delImage(2))
  }

  return (
    <React.Fragment>
      {url_list?.length === 0 && (
        <Grid is_flex>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12H23" stroke="#D2D2D2" stroke-linecap="round"/>
                <path d="M12 1L12 23" stroke="#D2D2D2" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12H23" stroke="#D2D2D2" stroke-linecap="round"/>
                <path d="M12 1L12 23" stroke="#D2D2D2" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12H23" stroke="#D2D2D2" stroke-linecap="round"/>
                <path d="M12 1L12 23" stroke="#D2D2D2" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid> 
        </Grid>
      )}
      
      {/* 이미지 추가 1 */}
      {url_list?.length === 1 && (
        <Grid is_flex>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" border_radius="8px">
            <Image src={url_list[0]} height="12.9vh" b_size="100% 100%" border_radius="8px"/>
            <DelBtn onClick={delBtnA}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#404040"/>
                <path d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z" fill="white"/>
              </svg>
            </DelBtn>
          </Grid>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12H23" stroke="#D2D2D2" stroke-linecap="round"/>
                <path d="M12 1L12 23" stroke="#D2D2D2" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12H23" stroke="#D2D2D2" stroke-linecap="round"/>
                <path d="M12 1L12 23" stroke="#D2D2D2" stroke-linecap="round"/>
              </svg>
            </Grid>
          </Grid> 
        </Grid>
      )}

      {/* 이미지 추가 2 */}
      {url_list?.length === 2 && (
        <Grid is_flex>
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" border_radius="8px">
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
          <Grid bg={'#FFFBED'} width="31%" height="12.9vh" margin="4% 0 5% 0%" border_radius="8px" m_margin="4% 0 5% 0%">
            <Grid width="21%" margin="auto" padding="36% 0" m_margin="auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12H23" stroke="#D2D2D2" stroke-linecap="round"/>
                <path d="M12 1L12 23" stroke="#D2D2D2" stroke-linecap="round"/>
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
}

const DelBtn = styled.div`
  position: relative;
  float: right;
  margin-top: -102%;
  margin-right: -4%;
`;

export default Record_img;