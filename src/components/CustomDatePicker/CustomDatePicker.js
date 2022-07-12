import { DatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React from 'react';

const CustomDatePicker = props => {
  const { label, value, disablePast, disableFuture, onChange, minDate, maxDate, disabled, error, clearable, ...rest } = props;
  return (
    <DatePicker
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      autoOk
      clearable={clearable}
      animateYearScrolling
      fullWidth
      disablePast={disablePast}
      disableFuture={disableFuture}
      inputVariant="outlined"
      size="small"
      color="primary"
      margin="dense"
      format="DD-MMM-yyyy"
      label={label}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...rest}
    />
  );
};

CustomDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

CustomDatePicker.defaultProps = {
  disablePast: false,
  disableFuture: false,
  clearable: false
};

export default CustomDatePicker;
