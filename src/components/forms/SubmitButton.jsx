import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const SubmitButton = ({ title, isNoneMobile }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <Button
      type="submit"
      color="secondary"
      variant="contained"
      sx={{
        fontSize: '16px',
        fontWeight: '600',
        padding: '10px 20px',
        width: isNoneMobile ? '300px' : '100%',
      }}
      onClick={handleSubmit}
      disabled={isSubmitting ? true : false}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
