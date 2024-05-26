import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateUpdateUserBalance } from '../../utils/validate';
import { updateUserBalanceValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';
import useFetchCredential from '../../api/useFetchCredential';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const EditUserBalance = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(`user-management/fetch-single-user/${id}`);

  const initialValues = updateUserBalanceValues(data ? data.data : null);
  const validationSchema = validateUpdateUserBalance();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);

    const payload = {
      deposite_balance: values.deposite_balance,
      profit_balance: values.profit_balance,
      total_balance: values.total_balance,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user-management/edit-user-balance/${id}`,
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
      <Head pageTitle="Update User Account Balance" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Edit user ${
                data
                  ? data.data.name.split(' ')[0] + "'s account balances"
                  : 'Edit user account balances'
              }`}
              subtitle="You can edit this user account balances here"
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
                <InputField name="deposite_balance" placeholder="Deposit balance" />
                <InputField name="profit_balance" placeholder="Profit balance" />
                <InputField name="total_balance" placeholder="Wallet total balance" />
              </Box>

              <Box display="flex" justifyContent="end" mt="50px">
                <SubmitButton title="Update User Balance" isNoneMobile={isNoneMobile} />
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

export default EditUserBalance;
