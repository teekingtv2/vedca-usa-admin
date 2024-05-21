import { useFormikContext } from 'formik';

const SubmitButton = ({ title, className }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className={className}
      disabled={isSubmitting ? true : false}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
