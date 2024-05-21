import React from 'react';
import InputField from './forms/InputField';
import CustomFormik from '../utils/CustomFormik';
import { validateUpdatePassword } from '../utils/validate';
import { editPaswordValues } from '../utils/initialValues';
import SubmitButton from './forms/SubmitButton';
import { Link } from 'react-router-dom';

const EditPasswordBody = () => {
  const initialValues = editPaswordValues();
  const validationSchema = validateUpdatePassword();

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className=" w-[100%]">
        <div className="">
          <div className="flex justify-between items-end mb-10">
            <div className="text-[18px] md:text-[25px] font-bold mb-[10px]">Update password</div>
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
                  <InputField name="oldPassword" placeholder="Your current password" />
                  <InputField name="newPassword" placeholder="New password" />
                  <InputField name="confirmNewPassword" placeholder="Confirm new password" />
                </div>
                <SubmitButton title="Update password" className="mt-10 w-[100%]" />
              </CustomFormik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPasswordBody;
