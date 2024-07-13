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

const AddMember = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');

  const initialValues = addUserValues();
  const validationSchema = validateAddUser();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);
    const payload = {
      title: values.title,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      zip_code: values.zip_code,
      country: values.country,
      info: values.info,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_GENERAL}/website/register`,
        payload,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        history('/members');
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Head pageTitle="Add New Member" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header title="ADD NEW MEMBER" subtitle="Create a new Member Account" />
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
              <InputField name="title" placeholder="Title" />
              <InputField name="first_name" placeholder="First name" />
              <InputField name="last_name" placeholder="Last name" />
              <InputField name="email" placeholder="Your email address" />
              <InputField name="phone" placeholder="Phone number (with country code)" />
              <InputField name="address" placeholder="Address" />
              <InputField name="city" placeholder="City" />
              <InputField name="state" placeholder="State" />
              <InputField name="zip_code" placeholder="Zip code" />
              <SelectCountryField name="country" placeholder="Select Country of Residence" />
              <InputField name="info" placeholder="Info" />
            </Box>

            <Box display="flex" justifyContent="end" mt="50px">
              <SubmitButton title="Add New Member Account" isNoneMobile={isNoneMobile} />
            </Box>
          </CustomFormik>
        </Box>
      </main>
    </>
  );
};

export default AddMember;
