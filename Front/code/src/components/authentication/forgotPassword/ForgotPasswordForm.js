import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// store
import { useDispatch, useSelector } from 'react-redux';
import Captcha from '../../Captcha';
import { login, clearErrorMessage } from '../../../store/reducers/authSlice';

// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [resetCaptcha, setResetCaptch] = useState(false);
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (user.lopd_uuid === '') {
        navigate('/lopd', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, isLoggedIn, navigate]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('signInForm.email.validFormat'))
      .required(t('signInForm.email.required')),
    recaptcha: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      recaptcha: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (error) {
        dispatch(clearErrorMessage());
      }

      setResetCaptch(true);
      setResetCaptch(false);
      dispatch(login(values)).then(() => {
        setSubmitting(false);
      });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ mb: '24px' }}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t('signInForm.email.label')}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>

        <Captcha setFieldValue={setFieldValue} mustReset={resetCaptcha} />

        <LoadingButton
          sx={{ marginTop: '24px' }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {t('buttons.submit')}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
