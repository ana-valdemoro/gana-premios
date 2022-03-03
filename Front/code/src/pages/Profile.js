// material
import { Typography, Stack, Container, Button, Grid, Avatar, Link, Input } from '@mui/material';
import { useState } from 'react';

// components
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import uploadFill from '@iconify/icons-eva/upload-fill';
import ProfileEditingForm from '../components/ProfileEditingForm';
import { selectUser, saveLopd } from '../store/reducers/authSlice';
import userService from '../services/userService';
import Page from '../components/Page';
import account from '../_mocks_/account';
import { convertFileToBase64 } from '../utils/formatFile';
import MainCard from '../components/cards/MainCard';
import { setMessage } from '../store/reducers/messageSlice';

export default function Profile() {
  const user = useSelector(selectUser);
  const [errMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDownload = async () => {
    const res = await userService.downloadLopd(user.token);
    const fileURL = URL.createObjectURL(res.blob);
    const link = document.createElement('a');
    link.download = res.filename;
    link.href = fileURL;
    link.click();
  };

  const fileHandler = async (event) => {
    // if (errorMessage) {
    //   setErrorMessage('');
    // }

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
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} sm={5}>
            <MainCard
              sx={{ display: 'flex', justifyContent: 'center' }}
              contentSX={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                paddingBottom: '8px'
              }}
              border={false}
            >
              <Avatar src={account.photoURL} alt="photoURL" />
              <Typography variant="h4">{user.name}</Typography>
              {/* <Typography variant="subtitle2">Los Ángeles USA</Typography> */}
              {user.lopd_uuid ? (
                <Button
                  component={Link}
                  onClick={handleDownload}
                  sx={{ width: '100%', marginTop: '8px' }}
                >
                  Download signed LOPD
                </Button>
              ) : (
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
                    {t('buttons.upload')} LOPD
                  </Button>
                </label>
              )}
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MainCard
              border={false}
              title="Personal informattion"
              subheader="The information can be edited"
              sx={{ height: '100%' }}
            >
              {errMessage ? (
                <Typography sx={{ color: 'text.error' }}>{errMessage}</Typography>
              ) : null}

              {/* <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Full name*"
                    // {...getFieldProps('email')}
                    // error={Boolean(touched.email && errors.email)}
                    // helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address*"
                    // {...getFieldProps('email')}
                    // error={Boolean(touched.email && errors.email)}
                    // helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="password"
                    type="password"
                    label="Password*"
                    // {...getFieldProps('email')}
                    // error={Boolean(touched.email && errors.email)}
                    // helperText={touched.email && errors.email}
                  />
                </Grid>
              </Grid> */}
              <ProfileEditingForm
                user={user}
                errMessage={errMessage}
                setErrorMessage={setErrorMessage}
              />
              {/* <Button
                variant="contained"
                to="#"
                sx={{ width: '100%', marginTop: '16px' }}
                onClick={() => console.log('click')}
              >
                Save details
              </Button> */}
            </MainCard>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
