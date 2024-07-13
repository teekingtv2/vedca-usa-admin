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
import SelectCountryField from '../../components/forms/SelectCountryField';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const EditMember = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(
    `member-management/fetch-single-member/${id}`
  );

  const initialValues = updateUserValues(data ? data.data : null);
  const validationSchema = validateUpdateUser();
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
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/member-management/update-member/${id}`,
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
      <Head pageTitle="Edit Member Data" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Edit ${
                data ? data.data.first_name + "'s Profile" : 'Edit Team Member Profile'
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
                <SubmitButton title="Edit Member Profile" isNoneMobile={isNoneMobile} />
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

export default EditMember;
