/* eslint-disable no-nested-ternary */
import { Link as routerLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography, Button, LinearProgress, Box } from '@mui/material';
// layouts
// eslint-disable-next-line import/no-unresolved
import { useUnblockAccount } from 'src/hooks/auth';
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function UnblockAccount() {
  const { t } = useTranslation();
  const { token } = useParams();
  const { mutate, isLoading, data, isError, error } = useUnblockAccount();

  useEffect(() => {
    const activate = async () => {
      mutate(token);
    };
    activate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  if (error) {
    return (
      <RootStyle title="Login | Minimal-UI">
        <AuthLayout />

        <MHidden width="mdDown">
          <SectionStyle>
            <Box sx={{ width: '75%', alignSelf: 'center' }}>
              <img src="/static/illustrations/warning.png" alt="warning" />
            </Box>
          </SectionStyle>
        </MHidden>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                {t('unblockAccount.failure.mainTitle')}
              </Typography>
              {error.statusCode === 401
                ? t('unblockAccount.failure.alreadyActivate')
                : t('unblockAccount.failure.serverUnreachable')}
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout />

      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/illustrations/bravo.jpg" alt="bravo" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('unblockAccount.success.mainTitle')}
            </Typography>
            {t('unblockAccount.success.secondaryTitle')}
            <Button component={routerLink} to="/login" size="small" sx={{ marginTop: '8px' }}>
              {t('buttons.signIn')}
            </Button>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
