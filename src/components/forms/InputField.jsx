import { Box, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const InputField = ({ name, placeholder, type = 'text', className, disabled = false, ...rest }) => {
  const { errors, values, touched, handleBlur, handleChange } = useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {type === 'password' ? (
        <Box
          fullWidth
          sx={{
            background: '#293040',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            label={placeholder}
            onBlur={handleBlur(name)}
            onChange={handleChange(name)}
            value={value}
            error={!!isInputTouched && !!error}
            helperText={isInputTouched && error}
            placeholder={placeholder}
            sx={{ width: '92%' }}
          />
          <Box
            sx={{
              width: '8%',
              height: '100%',
              display: 'flex',
              // background: '#293040',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FaEye size={20} onClick={togglePassword} />
          </Box>
        </Box>
      ) : (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label={placeholder}
          onBlur={handleBlur(name)}
          onChange={handleChange(name)}
          value={value}
          error={!!isInputTouched && !!error}
          helperText={isInputTouched && error}
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export default InputField;
