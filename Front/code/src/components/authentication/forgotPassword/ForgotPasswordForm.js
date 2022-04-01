/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// store
import { useDispatch } from 'react-redux';
import { useForgotPassword } from '../../../hooks/auth';
import Captcha from '../../Captcha';
// import { login, clearErrorMessage } from '../../../store/reducers/authSlice';
import { setMessage } from '../../../store/reducers/messageSlice';

// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [resetCaptcha, setResetCaptch] = useState(false);
  const { mutate, data, isError, error } = useForgotPassword();

  const ForgotSchema = Yup.object().shape({
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
    validationSchema: ForgotSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setResetCaptch(true);
      setResetCaptch(false);
      const response = mutate({ email: values.email, setSubmitting });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  useEffect(() => {
    if (isError) {
      formik.setSubmitting(false);
      const failAlert = {
        isOpen: true,
        header: t('alert.failure.label'),
        content: t('alert.serverConflicts.unreachable'),
        type: 'error'
      };
      dispatch(setMessage(failAlert));
    }
  }, [error?.message, isError]);

  useEffect(() => {
    if (data) {
      formik.setSubmitting(false);
      const succesAlert = {
        isOpen: true,
        header: t('alert.forgotPassword.success.label'),
        content: t('alert.forgotPassword.success.signUpMessage'),
        type: 'success'
      };
      dispatch(setMessage(succesAlert));
      navigate('/login', { replace: true });
    }
  }, [data]);

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
