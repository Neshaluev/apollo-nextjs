import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useStyles } from '@/styles/component/FormStyle';

const ForumForm = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm();

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <form
        noValidate
        autoComplete="off"
        className={classes.formWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className={classes.formField}
          type="text"
          name="title"
          inputRef={register}
        />
        <TextField
          id="outlined-basic"
          label="SubTitle"
          variant="outlined"
          className={classes.formField}
          type="text"
          name="subTitle"
          inputRef={register}
        />

        <TextField
          id="outlined-basic"
          label="Slug"
          variant="outlined"
          className={classes.formField}
          type="text"
          name="slug"
          inputRef={register}
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default ForumForm;
