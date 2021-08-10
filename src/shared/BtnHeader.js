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
        <Grid width="auto" _onClick={() => history.push('/loading/cart')}>
          <FiShoppingCart size="3vh"/>
        </Grid> : <Grid width="3%"/>}
      </Grid>
    </React.Fragment>
  );
}

export default BtnHeader;