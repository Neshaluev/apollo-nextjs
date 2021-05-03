import React from 'react';
import { useForm } from 'react-hook-form';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useStyles } from '@/styles/component/FormStyle';
import { formFormatDate } from '@/helpers';

const PortfolioForm = ({ onSubmit, initialData }) => {
  const classes = useStyles();
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: initialData,
  });

  React.useEffect(() => {
    register({ name: 'startDate' });
    register({ name: 'endDate' });

    if (initialData) {
      handleDateChange(initialData);
    }
  }, [initialData]);

  const handleDateChange = (initialData) => {
    const { startDate, endDate } = initialData;

    setValue('startDate', formFormatDate(startDate));
    setValue('endDate', formFormatDate(endDate));
  };

  return (
    <div className={classes.wrapper}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        className={classes.formWrapper}
      >
        <Typography variant="h2" component="h3" className={classes.formField}>
          {!initialData ? 'Create New Portfolio' : 'Update Portfolios'}
        </Typography>
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
          id="outlined-basic"
          label="Company"
          variant="outlined"
          type="text"
          name="company"
          inputRef={register}
          className={classes.formField}
        />
        <TextField
          id="outlined-basic"
          label="Company Website"
          variant="outlined"
          type="text"
          name="companyWebsite"
          inputRef={register}
          className={classes.formField}
        />
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          type="text"
          name="location"
          inputRef={register}
          className={classes.formField}
        />
        <TextField
          id="outlined-basic"
          label="Job Title"
          variant="outlined"
          type="text"
          name="jobTitle"
          inputRef={register}
          className={classes.formField}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          type="text"
          variant="outlined"
          name="description"
          inputRef={register}
          className={classes.formField}
        />
        <TextField
          id="date"
          label="Start Date"
          type="date"
          className={classes.formFieldDate}
          InputLabelProps={{
            shrink: true,
          }}
          name="startDate"
          inputRef={register}
        />
        <TextField
          id="date"
          label="End Date"
          type="date"
          className={classes.formFieldDate}
          InputLabelProps={{
            shrink: true,
          }}
          name="endDate"
          inputRef={register}
        />

        <Button type="submit" variant="contained" color="primary">
          {!initialData ? 'Create' : 'Update'}
        </Button>
      </form>
    </div>
  );
};

export default PortfolioForm;
