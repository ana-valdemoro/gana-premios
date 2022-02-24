/* eslint-disable react/no-this-in-sfc */
import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import registerSchema from '../../../utils/Validators/registerSchema';
import { setMessage } from '../../../store/reducers/messageSlice';
import authService from '../../../services/authenticationService';
import Captcha from '../../Captcha';

// ----------------------------------------------------------------------

export default function RegisterForm(props) {
  const { errMessage, setErrorMessage } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const [resetCaptcha, setResetCaptch] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      recaptcha: ''
    },
    validationSchema: registerSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      const { name, email, password } = values;

      if (errMessage !== '') {
        setErrorMessage('');
      }
      const response = await authService.register({ name, email, password });
      if (response.statusCode === 422 || response.statusCode === 500) {
        setResetCaptch(true);
        if (response.errors) {
          let message = '';
          response.errors.forEach((error) => {
            if (typeof error === 'object') {
              message += Object.values(error).join(', ').trim();
            }
          });
          setErrorMessage(message);
        } else {
          setErrorMessage(response.message);
        }

        const failAlert = {
          isOpen: true,
          header: t('alert.failure.label'),
          content: t('alert.failure.content'),
          type: 'error'
        };
        dispatch(setMessage(failAlert));
        setResetCaptch(false);
      } else {
        setSubmitting(false);
        const succesAlert = {
          isOpen: true,
          header: t('alert.success.label'),
          content: t('alert.success.content'),
          type: 'success'
        };
        dispatch(setMessage(succesAlert));
        navigate('/login', { replace: true });
      }
    }
  });

  const debouncedValidate = useMemo(
    () => debounce(formik.validateForm, 500),
    [formik.validateForm]
  );

  useEffect(() => {
    debouncedValidate(formik.values);
    return () => debouncedValidate.cancel();
  }, [formik.values, debouncedValidate]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label={t('registerForm.name.label')}
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label={t('registerForm.email.label')}
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label={t('registerForm.password.label')}
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <Captcha setFieldValue={setFieldValue} mustReset={resetCaptcha} />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {t('registerButton')}
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}

RegisterForm.propTypes = {
  errMessage: PropTypes.string,
  setErrorMessage: PropTypes.func
};
