import { Login } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (

      
        <AuthLayout title='Login'>
          <form>
            <Grid container>
              {/* Fields */}
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField label='Username' type='text' placeholder='username' fullWidth />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField label='Password' type='password' placeholder='******' fullWidth />
              </Grid>
              {/* Buttons */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                  <Button variant='contained' fullWidth>
                    <Login />
                    <Typography sx={{ ml: 1 }}>Login</Typography>
                  </Button>
                </Grid>
              </Grid>
              {/* Register Link */}
              <Grid container direction='row'>
                <Grid item xs={12}>
                  <Typography>
                    If you don't have an account, <Link component={RouterLink} color='inherit' to='/auth/signup'>register here</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </AuthLayout>
  );
};
