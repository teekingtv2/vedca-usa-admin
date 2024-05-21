import { useFormikContext } from 'formik';

const InputField = ({ name, placeholder, type = 'text', className, disabled = false, ...rest }) => {
  const { errors, values, touched, handleBlur, handleChange } = useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <div className="col-span-1">
      <input
        value={value}
        placeholder={placeholder}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        type={type}
        disabled={disabled}
        className="border rounded-md w-[100%] bg-transparent p-3 text-[14px]"
        autoComplete="off"
        {...rest}
      />
      {error && isInputTouched ? (
        <div className="text-red-500 text-[12px] font-400 lowercase">{error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
