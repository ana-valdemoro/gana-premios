import * as Yup from 'yup';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// store
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrorMessage } from '../../store/reducers/authSlice';
// project
import useTogglePasswordVisibility from '../../hooks/useTogglePasswordVisibility';

// ----------------------------------------------------------------------

export default function CreateClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputTypePassword, IconPassword] = useTogglePasswordVisibility();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const { error } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     if (user.lopd_uuid === '') {
  //       navigate('/lopd', { replace: true });
  //     } else {
  //       navigate('/dashboard', { replace: true });
  //     }
  //   }
  // }, [user, isLoggedIn, navigate]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('signInForm.email.validFormat'))
      .required(t('signInForm.email.required')),
    password: Yup.string().required(t('signInForm.password.required'))
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (error) {
        dispatch(clearErrorMessage());
      }

      dispatch(login(values)).then(() => {
        setSubmitting(false);
      });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t('signInForm.email.label')}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={inputTypePassword}
            label={t('signInForm.password.label')}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: <InputAdornment position="end">{IconPassword}</InputAdornment>
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <LoadingButton
          sx={{ marginTop: '24px' }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {t('signInButton')}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
