import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useStyles } from '@/styles/component/FormStyle';

const TopicForm = ({ onSubmit }) => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  return (
    <div className={classes.wrapper}>
      <form className={classes.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          inputRef={register}
          className={classes.formField}
        />
        <TextField
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={4}
          variant="outlined"
          name="content"
          inputRef={register}
          className={classes.formField}
        />
        <div className={classes.formRow}>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TopicForm;
