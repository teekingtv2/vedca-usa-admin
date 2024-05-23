import { useEffect } from 'react';
import axios from 'axios';
import { errorNotification } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const checkLogin = () => {
  const history = useNavigate();
  useEffect(() => {
    const check = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-auth/check-session`, {
        withCredentials: true,
      });
      try {
        if (response.status === 200) {
          errorNotification(
            "You are already a logged in user. You'll be redirected in a few seconds."
          );
          setTimeout(() => history('/'), 2000);
        }
      } catch (error) {
        errorNotification(error?.response?.data?.error);
      }
    };
    check();
  }, []);
};

export default checkLogin;
