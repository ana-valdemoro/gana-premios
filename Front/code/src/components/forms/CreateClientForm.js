import * as Yup from 'yup';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// store
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrorMessage } from '../../store/reducers/authSlice';
// project
import createClientSchema from '../../utils/Validators/createClientSchema';
// ----------------------------------------------------------------------

export default function CreateClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      manager: '',
      numberPromotionsActive: ''
    },
    validationSchema: createClientSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      // if (error) {
      //   dispatch(clearErrorMessage());
      // }

      // dispatch(login(values)).then(() => {
      //   setSubmitting(false);
      // });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="name"
            type="text"
            label={t('clientForm.name.label')}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            autoComplete="manager"
            type="text"
            label={t('clientForm.manager.label')}
            {...getFieldProps('manager')}
            error={Boolean(touched.manager && errors.manager)}
            helperText={touched.manager && errors.manager}
          />

          <TextField
            fullWidth
            autoComplete="number-of-promotions-active"
            type="number"
            label={t('clientForm.numberPromotionsActive.label')}
            {...getFieldProps('numberPromotionsActive')}
            error={Boolean(touched.numberPromotionsActive && errors.numberPromotionsActive)}
            helperText={touched.numberPromotionsActive && errors.numberPromotionsActive}
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
          {t('buttons.create')}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
