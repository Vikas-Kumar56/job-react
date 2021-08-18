import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllJobs, fetchJobs } from '../../features/job/jobSlice';
import JobList from './JobList';
import JobLoadingSkeleton from './JobLoadingSkeleton';
import { Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  marginTop: '4em',
});

const StyledButton = styled(Button)({
  width: '20%',
  height: '4em',
});

const JobContainer = () => {
  const [filter, setFilter] = useState({ limit: 1, offset: 0 });

  const dispatch = useDispatch();
  const jobs = useSelector(selectAllJobs);

  const jobStatus = useSelector((state) => state.jobs.status);

  useEffect(() => {
    dispatch(fetchJobs(filter));
  }, [dispatch, filter]);

  const fetchMoreJobs = () => {
    const { limit, offset } = filter;
    setFilter({ limit, offset: offset + limit });
  };

  const getLoadMoreSkeleton = () => {
    if (jobStatus === 'loading') {
      return (
        <Box mt={2}>
          <JobLoadingSkeleton />
        </Box>
      );
    }
    return <></>;
  };

  const getView = () => {
    if (jobStatus === 'loading' && jobs.length === 0) {
      return <JobLoadingSkeleton />;
    }

    // add message when job is empty

    // add message when http request failed

    return (
      <>
        <JobList jobs={jobs} />
        {getLoadMoreSkeleton()}
        <StyledBox>
          <StyledButton
            variant='contained'
            color='primary'
            onClick={fetchMoreJobs}
            disabled={jobStatus === 'loading'}
          >
            Load More
          </StyledButton>
        </StyledBox>
      </>
    );
  };

  return <>{getView()}</>;
};

export default JobContainer;
