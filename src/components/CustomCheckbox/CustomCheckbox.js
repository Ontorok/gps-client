/* eslint-disable no-console */
import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const CustomCheckbox = props => {
  const { name, label, checked, disabled, onChange, ...rest } = props;
  return (
    <>
      <FormControlLabel
        control={<MuiCheckbox color="primary" disabled={disabled} checked={checked} onChange={onChange} name={name} />}
        label={label}
        {...rest}
      />
    </>
  );
};

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

CustomCheckbox.defaultProps = {
  disabled: false,
  label: ''
};

export default CustomCheckbox;
