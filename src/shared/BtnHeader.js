import React from 'react';
import {Grid, Text} from '../elements';
//이모지
import { BiChevronLeft } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const BtnHeader = (props) => {

  return (
    <React.Fragment>
      <Grid is_flex padding="8% 20px">
        <Grid width="7%">
          <BiChevronLeft size="30px"/>
        </Grid>
        <Text bold size="16px" width="auto">{props.title}</Text>
        <Grid width="10%">
        {props.display !== 'none' && <FiShoppingCart size="30px"/>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BtnHeader;