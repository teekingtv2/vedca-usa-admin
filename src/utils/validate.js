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
  const phoneRegExp = /^[\d|\+|\(]+[\)|\d|\s|-]*[\d]$/;
  const validationSchema = yup.object({
    title: yup.string().trim().required('Please select your title'),
    first_name: yup.string().trim().required('First Name is missing'),
    last_name: yup.string().trim().required('Last Name is missing'),
    email: yup.string().email('Invalid email').required('Email is missing'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Invalid phone number. Follow the sample: +11255678765')
      .required('Phone number is missing'),
    address: yup.string().trim().required('Your address is missing'),
    city: yup.string().trim().required('In which city do you live?'),
    state: yup.string().trim().required('YWhat state?'),
    zip_code: yup.string().trim().required('Zip code is missing'),
    country: yup.string().trim().required('Select the country of residence'),
    info: yup.string().trim().required('Tell us about yourself'),
  });
  return validationSchema;
};

export const validateUpdateUser = () => {
  const phoneRegExp = /^[\d|\+|\(]+[\)|\d|\s|-]*[\d]$/;
  const validationSchema = yup.object({
    title: yup.string().trim().required('Please select your title'),
    first_name: yup.string().trim().required('First Name is missing'),
    last_name: yup.string().trim().required('Last Name is missing'),
    email: yup.string().email('Invalid email').required('Email is missing'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Invalid phone number. Follow the sample: +11255678765')
      .required('Phone number is missing'),
    address: yup.string().trim().required('Your address is missing'),
    city: yup.string().trim().required('In which city do you live?'),
    state: yup.string().trim().required('YWhat state?'),
    zip_code: yup.string().trim().required('Zip code is missing'),
    country: yup.string().trim().required('Select the country of residence'),
    info: yup.string().trim().required('Tell us about yourself'),
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
