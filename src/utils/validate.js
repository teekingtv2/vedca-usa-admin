import * as yup from 'yup';

export const validateLogin = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Account email is missing'),
    password: yup
      .string()
      .trim()
      .min(8, 'Password is too short')
      .required('Account password is missing'),
  });
  return validationSchema;
};

export const validateAddUser = () => {
  const phoneRegExp = /^[\+][0-9]{7,15}$/;
  const validationSchema = yup.object({
    name: yup.string().trim().required('Name is missing'),
    email: yup.string().email('Invalid email').required('Email is missing'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Invalid phone number. Follow the sample (+11255678765)')
      .required('Phone number is missing'),
    wallet: yup.string().trim().required('wallet is missing'),
    network: yup.string().trim().required('Blockchain network is missing'),
    country: yup.string().trim().required('Please select your country'),
    password: yup.string().trim().min(8, 'Password is too short').required('Password is missing'),
    confirmPassword: yup
      .string()
      .required('Confirm Account Password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return validationSchema;
};

export const validateUpdateUser = () => {
  const phoneRegExp = /^[\+][0-9]{7,15}$/;
  const validationSchema = yup.object({
    name: yup.string().trim().required('Name is missing'),
    network: yup.string().trim().required('Select blockchain network'),
    wallet: yup.string().trim().required('Wallet address is missing'),
    country: yup.string().trim().required('Please select your country'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Invalid phone number. Follow the sample')
      .required('Phone number is missing'),
  });
  return validationSchema;
};

export const validateUpdateUserBalance = () => {
  const validationSchema = yup.object({
    deposite_balance: yup.string().trim().required('Deposit balance is missing'),
    total_balance: yup.string().trim().required('Wallet total balance is missing'),
    profit_balance: yup.string().trim().required('Profit profit is missing '),
  });
  return validationSchema;
};

export const validateAddUserTransaction = () => {
  const validationSchema = yup.object({
    transaction_amount: yup.string().trim().required('Transaction amount is missing'),
    wallet_balance: yup.string().trim().required('Wallet balance is missing'),
    type: yup.string().trim().required('Please select transaction type '),
  });
  return validationSchema;
};

export const validateEditTransaction = () => {
  const validationSchema = yup.object({
    transaction_amount: yup.string().trim().required('Transaction amount is missing'),
    wallet_balance: yup.string().trim().required('Wallet balance is missing'),
    profit_amount: yup.string().trim().required('Profit amount is missing '),
  });
  return validationSchema;
};

export const validateUpdatePassword = () => {
  const validationSchema = yup.object({
    oldPassword: yup.string().required('Old Password is required'),
    newPassword: yup
      .string()
      .required('Account Password is required')
      .min(8, 'Password is too short'),
    confirmNewPassword: yup
      .string()
      .required('Confirm Account Password')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });
  return validationSchema;
};

export const validateForgotPassword = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Account email is missing'),
  });
  return validationSchema;
};

export const validateResetPassword = () => {
  const validationSchema = yup.object({
    password: yup.string().trim().min(8, 'Password is too short').required('Password is missing'),
    confirmPassword: yup
      .string()
      .required('Confirm Account Password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return validationSchema;
};

export const validateOtp = () => {
  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .trim()
      .min(4, 'OTP is incomplete')
      .max(5, 'OTP digits cannot be more than 4 characters long')
      .required('Please provide the OTP'),
  });
  return validationSchema;
};

export const validateAddAdmin = () => {
  const phoneRegExp = /^[\+][0-9]{7,15}$/;
  const validationSchema = yup.object({
    username: yup.string().trim().required('Name is missing'),
    email: yup.string().email('Invalid email').required('Email is missing'),
    password: yup.string().trim().min(8, 'Password is too short').required('Password is missing'),
    confirmPassword: yup
      .string()
      .required('Confirm Account Password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return validationSchema;
};

export const validateUpdateAdmin = () => {
  const validationSchema = yup.object({
    username: yup.string().trim().required('Name is missing'),
    email: yup.string().email('Invalid email').required('Email is missing'),
  });
  return validationSchema;
};
export const validateUpdateWallet = () => {
  const validationSchema = yup.object({
    erc20: yup.string().trim().required('erc20 wallet address is missing'),
    bitcoin: yup.string().trim().required('bitcoin wallet address is missing'),
  });
  return validationSchema;
};
