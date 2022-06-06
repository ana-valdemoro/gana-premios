/* eslint-disable react/no-this-in-sfc */
import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
// material
import { Stack, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { setMessage } from '../store/reducers/messageSlice';
// import registerSchema from '../utils/Validators/registerSchema';
import { updateProfile } from '../store/reducers/authSlice';
// project
import { userEmailsIsIncluded } from '../utils/Validators/registerSchema';
import useTogglePasswordVisibility from '../hooks/useTogglePasswordVisibility';

// ----------------------------------------------------------------------

export default function ProfileEditingForm(props) {
  const { errMessage, setErrorMessage, user } = props;

  const dispatch = useDispatch();
  const [inputTypePassword, IconPassword] = useTogglePasswordVisibility();
  const [inputTypeRepitedPassword, IconRepitedPassword] = useTogglePasswordVisibility();

  const { t } = useTranslation();

  const resetFormFields = () => {
    setFieldValue('newPassword', '');
    setFieldValue('repitNewPassword', '');
  };

  const userSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('registerForm.name.short'))
      .max(30, t('registerForm.name.long'))
      .required(t('registerForm.name.required')),
    email: Yup.string()
      .email(t('registerForm.email.validFormat'))
      .required(t('registerForm.email.required')),
    newPassword: Yup.string().test({
      password: 'validator-custom-password',
      // eslint-disable-next-line object-shorthand
      test: function validatePassword(password, context) {
        const { email } = context.parent;
        const errors = [];

        if (!password) {
          return true;
        }

        if (email && userEmailsIsIncluded(email.toLowerCase(), password.toLowerCase())) {
          errors.push(t('registerForm.password.emailIncluded'));
        }

        if (password.length < 9) {
          errors.push(t('registerForm.password.minLength'));
        }

        const lowercase = new RegExp(/^(?=.*[a-z]).{1,}$/);
        if (!lowercase.test(password)) {
          errors.push(t('registerForm.password.lowercase'));
        }

        const uppercase = new RegExp(/^(?=.*[A-Z]).{1,}$/);
        if (!uppercase.test(password)) {
          errors.push(t('registerForm.password.uppercase'));
        }

        const number = new RegExp(/^(?=.*[0-9]).{1,}$/);
        if (!number.test(password)) {
          errors.push(t('registerForm.password.number'));
        }

        // eslint-disable-next-line no-useless-escape
        const symbols = new RegExp(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{1,}$/);
        if (!symbols.test(password)) {
          errors.push(t('registerForm.password.specialCharacter'));
        }

        return errors.length > 0
          ? this.createError({
              message: `${errors.join(', ')}`,
              path: `newPassword`
            })
          : true;
      }
    }),
    repitNewPassword: Yup.string().when('newPassword', {
      is: (newPassword) => newPassword,
      then: Yup.string().test({
        repitNewPassword: 'validate-repit-password',
        test(repitNewPassword, context) {
          const { newPassword } = context.parent;

          if (!repitNewPassword) {
            return this.createError({
              message: t('profileEditingForm.repitNewPassword.required'),
              path: `repitNewPassword`
            });
          }

          return newPassword === repitNewPassword
            ? true
            : this.createError({
                message: t('profileEditingForm.repitNewPassword.notSame'),
                path: `repitNewPassword`
              });
        }
      })
    })
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      newPassword: '',
      repitNewPassword: ''
    },
    validationSchema: userSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      if (errMessage !== '') {
        setErrorMessage('');
      }
      const { name, email, newPassword } = values;

      // Actualizamos solo los campos de nombre o contraseña
      const dataToUpdate = {};
      if (name !== user.name || email !== user.email) {
        dataToUpdate.name = name;
        dataToUpdate.email = email;
      }

      if (newPassword) {
        dataToUpdate.password = newPassword;
      }

      if (Object.entries(dataToUpdate).length === 0) {
        return;
      }

      dispatch(updateProfile(dataToUpdate)).then((res) => {
        setSubmitting(false);

        if (res.payload) {
          resetFormFields();
          const succesAlert = {
            isOpen: true,
            header: t('alert.success.label'),
            content: t('alert.success.updateProfileMessage'),
            type: 'success'
          };
          dispatch(setMessage(succesAlert));
        } else {
          setFieldValue('name', user.name);
          setFieldValue('email', user.email);
          const failAlert = {
            isOpen: true,
            header: t('alert.failure.label'),
            content: res.error.message,
            type: 'error'
          };
          dispatch(setMessage(failAlert));
        }
      });
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
              type={inputTypePassword}
              label={t('profileEditingForm.password.label')}
              {...getFieldProps('newPassword')}
              InputProps={{
                endAdornment: <InputAdornment position="end">{IconPassword}</InputAdornment>
              }}
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />
            <TextField
              fullWidth
              type={inputTypeRepitedPassword}
              label={t('profileEditingForm.repitNewPassword.label')}
              {...getFieldProps('repitNewPassword')}
              InputProps={{
                endAdornment: <InputAdornment position="end">{IconRepitedPassword}</InputAdornment>
              }}
              error={Boolean(touched.repitNewPassword && errors.repitNewPassword)}
              helperText={touched.repitNewPassword && errors.repitNewPassword}
            />

            <LoadingButton
              fullWidth
              size="medium"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {t('buttons.saveDetails')}
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}

ProfileEditingForm.propTypes = {
  errMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
  user: PropTypes.object
};
