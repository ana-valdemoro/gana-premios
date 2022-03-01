/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography, Button, Grid, Link, Input } from '@mui/material';
import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
import uploadFill from '@iconify/icons-eva/upload-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';

import { convertFileToBase64 } from '../utils/formatFile';
import { setMessage } from '../store/reducers/messageSlice';
import { saveLopd } from '../store/reducers/authSlice';

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

export default function Lopd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [canContinue, setContinue] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   if (error) {
  //     console.log('No nos hemos podido loguear');
  //   }
  // }, [error]);

  const onDownload = () => {
    const link = document.createElement('a');
    link.download = `lopd.pdf`;
    link.href = '/static/lopd.pdf';
    link.click();
  };

  const fileHandler = async (event) => {
    if (errorMessage) {
      setErrorMessage('');
    }

    const file = event.target.files[0];

    if (file.type !== 'application/pdf') {
      setErrorMessage(t('lopd.validateMessage'));
      return;
    }

    const dataUri = await convertFileToBase64(file);

    const lopd = {
      mediaType: file.type,
      fileName: file.name,
      uri: dataUri
    };

    dispatch(saveLopd(lopd)).then((res) => {
      if (res.payload) {
        const succesAlert = {
          isOpen: true,
          header: t('alert.success.label'),
          content: t('alert.success.lopdMessage'),
          type: 'success'
        };
        dispatch(setMessage(succesAlert));
        setContinue(true);
      } else {
        const failAlert = {
          isOpen: true,
          header: t('alert.failure.label'),
          content: t('alert.failure.lopdMessage'),
          type: 'error'
        };
        dispatch(setMessage(failAlert));
      }
    });
  };

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout />

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            {t('welcomeToTheApp')}
          </Typography>
          <img src="/static/illustrations/illustration_register.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('lopd.mainTitle')}
            </Typography>
            {errorMessage !== '' ? (
              <Typography sx={{ color: 'text.error' }}>{errorMessage}</Typography>
            ) : (
              <Typography sx={{ color: 'text.secondary' }}>{t('lopd.secondaryTitle')}</Typography>
            )}
            <Grid container sx={{ marginTop: '2%' }} spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  to="#"
                  sx={{ width: '100%' }}
                  component={Link}
                  startIcon={<Icon icon={downloadFill} />}
                  onClick={onDownload}
                >
                  {t('buttons.download')}
                </Button>
              </Grid>
              <Grid item xs={6} alignItems="center">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="application/pdf"
                    id="contained-button-file"
                    sx={{ display: 'none' }}
                    type="file"
                    onChange={fileHandler}
                  />
                  <Button
                    variant="contained"
                    to="#"
                    sx={{ width: '100%' }}
                    startIcon={<Icon icon={uploadFill} />}
                  >
                    {t('buttons.upload')}
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Stack>
          {canContinue ? (
            <Button
              to="#"
              size="small"
              color="inherit"
              endIcon={<Icon icon={arrowIosForwardFill} />}
            >
              {t('buttons.goIn')}
            </Button>
          ) : null}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
