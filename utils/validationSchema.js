import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string().min(3).required('Username is required'),
});

