
import React from 'react';
import { Dimmer, Segment, Loader } from 'semantic-ui-react';

const LoadScreen = () => {
  return(
    <div >
      <Segment >
        <Dimmer active page>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      </Segment>
    </div>
  );
  
}
export default LoadScreen