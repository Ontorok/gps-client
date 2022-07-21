import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Dropdown = props => {
  const { dropdownLabel, options, value, onChange, onFocus } = props;
  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel>{dropdownLabel}</InputLabel>
      <Select value={value} onChange={onChange} label={dropdownLabel} onFocus={onFocus}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map(option => {
          const { label, value, key } = option;
          return (
            <MenuItem key={key} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  dropdownLabel: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

Dropdown.defaultProps = {
  dropdownLabel: '',
  value: '',
  onChange: () => {},
  onFocus: () => {}
};

export default Dropdown;
