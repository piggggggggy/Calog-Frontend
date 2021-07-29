import React from 'react';
import {Grid, Text} from '../elements';
//이모지
import { BiChevronLeft } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const BtnHeader = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex padding="5% 6%">
        <Grid width="7%">
          <BiChevronLeft size="40px"/>
        </Grid>
        <Text width="auto">페이지 이름</Text>
        <Grid width="10%">
          <FiShoppingCart size="30px"/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BtnHeader;