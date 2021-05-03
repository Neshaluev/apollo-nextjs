import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '@/styles/component/FormStyle';

const RegisterForm = ({ handleRegisterForm }) => {
  const { handleSubmit, register } = useForm();

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <form
        noValidate
        autoComplete="off"
        className={classes.formWrapper}
        onSubmit={handleSubmit(handleRegisterForm)}
      >
        <Typography variant="h2" component="h3" className={classes.formField}>
          Registeration
        </Typography>

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          className={classes.formField}
          inputRef={register}
          type="text"
          name="name"
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className={classes.formField}
          inputRef={register}
          type="text"
          name="username"
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className={classes.formField}
          inputRef={register}
          type="email"
          name="email"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className={classes.formField}
          inputRef={register}
          type="password"
          name="password"
        />
        <TextField
          id="outlined-basic"
          label="Password Confirmation"
          variant="outlined"
          className={classes.formField}
          inputRef={register}
          type="password"
          name="passwordConfirmation"
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
