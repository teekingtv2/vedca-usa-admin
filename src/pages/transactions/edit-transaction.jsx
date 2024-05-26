import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateEditTransaction } from '../../utils/validate';
import { editTransactionValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';
import useFetchCredential from '../../api/useFetchCredential';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const EditTransaction = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(
    `user-management/fetch-single-transaction/${id}`
  );

  const initialValues = editTransactionValues(data ? data.data : null);
  const validationSchema = validateEditTransaction();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);

    const payload = {
      transaction_amount: values.transaction_amount,
      profit_amount: values.profit_amount,
      wallet_balance: values.wallet_balance,
      type: values.type,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user-management/edit-transaction/${id}`,
        payload,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        history('/transactions');
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Head pageTitle="Edit User Account Transaction" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Edit transaction on ${
                data
                  ? data.data.name.split(' ')[0] + "'s account"
                  : "Record transaction on user's account"
              }`}
              subtitle="You can edit this transaction for the user account here"
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
                <InputField name="transaction_amount" placeholder="Amount deposited/withdrawn" />
                <InputField name="profit_amount" placeholder="Profit made" />
                <InputField name="wallet_balance" placeholder="Wallet total balance" />
              </Box>

              <Box display="flex" justifyContent="end" mt="50px">
                <SubmitButton title="Update Transaction Record" isNoneMobile={isNoneMobile} />
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

export default EditTransaction;
