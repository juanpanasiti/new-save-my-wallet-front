import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Login } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Register'>
      <form>
        <Grid container>
          {/* Fields */}
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label='Username' type='text' placeholder='username' fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label='Email' type='email' placeholder='user@mail.com' fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField label='Password' type='password' placeholder='******' fullWidth />
          </Grid>
          {/* Buttons */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth>
                <Login />
                <Typography sx={{ ml: 1 }}>Create Account</Typography>
              </Button>
            </Grid>
          </Grid>
          {/* Register Link */}
          <Grid container direction='row'>
            <Grid item xs={12}>
              <Typography>
                Already have an account?,{' '}
                <Link component={RouterLink} color='inherit' to='/auth/signin'>
                  login here
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
