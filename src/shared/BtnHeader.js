import React from 'react';
import {Grid, Text} from '../elements';
//이모지
import { BiChevronLeft } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const BtnHeader = (props) => {

  return (
    <React.Fragment>
      <Grid is_flex padding="2.9vh 6.2vw">
        {/* 뒤로가기 버튼 */}
        <Grid width="3vh">  
          <BiChevronLeft size="3vh"/>
        </Grid>
        {/* 페이지 이름 */}
        <Text bold size="16px" width="auto">{props.title}</Text>
        {/* 장바구니 이모지 유무 */}
        {props.display !== 'none' ? 
        <Grid width="3vh">
          <FiShoppingCart size="3vh"/>
        </Grid> : <Grid width="3vh%"/>}
      </Grid>
    </React.Fragment>
  );
}

export default BtnHeader;