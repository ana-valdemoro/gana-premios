/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';

// material
import { Stack, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// store
import { setMessage } from '../../../store/reducers/messageSlice';

// project
import Captcha from '../../Captcha';
import useTogglePasswordVisibility from '../../../hooks/useTogglePasswordVisibility';
import { useRecoverPassword } from '../../../hooks/auth';

// ----------------------------------------------------------------------

export default function RecoverPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [resetCaptcha, setResetCaptch] = useState(false);
  const { mutateAsync, data, isError, error } = useRecoverPassword();
  const { token } = useParams();
  const [inputTypePassword, IconPassword] = useTogglePasswordVisibility();
  const [inputTypeRepitedPassword, IconRepitedPassword] = useTogglePasswordVisibility();

  const RecoverSchema = Yup.object().shape({
    password: Yup.string().required(t('signInForm.password.required')),
    repitedPassword: Yup.string().required(t('recoverPasswordForm.confirmPassword.required')),
    recaptcha: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      repitedPassword: '',
      recaptcha: ''
    },
    validationSchema: RecoverSchema,
    onSubmit: async (values) => {
      const { password, repitedPassword } = values;
      setResetCaptch(true);
      setResetCaptch(false);
      if (password === repitedPassword) {
        console.log('Probando la llamada al Back');
        await mutateAsync({ password: values.password, token });
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

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

          <TextField
            fullWidth
            autoComplete="current-password"
            type={inputTypeRepitedPassword}
            label={t('recoverPasswordForm.confirmPassword.label')}
            {...getFieldProps('repitedPassword')}
            InputProps={{
              endAdornment: <InputAdornment position="end">{IconRepitedPassword}</InputAdornment>
            }}
            error={Boolean(touched.repitedPassword && errors.repitedPassword)}
            helperText={touched.repitedPassword && errors.repitedPassword}
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
