import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import InputField from '../forms/InputField';
import CustomFormik from '../../utils/CustomFormik';
import { validateResetPassword } from '../../utils/validate';
import { resetPasswordValues } from '../../utils/initialValues';
import SubmitButton from '../forms/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';

const ResetPasswordBody = () => {
  const initialValues = resetPasswordValues();
  const validationSchema = validateResetPassword();
  const history = useNavigate();
  const successNotification = (message) => toast.success(message);
  const errorNotification = (message) => toast.error(message);

  const handleSubmit = (values) => {
    console.log(values);
    // successNotification('Password successfully updated');
    setTimeout(() => history('/login'), 1000);
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
      <div className="w-[100%] mx-auto">
        <div className="px-10 bg-[#111111da] overflow-x-scroll pt-[50px] pb-[50px] register-box">
          <div className="text-[24px] text-center mb-5 font-bold text-[#fff]">
            Reset your account password
          </div>
          <div className="p-2 w-[100%]">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="font-bold text-[14.5px] md:text-[18px] grid grid-cols-1 gap-8 md:grid-cols-1 w-[100%] p-2 mb-2">
                <InputField name="password" placeholder="Set password" />
                <InputField name="confirmPassword" placeholder="Confirm password" />
              </div>
              <SubmitButton title="Reset Password" className="mt-10 w-[100%]" />
              <div className="text-[16px] text-center mt-[20px] flex justify-center gap-2">
                Remembered password?
                <Link to="/login" className="text-[#ffe6a6] font-bold">
                  Login instead
                </Link>
              </div>
            </CustomFormik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordBody;
