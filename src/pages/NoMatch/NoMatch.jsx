import React from 'react';
import { Typography } from '@material-ui/core';


const NoMatch = () => (
  <div>
    <Typography component="h1" align="center" variant="h4">
      Not Found
    </Typography>
    <Typography component="h1" align="center">
      Seems like the page you are looking after does not exist.
    </Typography>
  </div>
);
export default NoMatch;
