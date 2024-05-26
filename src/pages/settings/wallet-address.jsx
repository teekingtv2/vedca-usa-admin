import { Box, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateUpdateWallet } from '../../utils/validate';
import { updateWalletValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';
import useFetchCredential from '../../api/useFetchCredential';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const WalletAddress = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const { data, loading, error } = useFetchCredential(`admin-auth/get-wallet-address`);

  const initialValues = updateWalletValues(data ? data.data[0] : null);
  const validationSchema = validateUpdateWallet();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);

    const payload = {
      erc20: values.erc20,
      bitcoin: values.bitcoin,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin-auth/update-wallet-address/${data?.data[0]._id}`,
        payload,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        history('/');
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Head pageTitle="Edit Admin Profile" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Edit ${
                data ? data.data.username + "'s Profile" : 'Edit Team Member Profile'
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
                <InputField name="erc20" placeholder="Enter erc20 wallet address" />
                <InputField name="bitcoin" placeholder="Enter bitcoin wallet address" />
              </Box>

              <Box display="flex" justifyContent="end" mt="50px">
                <SubmitButton title="Update Network" isNoneMobile={isNoneMobile} />
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

export default WalletAddress;
