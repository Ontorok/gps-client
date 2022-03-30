import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const CustomAutoComplete = React.forwardRef((props, ref) => {
  const { data, label, name, value, disabled, error, onChange, showGroupBy, defaultValue, ...rest } = props;
  const [open, setOpen] = React.useState(false);

  const sortedData = _.sortBy(data, ['label']);

  const options = sortedData.map(option => {
    const firstLetter = option.label[0].toUpperCase();
    return { 
      firstLetter,
      ...option
    }; 
  });
  const loading = open && options.length === 0;

  return (
    <Autocomplete
      disabled={disabled}
      fullWidth
      size="small"
      innerref={ref}
      options={options}
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
      {...(showGroupBy && { groupBy: option => option.firstLetter })}
      renderInput={params => (
        <TextField
          {...params}
          margin="dense"
          variant="outlined"
          label={label}
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
});

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
  showGroupBy: false,
  disabled: false
};

export default CustomAutoComplete;
