import axios from 'axios';
import { errorNotification, successNotification } from '../utils/helpers';

const useDelete = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  axios
    .delete(`${import.meta.env.VITE_API_URL}/${url}`, { withCredentials: true })
    .then((response) => {
      if (response.status !== 200) {
        throw Error('Could not delete data from the data source');
      }
      successNotification(response.data.data.message);
      window.location.reload();
    })
    .catch((err) => {
      if (err.name === 'CanceledError') {
      } else {
        setLoading(false);
        setError(err?.response?.data?.error);
        errorNotification(err?.response?.data?.error);
        if (err?.response.status === 400) {
          setTimeout(() => {
            window.location.replace(`/login`);
          }, 2000);
        }
      }
      setLoading(false);
      setError(err.message);
      console.log(err.message);
    });

  return { loading, error };
};

export default useDelete;
