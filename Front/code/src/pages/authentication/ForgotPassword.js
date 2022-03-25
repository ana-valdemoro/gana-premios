import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { ForgotPasswordForm } from '../../components/authentication/forgotPassword';

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

export default function ForgotPassword() {
  const { error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      console.log('No nos hemos podido loguear');
    }
  }, [error]);

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        <Trans i18nKey="signUpAuthLayout">
          Already have an account? &nbsp;
          <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
            Login
          </Link>
        </Trans>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/illustrations/confused_password.png" alt="confused women and men" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('forgotPassword.mainTitle')}
            </Typography>
            {error ? (
              <Typography sx={{ color: 'text.error' }}>{error}</Typography>
            ) : (
              <Typography sx={{ color: 'text.secondary' }}>
                {t('forgotPassword.secondaryTitle')}
              </Typography>
            )}
          </Stack>

          <ForgotPasswordForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}