import React from 'react';
import {Grid, Text} from '../elements';
//이모지
import { FiShoppingCart } from "react-icons/fi";
//history
import {history} from '../redux/configStore';

const BtnHeader = (props) => {

  return (
    <React.Fragment>
      <Grid is_flex padding="2.9vh 6.2%" bg={props.bg}>
        {/* 뒤로가기 버튼 */}
        <Grid width="3vh" _onClick={() => history.goBack()}>  
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7695 18.23L9.99953 20L-0.000469208 10L9.99953 0L11.7695 1.77L3.53953 10L11.7695 18.23Z" fill="#757575"/>
          </svg>
        </Grid>
        {/* 페이지 이름 */}
        <Text bold size="15px" m_size="15px" width="auto">{props.title}</Text>
        {/* 장바구니 이모지 유무 */}
        {props.display !== 'none' ? 
        <Grid width="auto" _onClick={() => history.push('/cart')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.667 10.5H20.0787L14.9687 2.84666C14.747 2.51999 14.3737 2.35666 14.0003 2.35666C13.627 2.35666 13.2537 2.51999 13.032 2.85833L7.92199 10.5H2.33366C1.69199 10.5 1.16699 11.025 1.16699 11.6667C1.16699 11.7717 1.17866 11.8767 1.21366 11.9817L4.17699 22.7967C4.44533 23.7767 5.34366 24.5 6.41699 24.5H21.5837C22.657 24.5 23.5553 23.7767 23.8353 22.7967L26.7987 11.9817L26.8337 11.6667C26.8337 11.025 26.3087 10.5 25.667 10.5ZM14.0003 5.59999L17.267 10.5H10.7337L14.0003 5.59999ZM21.5837 22.1667L6.42866 22.1783L3.86199 12.8333H24.1503L21.5837 22.1667ZM14.0003 15.1667C12.717 15.1667 11.667 16.2167 11.667 17.5C11.667 18.7833 12.717 19.8333 14.0003 19.8333C15.2837 19.8333 16.3337 18.7833 16.3337 17.5C16.3337 16.2167 15.2837 15.1667 14.0003 15.1667Z" fill="#757575"/>
          </svg>
        </Grid> : <Grid width="3%"/>}
      </Grid>
    </React.Fragment>
  );
}

export default BtnHeader;