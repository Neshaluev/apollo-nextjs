import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '@/styles/component/FormStyle';

const LoginForm = ({ handleFormLogin, loading }) => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  return (
    <div className={classes.wrapper}>
      <form
        noValidate
        autoComplete="off"
        className={classes.formWrapper}
        onSubmit={handleSubmit(handleFormLogin)}
      >
        <Typography variant="h2" component="h3" className={classes.formField}>
          Login
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className={classes.formField}
          name="email"
          inputRef={register}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          inputRef={register}
          className={classes.formField}
        />
        {loading && 'Signing in...'}
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
