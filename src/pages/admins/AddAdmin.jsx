import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateAddAdmin } from '../../utils/validate';
import { addAdminValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';

axios.defaults.withCredentials = true;

const AddAdmin = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');

  const initialValues = addAdminValues();
  const validationSchema = validateAddAdmin();
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
        `${import.meta.env.VITE_API_URL}/admin-management/add-admin`,
        payload,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        history('/admins');
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Head pageTitle="Add New Admin" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header title="ADD NEW ADMIN" subtitle="Create a new Admin Profile" />
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
              <InputField name="username" placeholder="Enter username" />
              <InputField name="email" placeholder="Enter email address" />
              <InputField name="password" placeholder="Account password" type="password" />
              <InputField name="confirmPassword" placeholder="Confirm password" type="password" />
            </Box>

            <Box display="flex" justifyContent="end" mt="50px">
              <SubmitButton title="Add New Admin Profile" isNoneMobile={isNoneMobile} />
            </Box>
          </CustomFormik>
        </Box>
      </main>
    </>
  );
};

export default AddAdmin;
