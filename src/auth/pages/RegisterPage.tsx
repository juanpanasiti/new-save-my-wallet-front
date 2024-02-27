import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Login } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterForm } from '../types';

export const RegisterPage = () => {
  const { formState, register, handleSubmit } = useForm<RegisterForm>();
  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  };
  return (
    <AuthLayout title='Register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {/* Fields */}
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Username'
              type='text'
              placeholder='username'
              fullWidth
              {...register('username', {
                required: true,
                minLength: 8,
                maxLength: 20,
                // pattern: /^(?![0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
              })}
            />
            {formState.errors.username && <span>Something is wrong with your username</span>}
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Email'
              type='email'
              placeholder='user@mail.com'
              fullWidth
              {...register('email', {
                required: true,
                maxLength: 50,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {formState.errors.email && <span>Something is wrong with your email</span>}
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
          {/* Buttons */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' fullWidth>
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
