import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// material
import { Container, Stack, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-akar-icons/plus';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function ClientsDashboard() {
  const [openFilter, setOpenFilter] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Dashboard: Clients | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Clients
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={6} flexShrink={0} sx={{ my: 1 }}>
            <Button
              variant="contained"
              to="#"
              sx={{ width: '100%' }}
              startIcon={<Icon icon={plusIcon} />}
            >
              {t('buttons.addClient')}
            </Button>
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
