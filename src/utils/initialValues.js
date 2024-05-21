export const loginValues = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  return initialValues;
};

export const signUpValues = () => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    wallet: '',
    country: '',
    password: '',
    confirmPassword: '',
  };
  return initialValues;
};

export const updateProfileValues = (userData) => {
  const initialValues = {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    wallet: userData.wallet,
    network: userData.network,
    country: userData.country,
  };
  return initialValues;
};

export const editPaswordValues = () => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  return initialValues;
};

export const forgotPasswordValues = () => {
  const initialValues = {
    email: '',
  };
  return initialValues;
};

export const resetPasswordValues = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  return initialValues;
};
