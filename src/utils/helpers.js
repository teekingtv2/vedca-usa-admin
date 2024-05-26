import { toast } from 'react-toastify';

export const successNotification = (message) => toast.success(message);
export const errorNotification = (message) => toast.error(message);

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
