import { useFormikContext } from 'formik';

const SelectNetworkField = ({ name, placeholder, ...rest }) => {
  const { errors, values, touched, handleBlur, handleChange } = useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <div className="col-span-1">
      <select
        value={value}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        placeholder={placeholder}
        className="border rounded-md w-[100%] bg-transparent p-3 text-[14px]"
        {...rest}
      >
        <option value="">Select blockchain network</option>
        <option value="ERC20">ERC20</option>
        <option value="BEP2">BEP2</option>
        <option value="BEP20">BEP20</option>
        <option value="Bitcoin">Bitcoin</option>
        <option value="Solana">Solana</option>
        <option value="Tron">Tron</option>
        <option value="Ton">Ton</option>
      </select>
      {error && isInputTouched ? (
        <div className="text-red-500 text-[12px] font-400 lowercase">{error}</div>
      ) : null}
    </div>
  );
};

export default SelectNetworkField;
