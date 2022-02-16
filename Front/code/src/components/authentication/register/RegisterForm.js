/* eslint-disable react/no-this-in-sfc */
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Full name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().test({
      password: 'validator-custom-password',
      // eslint-disable-next-line object-shorthand
      test: function validatePassword(password) {
        const errors = [];

        if (!password) {
          return this.createError({
            message: `Password is required`,
            path: `password`
          });
        }

        if (password.length < 9) {
          errors.push('Must contain 9 characters');
        }

        const lowercase = new RegExp(/^(?=.*[a-z]).{1,}$/);
        if (!lowercase.test(password)) {
          errors.push('One lowercase');
        }

        const uppercase = new RegExp(/^(?=.*[A-Z]).{1,}$/);
        if (!uppercase.test(password)) {
          errors.push('One uppercase');
        }

        const number = new RegExp(/^(?=.*[0-9]).{1,}$/);
        if (!number.test(password)) {
          errors.push('One number');
        }

        // eslint-disable-next-line no-useless-escape
        const symbols = new RegExp(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{1,}$/);
        if (!symbols.test(password)) {
          const chars = '-;!$%^&*()_+|~=`{}[]:"\'<>?,./';
          errors.push(`One Special Case Character of ${chars}`);
        }

        return errors.length > 0
          ? this.createError({
              message: `${errors.join(', ')}`,
              path: `password`
            })
          : true;
      }
    })
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Full name"
            {...getFieldProps('fullName')}
            error={Boolean(touched.fullName && errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
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
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
