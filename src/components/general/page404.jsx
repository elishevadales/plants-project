import React from 'react';
import { Typography, Box } from '@mui/material';

const Page404 = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
    >
      <Typography variant="h1">404</Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Sorry, the page you are looking for could not be found.
      </Typography>
    </Box>
  );
}

export default Page404;