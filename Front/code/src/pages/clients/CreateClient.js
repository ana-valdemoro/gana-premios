// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material
import { Container, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import CreateClientForm from '../../components/forms/CreateClientForm';

export default function CreateClient() {
  const { t } = useTranslation();

  return (
    <Page title="Dashboard: Create client | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Create Client
        </Typography>

        <CreateClientForm />
      </Container>
    </Page>
  );
}
