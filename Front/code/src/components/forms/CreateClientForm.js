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

// ----------------------------------------------------------------------

export default function CreateClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error } = useSelector((state) => state.auth);

  const createClientSchema = Yup.object().shape({
    name: Yup.string()
      .test({
        name: 'custom-name-test',
        test: function checkClientName(name, context) {
          if (!name) {
            return context.createError({
              message: t('clientForm.name.required'),
              path: `name`
            });
          }

          if (name.length < 20) {
            return context.createError({
              message: t('clientForm.name.minLength'),
              path: `name`
            });
          }

          if (name.length > 100) {
            return context.createError({
              message: t('clientForm.name.maxLength'),
              path: `name`
            });
          }

          return true;
        }
      })
      .required(t('clientForm.name.required')),
    manager: Yup.string()
      .test({
        name: 'custom-manager-test',
        test: function checkClientManager(manager, context) {
          if (!manager) {
            return context.createError({
              message: t('clientForm.manager.required'),
              path: `manager`
            });
          }

          if (manager.length < 20) {
            return context.createError({
              message: t('clientForm.manager.minLength'),
              path: `manager`
            });
          }

          if (manager.length > 100) {
            return context.createError({
              message: t('clientForm.manager.maxLength'),
              path: `manager`
            });
          }

          return true;
        }
      })
      .required(t('clientForm.manager.required')),
    numberPromotionsActive: Yup.number()
      .test({
        name: 'custom-number-of-active-promotions-test',
        test: function checkNumberPromotionsActive(numberPromotionsActive, context) {
          if (numberPromotionsActive == null) {
            return context.createError({
              message: t('clientForm.numberPromotionsActive.required'),
              path: `numberPromotionsActive`
            });
          }

          if (!Number.isInteger(numberPromotionsActive)) {
            return context.createError({
              message: t('clientForm.numberPromotionsActive.integer'),
              path: `numberPromotionsActive`
            });
          }

          if (numberPromotionsActive < 1 || numberPromotionsActive > 10) {
            return context.createError({
              message: t('clientForm.numberPromotionsActive.permissibleNumber'),
              path: `numberPromotionsActive`
            });
          }

          return true;
        }
      })
      .required('clientForm.numberPromotionsActive.required')
  });

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
