import React from 'react';
import {Grid, Image} from '../elements';



const CalendarDetail_Image = (props) => {

  const url = props

  return (
    <React.Fragment>
        <Grid height="221px">
          <Image height="221px" src={url[0]} b_size="100% 100%"/>
        </Grid>
    </React.Fragment>
  );
}

export default CalendarDetail_Image;