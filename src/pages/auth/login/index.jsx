import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../components/global/Header';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginValues } from '../../../utils/initialValues';
import { validateLogin } from '../../../utils/validate';
import { errorNotification, successNotification } from '../../../utils/helpers';
import CustomFormik from '../../../utils/CustomFormik';
import InputField from '../../../components/forms/InputField';
import SubmitButton from '../../../components/forms/SubmitButton';
import Head from '../../../components/global/Head';
import checkLogin from '../../../api/checkLogin';

axios.defaults.withCredentials = true;

const Login = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  checkLogin();

  const initialValues = loginValues();
  const validationSchema = validateLogin();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);

    const payload = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin-auth/login`,
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
      <Head pageTitle="Login to Admin Dashboard" />
      <main className="content">
        <Box
          className="main"
          m="20px"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            sx={{
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <Box>
              <Header
                title="LOGIN"
                subtitle="Welcome Admin. Please login to your account to proceed to the dashboard"
              />
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
                <InputField name="email" placeholder="Enter email address" />
                <InputField name="password" placeholder="Account password" type="password" />
              </Box>

              <Box display="flex" justifyContent="center" mt="50px">
                <SubmitButton title="Login" isNoneMobile={isNoneMobile} />
              </Box>
            </CustomFormik>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Login;
