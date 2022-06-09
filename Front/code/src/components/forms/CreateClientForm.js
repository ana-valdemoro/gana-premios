import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// store
import { setMessage } from '../../store/reducers/messageSlice';
// project
import createClientSchema from '../../utils/Validators/createClientSchema';
import useCreateClient from '../../hooks/client/useCreateClient';

// ----------------------------------------------------------------------

export default function CreateClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync, data, isError, error } = useCreateClient();

  const formik = useFormik({
    initialValues: {
      name: '',
      manager: '',
      numberPromotionsActive: ''
    },
    validationSchema: createClientSchema,
    onSubmit: async (values) => {
      const { name, manager, numberPromotionsActive } = values;
      const clientData = {
        name,
        responsable: manager,
        numberPromotionActive: numberPromotionsActive
      };
      await mutateAsync(clientData);
    }
  });

  useEffect(() => {
    if (isError) {
      formik.setSubmitting(false);
      let failAlert;
      console.log();
      if (error?.statusCode === 422) {
        failAlert = {
          isOpen: true,
          header: t('alert.failure.label'),
          content: error.message,
          type: 'error'
        };
      } else {
        failAlert = {
          isOpen: true,
          header: t('alert.failure.label'),
          content: t('alert.serverConflicts.unreachable'),
          type: 'error'
        };
      }
      dispatch(setMessage(failAlert));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.message, isError, error?.statusCode]);

  useEffect(() => {
    if (data) {
      formik.setSubmitting(false);
      const succesAlert = {
        isOpen: true,
        header: t('alert.createClient.success.label'),
        content: '',
        type: 'success'
      };
      dispatch(setMessage(succesAlert));
      navigate('/dashboard/clients', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
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
