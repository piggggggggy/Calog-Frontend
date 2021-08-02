import React from 'react';
import {Grid} from '../elements';
//history
import {history} from '../redux/configStore';

const LogoHeader = (props) => {
  return (
    <React.Fragment>
      <Grid bg={'gray'} height="44px" width="10%" margin="2% 5%" _onClick={() => history.push('/')}>
        
      </Grid>
    </React.Fragment>
  );
}

export default LogoHeader;