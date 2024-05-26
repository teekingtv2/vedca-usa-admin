import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormikContext } from 'formik';

const SelectTransactionType = ({ name, placeholder, ...rest }) => {
  const { errors, values, touched, handleBlur, handleChange } = useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        position: 'relative',
      }}
    >
      <InputLabel
        id="select"
        sx={{
          position: 'absolute',
          zIndex: '1',
          marginTop: '2px',
          paddingLeft: '10px',
        }}
      >
        {placeholder}
      </InputLabel>
      <Select
        fullWidth
        variant="filled"
        labelId={placeholder}
        onBlur={handleBlur(name)}
        onChange={handleChange(name)}
        value={value}
        error={!!isInputTouched && !!error}
        helperText={isInputTouched && error}
        sx={{
          backgroundColor: 'transparent',
          position: 'absolute',
          zIndex: '111',
          top: '0px',
          height: '50px',
        }}
      >
        <MenuItem value="">Select transaction type</MenuItem>
        <MenuItem value="deposit">deposit/trading</MenuItem>
        <MenuItem value="withdrawal">withdrawal</MenuItem>
      </Select>
    </Box>
  );
};

export default SelectTransactionType;
