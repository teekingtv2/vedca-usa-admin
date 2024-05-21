import React from 'react';
import { ToastContainer } from 'react-toastify';
import InputField from './forms/InputField';
import CustomFormik from '../utils/CustomFormik';
import { validateUpdateProfile } from '../utils/validate';
import { updateProfileValues } from '../utils/initialValues';
import SubmitButton from './forms/SubmitButton';
import { Link } from 'react-router-dom';
import SelectCountryField from './forms/SelectCountryField';
import SelectNetworkField from './forms/SelectNetworkField';

const EditProfileBody = ({ userData }) => {
  const initialValues = updateProfileValues(userData);
  const validationSchema = validateUpdateProfile();

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className=" w-[100%]">
        <div className="">
          <div className="flex justify-between items-end mb-10">
            <div className="text-[18px] md:text-[25px] font-bold mb-[10px]">Edit your profile</div>
            <Link className="primary-btn" to="/">
              Go back
            </Link>
          </div>
          <div className="p-2 bg-[#151515c2] overflow-x-scroll pt-8 pb-2">
            <div className="p-2 w-[100%]">
              <CustomFormik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <div className="font-bold text-[14.5px] md:text-[18px] uppercase grid grid-cols-1 gap-8 md:grid-cols-2 w-[100%] p-2 mb-2">
                  <InputField name="name" placeholder="Your full name" />
                  <InputField name="email" disabled={true} />
                  <InputField name="phone" placeholder="Your phone number" />
                  <InputField name="wallet" placeholder="Wallet address" />
                  <SelectNetworkField name="network" />
                  <SelectCountryField name="country" />
                </div>
                <SubmitButton title="Update profile" className="mt-10 w-[100%]" />
              </CustomFormik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileBody;
