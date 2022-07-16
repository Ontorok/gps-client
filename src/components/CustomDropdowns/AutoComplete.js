import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MuiAutoComplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const CustomAutoComplete = ({ data, label, name, value, disabled, error, onChange, showGroupBy, defaultValue, ...rest }) => {
  const [open, setOpen] = useState(false);
  const loading = open && data.length === 0;
  return (
    <MuiAutoComplete
      disabled={disabled}
      fullWidth
      size="small"
      options={data}
      loading={loading}
      value={value}
      open={open}
      onChange={onChange}
      name={name}
      defaultValue={defaultValue}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={option => (option.label ? option.label : option)}
      renderInput={params => (
        <TextField
          {...params}
          margin="dense"
          variant="outlined"
          label={label}
          required={rest.required || false}
          className={rest.className}
          {...(error && { error: true, helperText: error })}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

CustomAutoComplete.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object,
  error: PropTypes.string,
  onChange: PropTypes.func,
  showGroupBy: PropTypes.bool,
  disabled: PropTypes.bool
};

CustomAutoComplete.defaultProps = {
  label: '',
  name: '',
  error: '',
  disabled: false
};

export default CustomAutoComplete;
