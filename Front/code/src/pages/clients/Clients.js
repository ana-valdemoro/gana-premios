import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as routerLink } from 'react-router-dom';

// material
import { Container, Stack, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-akar-icons/plus';
// components
import Page from '../../components/Page';
import { ProductList, ProductCartWidget } from '../../components/_dashboard/products';
//
import PRODUCTS from '../../_mocks_/products';

export default function ClientsDashboard() {
  const { t } = useTranslation();

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
              component={routerLink}
              variant="contained"
              to="/dashboard/clients/create-client"
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
