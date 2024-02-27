import { Login } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../types';
import { useAuth } from '../hooks';

export const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const { loginMutation } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data, {
      onSuccess: () => navigate('/', { replace: true }),
    });
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {/* Fields */}
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Username'
              type='text'
              placeholder='username'
              fullWidth
              {...register('username', { required: true })}
            />
            {formState.errors.username && <span>Something is wrong with your username</span>}
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Password'
              type='password'
              placeholder='******'
              fullWidth
              {...register('password', { required: true })}
            />
            {formState.errors.password && <span>This field is required</span>}
          </Grid>
          {/* Error Message */}
          <Grid item xs={12}>
            {loginMutation.error && <Typography color='error'>Username or password went wrong</Typography>}
          </Grid>
          {/* Buttons */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' fullWidth>
                <Login />
                <Typography sx={{ ml: 1 }}>Login</Typography>
              </Button>
            </Grid>
          </Grid>
          {/* Register Link */}
          <Grid container direction='row'>
            <Grid item xs={12}>
              <Typography>
                If you don't have an account,{' '}
                <Link component={RouterLink} color='inherit' to='/auth/signup'>
                  register here
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
