import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

const CustomPagination = props => {
  const { count, onChange } = props;
  return <Pagination count={count} variant="outlined" color="primary" showFirstButton showLastButton onChange={onChange} size="small" />;
};

CustomPagination.propTypes = {
  count: PropTypes.number,
  onChange: PropTypes.func
};

export default CustomPagination;
