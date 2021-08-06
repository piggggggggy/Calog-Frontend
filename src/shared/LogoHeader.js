import React from 'react';
import {Grid} from '../elements';
//history
import {history} from '../redux/configStore';

const LogoHeader = (props) => {
  return (
    <React.Fragment>
      <Grid bg="#FFE899" padding="2vh 2.8vh">
        <Grid bg={'gray'} height="4.8vh" width="4.8vh" _onClick={() => history.push('/')}></Grid>
      </Grid>
    </React.Fragment>
  );
}

export default LogoHeader;