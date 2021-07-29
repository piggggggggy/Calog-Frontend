import React from 'react';
import {Grid, Text} from '../elements';
//이모지
import { BiChevronLeft } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const BtnHeader = (props) => {

  return (
    <React.Fragment>
      <Grid is_flex padding="5% 25px">
        <Grid width="7%">
          <BiChevronLeft size="40px"/>
        </Grid>
        <Text bold size="1rem" width="auto">{props.title}</Text>
        <Grid width="10%">
          <FiShoppingCart size="30px"/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BtnHeader;