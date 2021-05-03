import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '@/styles/component/FormStyle';

const CommentForm = ({ onSubmit, reply = null }) => {
  const formStyles = useStyles();
  const { handleSubmit, register } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={formStyles.formWrapper}
      style={{ textAlign: 'left' }}
    >
      <Typography variant="body2" gutterBottom style={{ marginBottom: '20px' }}>
        {reply && <p>Replay To: Jack black</p>}
      </Typography>
      <TextField
        id="outlined-multiline-static"
        label="Content"
        multiline
        rows={4}
        variant="outlined"
        className={formStyles.formField}
        inputRef={register}
        name="content"
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
