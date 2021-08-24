import React from 'react';
import {Grid, Image} from '../elements';

// img
import noImg from '../img/noImg.png';

/** 
 * @역할 유저가 기록한 이미지 유무에 따라 캘린더 상세 페이지에서 다르게 표시되기 위한 컴포넌트
 * @필수값 url
 * @담당자 김나영
*/

const CalendarDetail_Image = (props) => {

  const url = props;
  
  return (
    <React.Fragment>
      {url[0] === "" ? (
        <Grid height="221px">
          <Image height="221px" src={noImg} b_size="100% 100%"/>
        </Grid>
      ) : (
        <Grid height="221px">
          <Image height="221px" src={url[0]} b_size="100% 100%"/>
        </Grid>
      )}
        
    </React.Fragment>
  );
};

export default CalendarDetail_Image;