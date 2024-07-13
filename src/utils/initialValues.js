export const loginValues = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  return initialValues;
};

export const addUserValues = () => {
  const initialValues = {
    title: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    info: '',
  };
  return initialValues;
};

export const updateUserValues = (data) => {
  const initialValues = {
    title: data ? data.title : '',
    first_name: data ? data.first_name : '',
    last_name: data ? data.last_name : '',
    email: data ? data.email : '',
    phone: data ? data.phone : '',
    address: data ? data.address : '',
    city: data ? data.city : '',
    state: data ? data.state : '',
    zip_code: data ? data.zip_code : '',
    country: data ? data.country : '',
    info: data ? data.info : '',
  };
  return initialValues;
};

export const addUserTransactionValues = () => {
  const initialValues = {
    transaction_amount: '',
    profit_amount: '',
    wallet_balance: '',
    type: '',
  };
  return initialValues;
};

export const editTransactionValues = (data) => {
  const initialValues = {
    transaction_amount: data ? data.transaction_amount : '',
    profit_amount: data ? data.profit_amount : '',
    wallet_balance: data ? data.wallet_balance : '',
  };
  return initialValues;
};

export const updateUserBalanceValues = (data) => {
  const initialValues = {
    deposite_balance: data ? data.deposite_balance : '',
    total_balance: data ? data.total_balance : '',
    profit_balance: data ? data.profit_balance : '',
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

export const otpValues = () => {
  const initialValues = {
    otp: '',
  };
  return initialValues;
};

export const addAdminValues = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  return initialValues;
};

export const updateAdminProfileValues = (data) => {
  const initialValues = {
    username: data ? data.username : '',
    email: data ? data.email : '',
    password: '',
  };
  return initialValues;
};
export const updateWalletValues = (data) => {
  const initialValues = {
    erc20: data ? data.erc20 : '',
    bitcoin: data ? data.bitcoin : '',
  };
  return initialValues;
};

export const createAdPostValues = () => {
  const initialValues = {
    title: '',
    whatsapp: '',
    telegram: '',
  };
  return initialValues;
};

export const updateAdPostValues = (data) => {
  const initialValues = {
    title: data ? data.title : 'fff',
    whatsapp: data ? data.whatsapp : '',
    telegram: data ? data.telegram : '',
    slug: data ? data.slug : '',
  };
  return initialValues;
};
