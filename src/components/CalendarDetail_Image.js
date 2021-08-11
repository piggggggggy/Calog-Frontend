import React from 'react';
import {Grid, Image} from '../elements';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 김나영
*/

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