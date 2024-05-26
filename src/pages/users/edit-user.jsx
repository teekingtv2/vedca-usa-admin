import { Box, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateUpdateUser } from '../../utils/validate';
import { updateUserValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';
import useFetchCredential from '../../api/useFetchCredential';
import SelectNetworkField from '../../components/forms/SelectNetworkField';
import SelectCountryField from '../../components/forms/SelectCountryField';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const EditUser = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(`user-management/fetch-single-user/${id}`);

  const initialValues = updateUserValues(data ? data.data : null);
  const validationSchema = validateUpdateUser();
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
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user-management/update-user-profile/${id}`,
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
      <Head pageTitle="Edit User Account" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Edit ${
                data ? data.data.name.split(' ')[0] + "'s Profile" : 'Edit Team Member Profile'
              }`}
              subtitle="You can edit the profile data for this team member"
            />
          </Box>
          {data && (
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
                <SubmitButton title="Edit User Profile" isNoneMobile={isNoneMobile} />
              </Box>
            </CustomFormik>
          )}
          {loading && <ProgressCircle progress="0.5" />}
          {error && <div style={{ color: 'red !important', fontSize: '20px' }}>{error}</div>}
        </Box>
      </main>
    </>
  );
};

export default EditUser;
