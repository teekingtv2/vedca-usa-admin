import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateAddUser } from '../../utils/validate';
import { addUserValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';
import SelectNetworkField from '../../components/forms/SelectNetworkField';
import SelectCountryField from '../../components/forms/SelectCountryField';

axios.defaults.withCredentials = true;

const AddUser = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');

  const initialValues = addUserValues();
  const validationSchema = validateAddUser();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);
    const payload = {
      name: values.name,
      email: values.email,
      wallet: values.wallet,
      network: values.network,
      country: values.country,
      phone: values.phone,
      password: values.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user-auth/signup`,
        payload,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        history('/users');
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Head pageTitle="Add New User" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header title="ADD NEW USER" subtitle="Create a new User Account" />
          </Box>
          <CustomFormik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                '& > div': {
                  gridColumn: isNoneMobile ? undefined : 'span 4',
                },
              }}
              m="40px 0 0 0"
            >
              <InputField name="name" placeholder="Your full name" />
              <InputField name="email" placeholder="Your email address" />
              <InputField name="wallet" placeholder="Wallet address" />
              <SelectNetworkField name="network" placeholder="Select blockchain network" />
              <SelectCountryField name="country" placeholder="Select Country of Residence" />
              <InputField name="phone" placeholder="Phone number (with country code)" />
              <InputField name="password" placeholder="Account password" type="password" />
              <InputField name="confirmPassword" placeholder="Confirm password" type="password" />
            </Box>

            <Box display="flex" justifyContent="end" mt="50px">
              <SubmitButton title="Add New User Account" isNoneMobile={isNoneMobile} />
            </Box>
          </CustomFormik>
        </Box>
      </main>
    </>
  );
};

export default AddUser;
