import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';

const useStyles = makeStyles(() => ({
  headerRoot: {
    paddingBottom: 8,
  },
}));

const GrowthCard = ({ growth, desc, children }) => {
  const classes = useStyles();

  return (
    <CmtCard>
      <CmtCardHeader
        className={classes.headerRoot}
        title={
          <Box component="h2" color={growth > 0 ? '#8DCD03' : '#E00930'}>
            {growth}% {growth > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
          </Box>
        }
        subTitle={
          <Box component="p" mb={0} color="text.secondary" fontSize={12}>
            {desc}
          </Box>
        }
      />
      {children}
    </CmtCard>
  );
};

export default GrowthCard;
