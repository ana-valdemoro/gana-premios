/* eslint-disable react/no-this-in-sfc */
import * as Yup from 'yup';
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
import validatePassword from '../../../utils/passwordValidator';
import { setMessage } from '../../../store/reducers/messageSlice';
import authService from '../../../services/authenticationService';
// hooks
import useQuery from '../../../hooks/useQuery';

// ----------------------------------------------------------------------

export default function RegisterForm(props) {
  const { errMessage, setErrorMessage } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const query = useQuery();
  const { t } = useTranslation();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('registerForm.name.short'))
      .max(30, t('registerForm.name.long'))
      .required(t('registerForm.name.required')),
    email: Yup.string()
      .email(t('registerForm.email.validFormat'))
      .required(t('registerForm.email.required')),
    password: Yup.string().test({
      password: 'validator-custom-password',
      // eslint-disable-next-line object-shorthand
      test: validatePassword
    })
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      if (errMessage !== '') {
        setErrorMessage('');
      }
      const response = await authService.register(values, query.get('lang'));
      console.log(response);
      if (response.statusCode === 422) {
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
        const failAlert = { isOpen: true, content: 'Sign up fails', type: 'error' };
        dispatch(setMessage(failAlert));
      } else {
        setSubmitting(false);
        const succesAlert = { isOpen: true, content: 'Sign up Successfully', type: 'success' };
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
  }, [formik.values, debouncedValidate]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
