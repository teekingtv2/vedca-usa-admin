import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const sender = async (url, payload) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/${url}`, payload, {
      withCredentials: true,
    });
    console.log(response);
    // setStatus(response.status);
    // setData(response.data.data);
    // setLoading(false);
  } catch (error) {
    // setLoading(false);
    // setError(err?.response?.data?.error);
    // setStatus(err?.response.status);
  }

  return { data, status, loading, error };
};

export default sender;
