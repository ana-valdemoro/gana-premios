// material
import {
  Typography,
  Stack,
  Container,
  Button,
  Grid,
  TextField,
  Divider,
  Avatar,
  CardActions
} from '@mui/material';

// components
import Page from '../components/Page';
import account from '../_mocks_/account';

import MainCard from '../components/cards/MainCard';

export default function Profile() {
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
              <Typography variant="h4">Katarina Smith</Typography>
              <Typography variant="subtitle2">Los Ángeles USA</Typography>
              <Button to="/dashboard" sx={{ width: '100%', marginTop: '8px' }}>
                Download signed LOPD
              </Button>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MainCard
              border={false}
              title="Personal informattion"
              subheader="The information can be edited"
              sx={{ height: '100%' }}
            >
              <Grid container spacing={2}>
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
