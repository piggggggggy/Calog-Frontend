import React from 'react';
import {Grid} from '../elements';
//history
import {history} from '../redux/configStore';

const LogoHeader = (props) => {
  return (
    <React.Fragment>
      <Grid bg={'gray'} height="4.8vh" width="4.8vh" margin="2vh 2.8vh" m_margin="2vh 2.8vh" _onClick={() => history.push('/')}>
        
      </Grid>
    </React.Fragment>
  );
}

export default LogoHeader;