// material
import {
  Typography,
  Stack,
  Container,
  Button,
  Grid,
  TextField,
  Divider,
  Avatar
} from '@mui/material';

// components
import Page from '../components/Page';
import account from '../_mocks_/account';

import MainCard from '../components/cards/MainCard';

export default function Profile() {
  const subheader = (
    <>
      <Typography variant="h3">Katarina Smith</Typography>
      <Typography variant="subtitle1">Los Ángeles USA</Typography>
    </>
  );
  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Account
          </Typography>
        </Stack>
        <Grid container spacing={2} direction="row">
          <Grid item sx={{ paddingBottom: '8px' }} xs={12} sm={4}>
            <MainCard
              sx={{ display: 'flex', justifyContent: 'center' }}
              border={false}
              title={subheader}
            >
              <Avatar src={account.photoURL} alt="photoURL" />
              <Typography variant="h3">Katarina Smith</Typography>
              <Typography variant="subtitle1">Los Ángeles USA</Typography>
              <Divider />
              <Button to="/dashboard" sx={{ width: '100%', marginTop: '8px' }}>
                Upload picture
              </Button>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MainCard
              border={false}
              title="Personal informattion"
              subheader="The information can be edited"
              sx={{ height: '100%' }}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Full name"
                    // {...getFieldProps('email')}
                    // error={Boolean(touched.email && errors.email)}
                    // helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    // {...getFieldProps('email')}
                    // error={Boolean(touched.email && errors.email)}
                    // helperText={touched.email && errors.email}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                to="#"
                sx={{ width: '100%', marginTop: '16px' }}
                onClick={() => console.log('click')}
              >
                Save details
              </Button>
            </MainCard>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
