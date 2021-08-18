import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

const StyledPaper = styled(Paper)({
  padding: '1em',
});

const JobLoadingSkeleton = () => {
  return (
    <StyledPaper data-testid='job-skeleton'>
      <Grid container>
        <Grid item xs={9}>
          <Skeleton variant='text' height='30px' />
          <Skeleton variant='rect' height='100px' />
          <Skeleton variant='text' height='30px' />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Skeleton variant='rect' height='160px' />
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default JobLoadingSkeleton;
