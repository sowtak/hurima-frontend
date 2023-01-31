import React from 'react';
import { LinearProgress, Box } from '@mui/material';

interface Props {
  isLoading: boolean;
}

const PageLoader: React.FC<Props> = ({ isLoading }) => {
  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex={1}>
      {isLoading && <LinearProgress color="primary" />}
    </Box>
  );
};

export default PageLoader;
